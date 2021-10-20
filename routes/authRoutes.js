import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  verifyUser,
  passwordReset,
  getUserProfile,
  passwordResetRequest
} from "../controllers/authControllers.js";
import isAuthenticatedUser from "../middlewares/auth.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/confirm/:verificationCode", verifyUser);
router.post("/password-reset-request", passwordResetRequest);
router.post("/password-reset/:userId/:token", passwordReset);
router.get('/me', isAuthenticatedUser, getUserProfile)

export default router;
