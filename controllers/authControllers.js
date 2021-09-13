import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail } from "../config/nodemailer.config.js";

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
