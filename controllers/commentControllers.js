import Comment from '../models/commentModel.js';

export const addComment = async (req, res) => {
    try {
        const newComment = new Comment({
            post_id: req.body.post_id,
            comment: req.body.comment,
            name: req.body.name
        });

        const comment = await newComment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const editComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        try {
            const editedComment = await Comment.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });

            res.status(200).json(editedComment);
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        try {
            await comment.delete();
            res.status(200).json("Comment deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getComments = async (req, res) => {
    try {
        const comment = await Comment.find({ "post_id": `${req.params.id}` });

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
};