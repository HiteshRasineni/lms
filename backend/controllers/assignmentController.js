import Assignment from "../models/Assignment.js";
import Course from "../models/Course.js";
import asyncHandler from "express-async-handler";

// ===============================
// TEACHER: Create a new assignment
// ===============================
export const createAssignment = asyncHandler(async (req, res) => {
  const { title, description, dueDate, courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  const newAssignment = new Assignment({
    title,
    description,
    dueDate,
    course: courseId,
    createdBy: req.user._id, // teacher id
  });

  await newAssignment.save();
  res.status(201).json({
    message: "Assignment created successfully",
    assignment: newAssignment,
  });
});

// ===================================
// STUDENT: Upload a submission (PDF)
// ===================================
export const uploadAssignment = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user._id;

  const fileUrl = req.file?.path;
  if (!fileUrl) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const submission = new Assignment({
    course: courseId,
    student: studentId,
    fileUrl,
    status: "submitted",
    submittedAt: new Date(),
  });

  await submission.save();

  res.status(201).json({
    message: "Assignment uploaded successfully",
    fileUrl,
    assignment: submission,
  });
});

// ===================================
// BOTH: Get assignments for a course
// ===================================
export const getAssignmentsByCourse = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({ course: req.params.courseId });
  res.status(200).json(assignments);
});
