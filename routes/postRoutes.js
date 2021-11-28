import express from "express";

import {
  deletePost,
  newPost,
  updatePost,
  getSinglePost,
  getAllPosts,
  upvote,
  downvote,
  filterPost,
  getUserPost,
} from "../controllers/postControllers.js";

const router = express.Router();

router.post("/new", newPost);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.get("/single/:id", getSinglePost);
router.get("/all/posts", getAllPosts);
router.patch("/:id/upvote", upvote);
router.patch("/:id/downvote", downvote);
router.get("/byflair/:flair", filterPost);
router.get("/userpost/:id", getUserPost);

export default router;
