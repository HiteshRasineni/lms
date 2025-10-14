import express from "express";
import { gradeSubmission, getGradesForStudent } from "../controllers/gradeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:submissionId", protect, gradeSubmission);
router.get("/student/:studentId", protect, getGradesForStudent);

export default router;
