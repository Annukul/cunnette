import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
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
});

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
