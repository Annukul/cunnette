import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/userModel.js";
import forgetPasswordToken from "../models/forgetPasswordTokenModel.js";
import sendToken from "../utils/jwtToken.js";
import { sendConfirmationEmail } from "../utils/ConfirmationEmail.js";
import { forgetPasswordEmail } from "../utils/forgetPasswordEmail.js";

// Register a user => /auth/signup
export const signup = async (req, res) => {
  const { userName, fullName, emailId, password } = req.body;

  // Check of empty fields
  if (!userName || !fullName || !emailId || !password) {
    return res.status(400).json({ message: "Opps, write all the details" });
  }

  // Check userName if already exists
  const checkUsername = await User.findOne({ userName });
  if (checkUsername) {
    return res.status(400).json({ message: "Username already registered" });
  }

  // Check email if already exists
  const checkEmailId = await User.findOne({ emailId });
  if (checkEmailId) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const emailDomain = emailId.split("@")[1];
  const verificationCode = jwt.sign({ emailId }, process.env.JWT_SECRET);

  try {
    const user = await User.create({
      userName,
      fullName,
      emailId,
      password,
      emailDomain,
      verificationCode,
    });
    sendConfirmationEmail(fullName, emailId, verificationCode);
    sendToken(user, 200, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
    console.log("/auth/signup =>" + error.message);
  }
};

// Login a user => /auth/login
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // checks if username and password is entered by user
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Please enter Username & password" });
    }

    // finding user in database
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    // checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
    console.log("/auth/login =>" + error.message);
  }
};

// Logout user => /auth/logout
export const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Logged Out Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
    console.log("/auth/logout =>" + error.message);
  }
};

// Verify user => /auth/confirm/:verificationCode
export const verifyUser = (req, res) => {
  User.findOne({
    verificationCode: req.params.verificationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }

      user.emailVerifyStatus = true;
      user.accountStatus = true;
      user.save((error) => {
        if (error) {
          res.status(500).json({ message: error.message });
          return;
        } else {
          res.status(200).json({ message: "Your Account is Verified" });
        }
      });
    })
    .catch((error) =>
      console.log("/auth/confirm/:verificationCode =>", error.message)
    );
};

// Password Reset Request => /auth/password-reset-request
export const passwordResetRequest = async (req, res) => {
  try {
    const { emailId } = req.body;
    if (!emailId) {
      res
        .status(400)
        .json({ message: "Please write your registered Email Id" });
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.status(400).json({ message: "User with given email doesn't exist" });
    }

    let token = await forgetPasswordToken.findOne({ userId: user._id });
    if (token) {
      res.status(400).json({
        message:
          "Password reset mail already sent, Please check your inbox or spam",
      });
    } else {
      token = await new forgetPasswordToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const link = `${process.env.BASE_URL}/auth/password-reset/${user._id}/${token.token}`;
      await forgetPasswordEmail(user.fullName, user.emailId, link);
      res
        .status(200)
        .json({ message: "Password reset link sent to your email account" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
    console.log("/auth/password-reset-request =>" + error.message);
  }
};

// Password Reset => /password-reset/:userId/:token
export const passwordReset = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).json({ message: "Invalid link or expired" });

    const token = await forgetPasswordToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res.status(400).json({ message: "Invalid link or expired" });

    if (!req.body.password) {
      return res.status(400).json({ message: "Opps, write all the details" });
    }

    // res.redirect("http://localhost:5000/reset");

    user.password = req.body.password;
    await user.save();
    await token.delete();
    res.status(200).json({ message: "Password reset sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
    console.log("/password-reset/:userId/:token => " + error.message);
  }
};
