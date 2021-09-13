import mongoose from "mongoose";

const forgetPasswordTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const forgetPasswordToken = mongoose.model(
  "forgetPasswordToken",
  forgetPasswordTokenSchema
);
export default forgetPasswordToken;
