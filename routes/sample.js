import express from 'express';

import Post from './model.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
        });

        const post = await newPost.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;