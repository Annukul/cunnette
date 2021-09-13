import User from "../models/userModel.js";
import forgetPasswordToken from "../models/forgetPasswordTokenModel.js";
import sendToken from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendConfirmationEmail } from "../config/nodemailer.config.js";
import { forgetPasswordEmail } from "../utils/forgetPasswordEmail.js";
// Register a user => /auth/signup
export const signup = async (req, res) => {
  const { userName, fullName, emailId, password } = req.body;

  // Check userName and email if already exists
  const checkUsername = await User.findOne({ userName });
  if (checkUsername) {
    return res.status(401).json({ message: "Username already registered" });
  }
  const checkEmailId = await User.findOne({ emailId });
  if (checkEmailId) {
    return res.status(401).json({ message: "Email already registered" });
  }

  // Check of empty fields
  if (!userName || !fullName || !emailId || !password) {
    return res.status(401).json({ message: "Opps, write all the details" });
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
    res.status(500).json({ message: error.message });
  }
};

// Login a user => /auth/login
export const login = async (req, res) => {
  const { userName, password } = req.body;

  // checks if username and password is entered by user
  if (!userName || !password) {
    return res.status(400).json({ message: "Please enter email & password" });
  }

  // finding user in database
  const user = await User.findOne({ userName });

  if (!user) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  // checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  sendToken(user, 200, res);
};

// Logout user => /auth/logout
export const logout = (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged Out" });
};

// Verify user => /auth/confirm/:verificationCode
export const verifyUser = (req, res) => {
  User.findOne({
    verificationCode: req.params.verificationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.emailVerifyStatus = true;
      user.accountStatus = true;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send({ message: "Your Account is Verified" });
        }
      });
    })
    .catch((e) => console.log("error", e));
};

// Password Reset Request => /auth/password-reset-request
export const passwordResetRequest = async (req, res) => {
  try {
    const { emailId } = req.body;
    if (!emailId) {
      res
        .status(400)
        .send({ message: "Please write your registered Email Id" });
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.status(400).send({ message: "User with given email doesn't exist" });
    }

    let token = await forgetPasswordToken.findOne({ userId: user._id });
    if (!token) {
      token = await new forgetPasswordToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const link = `http://localhost:5000/auth/password-reset/${user._id}/${token.token}`;
      await forgetPasswordEmail(user.fullName, user.emailId, link);
      console.log(user.emailId);

      res
        .status(200)
        .send({ message: "Password reset link sent to your email account" });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong, Please try again" });
    console.log("Password Reset Request" + error);
  }
};
// Password Reset => /password-reset/:userId/:token
export const passwordReset = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await forgetPasswordToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();
    res.status(200).send({ message: "Password reset sucessfully" });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong, Please try again" });
    console.log("Password Reset" + error);
  }
};
