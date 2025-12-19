import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import passport from "./config/passport.js"; // passport strategies
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import studySessionRoutes from "./routes/studySessionRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import codePracticeRoutes from "./routes/codePracticeRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "http://localhost:3000", // Local development alternative
  process.env.FRONTEND_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Session for Google OAuth
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/study-sessions", studySessionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/code-practice", codePracticeRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
