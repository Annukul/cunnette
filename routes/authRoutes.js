import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  verifyUser,
  passwordReset,
  passwordResetRequest,
} from "../controllers/authControllers.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/confirm/:verificationCode", verifyUser);
router.post("/password-reset-request", passwordResetRequest);
router.post("/password-reset/:userId/:token", passwordReset);

export default router;
