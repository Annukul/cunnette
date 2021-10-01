import express from "express";

import {
  addUserDetails,
  getUserDetail,
  updateUserDetail,
  addUserAchievements,
  addUserSingleAchievement,
  getUserAchievement,
  getUserSingleAchievement,
  updateUserAchievement,
  deleteUserAchievement,
} from "../controllers/userDetailsControllers.js";
import isAuthenticatedUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/addUserDetails", isAuthenticatedUser, addUserDetails);
router.get("/getUserDetail/:id", isAuthenticatedUser, getUserDetail);
router.put("/updateUserDetail/:id", isAuthenticatedUser, updateUserDetail);
// User Achievements Routes
router.post("/addUserAchievements", isAuthenticatedUser, addUserAchievements);
router.put(
  "/addUserSingleAchievement/:id/:achievement",
  isAuthenticatedUser,
  addUserSingleAchievement
);
router.get("/getUserAchievements/:id", isAuthenticatedUser, getUserAchievement);
router.get(
  "/getUserSingleAchievements/:id/:achievement/:arrayId",
  isAuthenticatedUser,
  getUserSingleAchievement
);
router.put(
  "/updateUserAchievement/:id/:achievement/:index",
  isAuthenticatedUser,
  updateUserAchievement
);
router.delete(
  "/updateUserAchievement/:id/:achievement/:arrayId",
  isAuthenticatedUser,
  deleteUserAchievement
);

export default router;
