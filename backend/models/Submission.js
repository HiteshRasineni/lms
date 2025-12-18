import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignment: { 
    type: mongoose.Schema.Types.ObjectId, 
    refPath: "assignmentModel",
    required: true 
  },
  assignmentModel: {
    type: String,
    required: true,
    enum: ["Assignment", "Topic"]
  },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileUrl: String,
  isDraft: { type: Boolean, default: false },
  comments: String,
}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);
