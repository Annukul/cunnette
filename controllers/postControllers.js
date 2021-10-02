import Post from "../models/postModel.js";
import mongoose from "mongoose";

// post: /post/new
export const newPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      excrept: req.body.excrept,
      category: req.body.category,
      flair: req.body.flair,
      description: req.body.description,
      image: req.body.image,
      vote: req.body.vote,
      commentsCount: req.body.commentsCount,
    });

    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete: /post/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    try {
      await post.delete();
      res.status(200).json("Post deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// patch: /post/:id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get: /post/:id
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get /post
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get posts by flair
export const filterPost = async (req, res) => {
    try {
      const post = await Post.find({flair: [req.params.cat]});

      if (!post) return res.status(404).json("Post not found");

      res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// patch: /post/:id/upvote
export const upvote = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { upvote: post.upvote + 1 },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// patch: /post/:id/downvote
export const downvote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { downvote: post.downvote + 1 },
    { new: true }
  );

  res.status(200).json(updatedPost);
};
