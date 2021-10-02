import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    image_id: {
      type: String,
    },
    title: {
      type: String,
    },
    excrept: {
      type: String,
    },
    flair: {
      type: Array,
    },
    description: {
      type: String,
    },
    imageUrl: {
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
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);
export default Post;
