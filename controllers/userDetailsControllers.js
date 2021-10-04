import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import cloudinary from "cloudinary";
const app = express();

import userDetails from "../models/userDetailsModel.js";
import userAchievements from "../models/userAchievementsModel.js";

import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Add User Details => /user/addUserDetails
export const addUserDetails = catchAsyncErrors(async (req, res, next) => {
  const newUserDetails = new userDetails({
    _userId: req.body._userId,
    collegeDetail: req.body.collegeDetail,
    about: req.body.about,
    skills: req.body.skills,
    dob: req.body.dob,
    contacts: req.body.contacts,
    socialLinks: req.body.socialLinks,
    address: req.body.address,
  });

  const detail = await newUserDetails.save();

  res.status(200).json({ success: true, detail });
});

// Get detail of particular User => user/getUserDetail/:id
export const getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const userDetail = await userDetails.findOne({ _userId: req.params.id });
  if (!userDetail) {
    return next(new ErrorHandler("User Not Found", 400));
  }
  return res.status(200).json({ success: true, userDetail });
});

// Update user detail => /user/updateUserDetail/:id
export const updateUserDetail = catchAsyncErrors(async (req, res, next) => {
  const userDetail = await userDetails.findOne({ _userId: req.params.id });
  if (!userDetail) {
    return next(new ErrorHandler("User Detail Not Found", 400));
  }
  const updatedUserDetail = await userDetails.findOneAndUpdate(
    { _userId: req.params.id },
    req.body,
    { new: true }
  );
  return res.status(200).json({ success: true, updatedUserDetail });
});

// *****************
// User Achievements
// *****************

// Add User Achievements => /user/addUserAchievements
export const addUserAchievements = catchAsyncErrors(async (req, res, next) => {
  const newUserAchievements = new userAchievements({
    _userId: req.body._userId,
    internships: req.body.internships,
    jobs: req.body.jobs,
    certificates: req.body.certificates,
    achievements: req.body.achievements,
  });

  const achievement = await newUserAchievements.save();
  res.status(200).json({ success: true, achievement });
});

// Add User Single Achievement => /user/addUserSingleAchievement/:id/:achievement
export const addUserSingleAchievement = catchAsyncErrors(
  async (req, res, next) => {
    let achievement = req.params.achievement;
    const userSingleAchievement = await userAchievements.findOne({
      _userId: req.params.id,
    });
    if (!userSingleAchievement) {
      return next(new ErrorHandler("User Achievement Not Found", 400));
    }

    const addUserSingleAchievement = await userAchievements.findOneAndUpdate(
      {
        _userId: req.params.id,
      },
      {
        $push: { [`${achievement}`]: req.body[achievement] },
      },

      { new: true }
    );
    return res.status(200).json({ success: true, addUserSingleAchievement });
  }
);

// Get achievement of particular User => user/getUserAchievements/:id
export const getUserAchievement = catchAsyncErrors(async (req, res, next) => {
  const userAchievement = await userAchievements.findOne({
    _userId: req.params.id,
  });
  if (!userAchievement) {
    return next(new ErrorHandler("Achievement Not Found", 400));
  }
  return res.status(200).json({ success: true, userAchievement });
});

// Get single achievement of particular User => user/getUserAchievements/:id/:achievement/:arrayId
export const getUserSingleAchievement = catchAsyncErrors(async (req, res) => {
  let i = req.params.arrayId;
  let achievement = req.params.achievement;
  const userAchievement = await userAchievements
    .findOne({
      _userId: req.params.id,
    })
    .select({ [`${achievement}`]: { $elemMatch: { _id: i } } });
  if (!userAchievement) {
    return next(new ErrorHandler("Achievement Not Found", 400));
  }
  return res.status(200).json({ success: true, userAchievement });
});

// Update user Achievements => /user/updateUserAchievement/:id/:achievement/:index
export const updateUserAchievement = catchAsyncErrors(async (req, res) => {
  let i = req.params.index;
  let achievement = req.params.achievement;
  const userAchievement = await userAchievements.findOne({
    _userId: req.params.id,
  });
  if (!userAchievement) {
    return next(new ErrorHandler("Achievement Not Found", 400));
  }

  const updatedUserAchievement = await userAchievements.findOneAndUpdate(
    {
      _userId: req.params.id,
    },
    {
      $set: { [`${achievement}.${i}`]: req.body[achievement] },
    },

    { new: true }
  );
  return res.status(200).json({ success: true, updatedUserAchievement });
});

// Delete user Achievements => /user/updateUserAchievement/:id/:achievement/:arrayId
export const deleteUserAchievement = catchAsyncErrors(async (req, res) => {
  let i = req.params.arrayId;
  let achievement = req.params.achievement;
  const userAchievement = await userAchievements.findOne({
    _userId: req.params.id,
  });
  if (!userAchievement) {
    return next(new ErrorHandler("Achievement Not Found", 400));
  }

  const deletedUserAchievement = await userAchievements.findOneAndUpdate(
    { _userId: req.params.id },
    {
      $pull: { [`${achievement}`]: { _id: i } },
    },
    { new: true }
  );
  return res.status(200).json({ success: true, deletedUserAchievement });
});

// Upload profile pic
export const profileUpload = async (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "../files/");
      },
      filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
      },
    });

    // POST ROUTE
    app.post("/upload", (req, res, next) => {
      const upload = multer({ storage }).single("image");
      upload(req, res, function (err) {
        if (err) {
          return res.send(err);
        }

        console.log("file uploaded to server");
        console.log(req.file);

        // SEND FILE TO CLOUDINARY
        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET,
        });

        const path = req.file.path;
        const uniqueFilename = new Date().toISOString();

        console.log("No error, it should work");
        cloudinary.uploader.upload(
          path,
          { public_id: `profiles/${uniqueFilename}`, tags: `profiles` }, // directory and tags are optional
          function (err, image) {
            if (err) return res.send(err);
            console.log("file uploaded to Cloudinary");

            fs.unlinkSync(path);

            res.json(image);
          }
        );
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
