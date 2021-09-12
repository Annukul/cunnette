import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  verifyUser,
} from "../controllers/authControllers.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/confirm/:verificationCode", verifyUser);

export default router;
