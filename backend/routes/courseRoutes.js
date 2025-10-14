import express from "express";
import { createCourse, getCourses, getCourseById, getStudentsInCourse } from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", protect, getCourses);
router.get("/:id", protect, getCourseById);
router.get("/:courseId/students", protect, getStudentsInCourse);

export default router;
