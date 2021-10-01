import Post from '../models/postModel.js';

// Create post
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
            commentsCount: req.body.commentsCount
        });

        const post = await newPost.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Delete post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        try {
            await post.delete()
            res.status(200).json("Post deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });

            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get single post
export const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
};