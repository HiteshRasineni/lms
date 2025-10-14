import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  submission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
  grade: Number,
  feedback: String,
}, { timestamps: true });

export default mongoose.model("Grade", gradeSchema);
