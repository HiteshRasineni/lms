import Grade from "../models/Grade.js";
import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Topic from "../models/Topic.js";
import CourseUnit from "../models/CourseUnit.js";

export const gradeSubmission = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;
    const submission = await Submission.findById(submissionId)
      .populate("assignment")
      .populate("student", "name email xp role avatar");
      
    if (!submission) {
      res.status(404);
      throw new Error("Submission not found");
    }

    const assignmentId = submission.assignment?._id || submission.assignment;
    const studentId = submission.student?._id || submission.student;

    if (!assignmentId || !studentId) {
      res.status(400);
      throw new Error("Submission is missing assignment or student reference");
    }

    // Check if it's a regular Assignment or Topic-based assignment based on assignmentModel
    let courseObj;
    let xpReward = 50; // default XP
    let maxPoints = 100; // default max points
    
    if (submission.assignmentModel === "Topic") {
      // It's a Topic-based assignment
      const topic = await Topic.findById(assignmentId).populate({
        path: "unit",
        populate: { path: "course" }
      });
      
      if (!topic || topic.type !== "assignment") {
        res.status(404);
        throw new Error("Assignment not found");
      }
      
      // Use topic as assignment
      courseObj = topic.unit.course;
      maxPoints = topic.maxPoints || 100;
      xpReward = 50; // Topics don't have xpReward field, use default
    } else {
      // Regular Assignment
      const assignment = await Assignment.findById(assignmentId).populate("course");
      
      if (!assignment) {
        res.status(404);
        throw new Error("Assignment not found");
      }
      
      courseObj = assignment.course;
      maxPoints = assignment.maxPoints || 100;
      xpReward = assignment.xpReward || 50;
    }

    // Verify teacher owns the course
    if (courseObj.teacher.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to grade this submission");
    }

    // Check if grade already exists
    let gradeDoc = await Grade.findOne({ submission: submissionId });
    
    if (gradeDoc) {
      // Update existing grade
      gradeDoc.grade = grade;
      gradeDoc.feedback = feedback;
      
      await gradeDoc.save();
    } else {
      // Create new grade
      gradeDoc = await Grade.create({
        submission: submissionId,
        assignment: assignmentId,
        student: studentId,
        grade,
        feedback,
        xpAwarded: xpReward,
      });
      
      // Award XP for completing assignment (only on first grading)
      await User.findByIdAndUpdate(studentId, {
        $inc: { xp: xpReward }
      });
    }

    res.status(201).json(gradeDoc);
  } catch (err) {
    next(err);
  }
};

export const getGradesForStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    
    // Find all grades for student submissions
    const grades = await Grade.find({ student: studentId })
      .populate({
        path: "submission",
        populate: {
          path: "student",
          select: "name email"
        }
      })
      .sort({ createdAt: -1 });

    // Manually populate assignment details based on assignmentModel
    const gradesWithDetails = await Promise.all(
      grades.map(async (grade) => {
        const gradeObj = grade.toObject();
        
        // Populate assignment details
        if (gradeObj.assignment) {
          // Check if it's a Topic or Assignment
          const topic = await Topic.findById(gradeObj.assignment).populate({
            path: "unit",
            populate: { path: "course", select: "title" }
          });
          
          if (topic) {
            gradeObj.submission.assignment = {
              _id: topic._id,
              title: topic.title,
              course: {
                _id: topic.unit.course._id,
                title: topic.unit.course.title
              }
            };
          } else {
            const assignment = await Assignment.findById(gradeObj.assignment).populate("course", "title");
            if (assignment) {
              gradeObj.submission.assignment = {
                _id: assignment._id,
                title: assignment.title,
                course: assignment.course
              };
            }
          }
        }
        
        return gradeObj;
      })
    );

    res.json(gradesWithDetails);
  } catch (err) {
    next(err);
  }
};

export const getGradesByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    
    // Get all regular assignments for the course
    const assignments = await Assignment.find({ course: courseId });
    const assignmentIds = assignments.map(a => a._id);
    
    // Get topic-based assignments for the course
    const units = await CourseUnit.find({ course: courseId });
    const unitIds = units.map(u => u._id);
    const topicAssignments = await Topic.find({ 
      unit: { $in: unitIds },
      type: "assignment"
    });
    const topicAssignmentIds = topicAssignments.map(t => t._id);
    
    // Combine all assignment IDs
    const allAssignmentIds = [...assignmentIds, ...topicAssignmentIds];
    
    // Get all submissions for those assignments
    const submissions = await Submission.find({ assignment: { $in: allAssignmentIds } })
      .populate("student", "name email")
      .populate("assignment", "title maxPoints");
    
    const submissionIds = submissions.map(s => s._id);
    
    // Get all grades for those submissions
    const grades = await Grade.find({ submission: { $in: submissionIds } })
      .populate({
        path: "submission",
        populate: [
          { path: "student", select: "name email" },
          { path: "assignment", select: "title maxPoints" }
        ]
      })
      .sort({ createdAt: -1 });

    res.json(grades);
  } catch (err) {
    next(err);
  }
};

export const getPendingGrades = async (req, res, next) => {
  try {
    // Get all courses taught by teacher
    const courses = await Course.find({ teacher: req.user._id });
    const courseIds = courses.map(c => c._id);
    
    // Get all regular assignments for those courses
    const assignments = await Assignment.find({ course: { $in: courseIds } });
    const assignmentIds = assignments.map(a => a._id);
    
    // Get topic-based assignments for those courses
    const units = await CourseUnit.find({ course: { $in: courseIds } });
    const unitIds = units.map(u => u._id);
    const topicAssignments = await Topic.find({ 
      unit: { $in: unitIds },
      type: "assignment"
    });
    const topicAssignmentIds = topicAssignments.map(t => t._id);
    
    // Combine all assignment IDs
    const allAssignmentIds = [...assignmentIds, ...topicAssignmentIds];
    
    // Get all submissions
    const submissions = await Submission.find({ assignment: { $in: allAssignmentIds } })
      .populate("student", "name email")
      .populate("assignment", "title course")
      .populate({
        path: "assignment",
        populate: { path: "course", select: "title" }
      });
    
    const submissionIds = submissions.map(s => s._id);
    
    // Find grades that exist
    const existingGrades = await Grade.find({ submission: { $in: submissionIds } });
    const gradedSubmissionIds = existingGrades.map(g => g.submission.toString());
    
    // Filter out submissions that already have grades
    const pendingSubmissions = submissions
      .filter(s => !gradedSubmissionIds.includes(s._id.toString()));

    res.json(pendingSubmissions);
  } catch (err) {
    next(err);
  }
};