import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import Enrollment from "../models/Enrollment.js";
import { checkPlagiarism } from "../utils/plagiarismClient.js";
import PlagiarismReport from "../models/PlagiarismReport.js";
import fs from "fs";
import path from "path";

/**
 * Student uploads a PDF for an assignment.
 * Uses multer via route to place file in uploads/assignments
 */
export const submitAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.body;
    if (!req.file) {
      res.status(400);
      throw new Error("PDF file is required");
    }
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      // delete file
      fs.unlinkSync(req.file.path);
      res.status(404);
      throw new Error("Assignment not found");
    }

    // Optionally: check student enrolled
    const enrolled = await Enrollment.findOne({ course: assignment.course, student: req.user._id });
    if (!enrolled && req.user.role !== "Teacher") {
      fs.unlinkSync(req.file.path);
      res.status(403);
      throw new Error("You are not enrolled in this course");
    }

    const fileUrl = `/uploads/assignments/${req.file.filename}`; // served statically
    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user._id,
      fileUrl,
      plagiarismChecked: false,
    });

    res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
};

export const getMySubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate("assignment")
      .populate({
        path: "assignment",
        populate: { path: "course", select: "title" }
      })
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
};

export const getSubmissionsByAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await Submission.find({ assignment: assignmentId })
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
};

export const getSubmissionsByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    // get assignment ids for course
    const assignments = await Assignment.find({ course: courseId }).select("_id");
    const assignmentIds = assignments.map(a => a._id);
    const submissions = await Submission.find({ assignment: { $in: assignmentIds } })
      .populate("student", "name email")
      .populate("assignment", "title");
    res.json(submissions);
  } catch (err) {
    next(err);
  }
};