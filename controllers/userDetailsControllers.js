import userDetails from "../models/userDetailsModel.js";
import userAchievements from "../models/userAchievementsModel.js";

// Add User Details => /user/addUserDetails
export const addUserDetails = async (req, res) => {
  try {
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

    res.status(200).json(detail);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log("/user/addUserDetails =>" + error.message);
  }
};

// Get detail of particular User => user/getUserDetail/:id
export const getUserDetail = async (req, res) => {
  try {
    const userDetail = await userDetails.findOne({ _userId: req.params.id });
    if (!userDetail) {
      return res.status(400).json({ message: "User Not Found" });
    }
    return res.status(200).json(userDetail);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log("/user/userDetail/:id =>" + error.message);
  }
};

// Update user detail => /user/updateUserDetail/:id
export const updateUserDetail = async (req, res) => {
  try {
    const userDetail = await userDetails.findOne({ _userId: req.params.id });
    if (!userDetail) {
      return res.status(400).json({ message: "User Detail Not Found" });
    }
    const updatedUserDetail = await userDetails.findOneAndUpdate(
      { _userId: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedUserDetail);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log("/user/updateUserDetail/:id => " + error.message);
  }
};

// *****************
// User Achievements
// *****************

// Add User Achievements => /user/addUserAchievements
export const addUserAchievements = async (req, res) => {
  try {
    const newUserAchievements = new userAchievements({
      _userId: req.body._userId,
      internships: req.body.internships,
      jobs: req.body.jobs,
      certificates: req.body.certificates,
      achievements: req.body.achievements,
    });

    const achievement = await newUserAchievements.save();

    res.status(200).json(achievement);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log("/user/addUserAchievements =>" + error.message);
  }
};

// Add User Single Achievement => /user/addUserSingleAchievement/:id/:achievement
export const addUserSingleAchievement = async (req, res) => {
  try {
    let achievement = req.params.achievement;
    const userSingleAchievement = await userAchievements.findOne({
      _userId: req.params.id,
    });
    if (!userSingleAchievement) {
      return res.status(400).json({ message: "User Achievement Not Found" });
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
    return res.status(200).json(addUserSingleAchievement);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log("/user/addUserSingleAchievements =>" + error.message);
  }
};

// Get achievement of particular User => user/getUserAchievements/:id
export const getUserAchievement = async (req, res) => {
  try {
    const userAchievement = await userAchievements.findOne({
      _userId: req.params.id,
    });
    if (!userAchievement) {
      return res.status(400).json({ message: "Achievement Not Found" });
    }
    return res.status(200).json(userAchievement);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log("/user/addUserAchievements/:id =>" + error.message);
  }
};

// Get single achievement of particular User => user/getUserAchievements/:id/:achievement/:arrayId
export const getUserSingleAchievement = async (req, res) => {
  try {
    let i = req.params.arrayId;
    let achievement = req.params.achievement;
    const userAchievement = await userAchievements
      .findOne({
        _userId: req.params.id,
      })
      .select({ [`${achievement}`]: { $elemMatch: { _id: i } } });
    if (!userAchievement) {
      return res.status(400).json({ message: "Achievement Not Found" });
    }
    return res.status(200).json(userAchievement);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log("/user/addUserSingleAchievements/:id =>" + error.message);
  }
};

// Update user Achievements => /user/updateUserAchievement/:id/:achievement/:index
export const updateUserAchievement = async (req, res) => {
  try {
    let i = req.params.index;
    let achievement = req.params.achievement;
    const userAchievement = await userAchievements.findOne({
      _userId: req.params.id,
    });
    if (!userAchievement) {
      return res.status(400).json({ message: "User Achievement Not Found" });
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
    return res.status(200).json(updatedUserAchievement);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log(
      "/user/updateUserAchievement/:id/:achievement/:index => " + error.message
    );
  }
};

// Delete user Achievements => /user/updateUserAchievement/:id/:achievement/:arrayId
export const deleteUserAchievement = async (req, res) => {
  try {
    let i = req.params.arrayId;
    let achievement = req.params.achievement;
    const userAchievement = await userAchievements.findOne({
      _userId: req.params.id,
    });
    if (!userAchievement) {
      return res.status(400).json({ message: "User Achievement Not Found" });
    }

    const deletedUserAchievement = await userAchievements.findOneAndUpdate(
      { _userId: req.params.id },
      {
        $pull: { [`${achievement}`]: { _id: i } },
      },
      { new: true }
    );
    return res.status(200).json(deletedUserAchievement);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, Please try again" });
    console.log(
      "/user/deleteUserAchievement/:id/:achievement/:index => " + error.message
    );
  }
};
