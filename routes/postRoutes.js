import express from "express";

import { deletePost, newPost, updatePost, getSinglePost, getAllPosts } from "../controllers/postControllers.js";

const router = express.Router();

router.post("/new", newPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getSinglePost);
router.get("/", getAllPosts);

export default router;
