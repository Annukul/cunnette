import Post from "../models/postModel.js";
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Add Post: /post/new
export const newPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(200).json({ success: true, post });
});

// Delete Post: /post/delete/:id
export const deletePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }
  await post.delete();
  res.status(200).json({ succes: true, message: "Post deleted" });
});

// Patch Post: /post/update/:id
export const updatePost = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id);
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(200).json({ success: true, updatedPost });
});

// Get Single Post: /post/single/:id
export const getSinglePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  res.status(200).json({ success: true, post });
});

// Get /post/all/posts
export const getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({ success: true, posts });
});

// Get posts by flair /post/byflair/:flair
export const filterPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ flair: req.params.flair });
  if (post.length == 0) {
    return next(new ErrorHandler("Post Not Found", 404));
  }
  res.status(200).json({ success: true, post });
});

// Get post by user
export const getUserPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ user_id: req.params.id });
  res.status(200).json({ success: true, post: post });
});

// upvote patch: /post/:id/upvote
export const upvote = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler(`No post with id: ${id}`, 404));
  }

  const post = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { upvote: post.upvote + 1 },
    { new: true }
  );

  res.status(200).json({ success: true, updatedPost });
});

// downvote patch: /post/:id/downvote
export const downvote = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new ErrorHandler(`No post with id: ${id}`, 404));

  const post = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { downvote: post.downvote + 1 },
    { new: true }
  );

  res.status(200).json({ success: true, updatedPost });
});
