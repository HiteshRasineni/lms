// controllers/plagiarismController.js
import Submission from "../models/Submission.js";
import PlagiarismReport from "../models/PlagiarismReport.js";
import Assignment from "../models/Assignment.js";
import User from "../models/User.js";
import { checkPlagiarism } from "../utils/plagiarismClient.js";
import { sendPlagiarismAlert } from "../utils/sendEmail.js";

/**
 * POST /api/plagiarism/check/:assignmentId
 * Only teacher can trigger plagiarism checking for an assignment.
 */
export const runPlagiarismCheck = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (req.user.role !== "Teacher") {
      return res.status(403).json({ message: "Access denied. Teachers only." });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // Get all submissions for this assignment
    const submissions = await Submission.find({ assignment: assignmentId }).populate("student", "name email");

    if (submissions.length < 2) {
      return res.status(400).json({ message: "Need at least 2 submissions for plagiarism check." });
    }

    // Prepare data for ML service
    const submissionData = submissions.map(s => ({
      id: s._id,
      fileUrl: s.fileUrl,
      studentName: s.student.name,
    }));

    // Call ML service (Python API)
    const mlResults = await checkPlagiarism(
      submissionData.map(s => s.id),
      submissionData.map(s => s.fileUrl)
    );

    // Store results in DB
    const reports = [];
    for (const result of mlResults) {
      const { submissionId, matchedWith, similarity } = result;
      const report = await PlagiarismReport.create({
        submission: submissionId,
        matchedWith,
        similarity,
      });
      reports.push(report);
    }

    // Optional: Email teacher summary
    await sendPlagiarismAlert(req.user.email, assignment.title, mlResults);

    res.status(200).json({
      message: "✅ Plagiarism check completed.",
      reports,
    });
  } catch (error) {
    console.error("Plagiarism check error:", error);
    res.status(500).json({ message: "Error running plagiarism check" });
  }
};

/**
 * GET /api/plagiarism/:assignmentId
 * Returns stored plagiarism reports for a teacher or student.
 */
export const getPlagiarismReports = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({ assignment: assignmentId }).populate("student", "name");
    const submissionIds = submissions.map(s => s._id);

    const reports = await PlagiarismReport.find({ submission: { $in: submissionIds } })
      .populate({
        path: "submission",
        select: "student fileUrl",
        populate: { path: "student", select: "name" },
      })
      .populate("matchedWith", "name");

    const formatted = reports.map(r => ({
      submissionId: r.submission._id,
      student: r.submission.student.name,
      matchedWith: r.matchedWith ? r.matchedWith.name : "N/A",
      similarity: r.similarity,
      fileUrl: r.submission.fileUrl,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Get plagiarism reports error:", error);
    res.status(500).json({ message: "Error fetching plagiarism reports" });
  }
};
