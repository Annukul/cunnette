import Post from '../models/postModel.js';

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