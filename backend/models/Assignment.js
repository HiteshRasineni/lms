import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  dueDate: Date,
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
