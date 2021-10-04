import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "user_id is missing"]
    },
    image_id: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Post heading is missing"]
    },
    excrept: {
      type: String,
    },
    flair: {
        type: Array,
    },
    description: {
      type: String,
      required: [true, "Post description is missing"]
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
