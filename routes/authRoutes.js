import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  verifyUser,
  passwordReset,
  passwordResetRequest,
  getUser
} from "../controllers/authControllers.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:id", getUser);
router.post("/confirm/:verificationCode", verifyUser);
router.post("/password-reset-request", passwordResetRequest);
router.post("/password-reset/:userId/:token", passwordReset);

export default router;
