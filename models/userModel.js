import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please Enter Username"],
      maxlength: [15, 'Your Username cannot exceed 15 characters']
    },
    fullName: {
      type: String,
      required: [true, "Please Enter Your Full Name"],
      maxLength: [30, 'Your Name cannot exceed 30 characters']
    },
    emailId: {
      type: String,
      required: [true, 'Please enter your email'],
      validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Your password must be longer than 6 characters'],
      select: false
    },
    emailDomain: {
      type: String,
    },
    userRole: {
      type: String,
      default: "user",
    },
    emailVerifyStatus: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    accountStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const User = mongoose.model("users", userSchema);
export default User;
