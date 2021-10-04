import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    post_id: {
        type: String
    },
    userName: {
        type: String
    },
    comment: {
        type: String
    },
    vote: {
        upvote: {
            type: String,
            default: 0
        },
        downvote: {
            type: String,
            default: 0
        }
    }
}, { timestamps: true });

const Comment = mongoose.model("comments", commentsSchema);
export default Comment;