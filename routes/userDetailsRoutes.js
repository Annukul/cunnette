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

const router = express.Router();

router.post("/addUserDetails", addUserDetails);
router.get("/getUserDetail/:id", getUserDetail);
router.put("/updateUserDetail/:id", updateUserDetail);
// User Achievements Routes
router.post("/addUserAchievements", addUserAchievements);
router.put(
  "/addUserSingleAchievement/:id/:achievement",
  addUserSingleAchievement
);
router.get("/getUserAchievements/:id", getUserAchievement);
router.get(
  "/getUserSingleAchievements/:id/:achievement/:arrayId",
  getUserSingleAchievement
);
router.put(
  "/updateUserAchievement/:id/:achievement/:index",
  updateUserAchievement
);
router.delete(
  "/updateUserAchievement/:id/:achievement/:arrayId",
  deleteUserAchievement
);

export default router;
