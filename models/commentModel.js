import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    post_id: {
      type: String,
    },
    comment: {
      type: String,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentsSchema);
export default Comment;
