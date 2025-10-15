import Grade from "../models/Grade.js";
import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import User from "../models/User.js";

export const gradeSubmission = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;
    const submission = await Submission.findById(submissionId).populate("assignment");
    if (!submission) {
      res.status(404);
      throw new Error("Submission not found");
    }

    // optional: verify teacher owns the course for this submission
    // You can add that check here.

    const created = await Grade.create({
      submission: submissionId,
      grade,
      feedback,
    });
    // Award XP for completing assignment (50 XP)
    await User.findByIdAndUpdate(submission.student, {
      $inc: { xp: 50 }
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const getGradesForStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.find()
      .populate({
        path: "submission",
        match: { student: studentId },
        populate: { path: "assignment", select: "title course" },
      })
      .sort({ createdAt: -1 });

    // Filter out null submission matches
    const filtered = grades.filter(g => g.submission != null);
    res.json(filtered);
  } catch (err) {
    next(err);
  }
};
