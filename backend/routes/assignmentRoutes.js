import express from "express";
import {
  createAssignment,
  uploadAssignment,
  getAssignmentsByCourse,
  getMyAssignments,
} from "../controllers/assignmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

// Teacher creates assignment
router.post("/create", protect, createAssignment);

// Student uploads assignment file
router.post("/upload", protect, upload.single("file"), uploadAssignment);

// Get all assignments for a course
router.get("/course/:courseId", protect, getAssignmentsByCourse);

// Get all assignments for the logged-in student/teacher
router.get("/", protect, getMyAssignments);

export default router;
