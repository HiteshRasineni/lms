import express from "express";
import passport from "passport";
import {
  register,
  login,
  getProfile,
  verifyEmail,
  resendVerification,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Normal Auth
router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

// Email verification
router.get("/verify-email", verifyEmail);
router.post("/verify-email/resend", resendVerification);
// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;
    // Redirect to frontend route to handle the token
    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
  }
);

export default router;
