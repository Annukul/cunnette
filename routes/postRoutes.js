import express from "express";

import { deletePost, newPost, updatePost, getSinglePost, getAllPosts, upvote, downvote, filterPost } from "../controllers/postControllers.js";

const router = express.Router();

router.post("/new", newPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getSinglePost);
router.get("/", getAllPosts);
router.patch('/:id/upvote', upvote);
router.patch('/:id/downvote', downvote);
router.get("/:cat", filterPost);

export default router;
