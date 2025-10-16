import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import Enrollment from "../models/Enrollment.js";
import Topic from "../models/Topic.js";
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
    // Check if it's a regular assignment or a topic assignment
    let assignment = await Assignment.findById(assignmentId);
    let courseId;
    if (!assignment) {
      // Try to find it as a topic
      const topic = await Topic.findById(assignmentId).populate({
        path: "unit",
        populate: { path: "course" }
      });
      
      if (!topic || topic.type !== "assignment") {
        fs.unlinkSync(req.file.path);
        res.status(404);
        throw new Error("Assignment not found");
      }
      
      courseId = topic.unit.course._id;
    } else {
      courseId = assignment.course;
    }

    // Optionally: check student enrolled
    const enrolled = await Enrollment.findOne({ course: courseId, student: req.user._id });
    if (!enrolled && req.user.role !== "Teacher") {
      fs.unlinkSync(req.file.path);
      res.status(403);
      throw new Error("You are not enrolled in this course");
    }

    const fileUrl = req.file.path; // Cloudinary URL
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