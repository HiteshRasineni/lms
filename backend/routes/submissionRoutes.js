import express from "express";
import { submitAssignment, getSubmissionsByAssignment, getSubmissionsByCourse } from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

// file upload middleware expects field 'file'
router.post("/", protect, upload.single("file"), submitAssignment);

router.get("/assignment/:assignmentId", protect, getSubmissionsByAssignment);
router.get("/course/:courseId", protect, getSubmissionsByCourse);

export default router;
