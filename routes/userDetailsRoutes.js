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
  profileUpload,
} from "../controllers/userDetailsControllers.js";
import isAuthenticatedUser from "../middlewares/auth.js";

const router = express.Router();
router.post("/addUserDetails", addUserDetails);
router.get("/getUserDetails/:id", getUserDetail);
router.put("/updateUserDetail/:id", updateUserDetail);
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

// Upload profile pic
router.post("/upload", profileUpload);

export default router;
