import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/userModel.js";
import forgetPasswordToken from "../models/forgetPasswordTokenModel.js";
import sendToken from "../utils/jwtToken.js";
import { sendConfirmationEmail } from "../utils/ConfirmationEmail.js";
import { forgetPasswordEmail } from "../utils/forgetPasswordEmail.js";

import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";


// Register a user => /auth/signup
export const signup = catchAsyncErrors( async (req, res, next) => {
  const { userName, fullName, emailId, password } = req.body;

  // Check userName if already exists
  const checkUsername = await User.findOne({ userName });
  if (checkUsername) {
    return next(new ErrorHandler('Username already Registered', 400));
  }

  // Check email if already exists
  const checkEmailId = await User.findOne({ emailId });
  if (checkEmailId) {
    return next(new ErrorHandler('Email already Registered', 400));
  }

  const emailDomain = emailId.split("@")[1];
  const verificationCode = jwt.sign({ emailId }, process.env.JWT_SECRET);

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
});

// Login a user => /auth/login
export const login =  catchAsyncErrors( async (req, res, next) => {
  // try {
    const { userName, password } = req.body;

    // finding user in database
    const user = await User.findOne({ userName }).select('+password');

    if (!user) {
      return next(new ErrorHandler('Invalid Username or Password', 400));
    }

    // checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid Username or Password', 400));
    }

    sendToken(user, 200, res);
});

// Logout user => /auth/logout
export const logout = catchAsyncErrors( (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Logged Out Successfully!" });
  
});

// Verify user => /auth/confirm/:verificationCode
export const verifyUser = catchAsyncErrors( (req, res, next) => {
  User.findOne({
    verificationCode: req.params.verificationCode,
  })
    .then((user) => {
      if (!user) {
      return next(new ErrorHandler('User not found', 404));
      }
      user.emailVerifyStatus = true;
      user.accountStatus = true;
      user.save((error) => {
        if (error) {
          return next(new ErrorHandler(error.message, 400));
        } else {
          res.status(200).json({success:true, message: "Your Account is Verified" });
        }
      });
    })
    .catch((error) =>
      console.log("/auth/confirm/:verificationCode =>", error.message)
    );
});

// Password Reset Request => /auth/password-reset-request
export const passwordResetRequest = catchAsyncErrors( async (req, res, next) => {
    const { emailId } = req.body;
    if (!emailId) {
      return next(new ErrorHandler('Please write your registered Email Id', 400));
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return next(new ErrorHandler('User with given email does not exist', 400));
    }

    let token = await forgetPasswordToken.findOne({ userId: user._id });
    if (token) {
      return next(new ErrorHandler('Password reset mail already sent, Please check your inbox or spam folder', 400));

    } else {
      token = await new forgetPasswordToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const link = `${process.env.BASE_URL}/auth/password-reset/${user._id}/${token.token}`;
      await forgetPasswordEmail(user.fullName, user.emailId, link);
      res
        .status(200)
        .json({ success: true, message: "Password reset link sent to your email account" });
    }
});

// Password Reset => /password-reset/:userId/:token
export const passwordReset = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user)
        return next(new ErrorHandler('Invalid link or expire', 400));

    const token = await forgetPasswordToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
    return next(new ErrorHandler('Invalid link or expired', 400));

    if (!req.body.password) {
      return next(new ErrorHandler('Password field is Empty', 400));
    }
    user.password = req.body.password;
    await user.save();
    await token.delete();
    res.status(200).json({success:  true, message: "Password reset sucessfully" });

});

