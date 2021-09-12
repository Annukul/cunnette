import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    _userId: {
        type: String
    },
    title: {
        type: String
    },
    excrept: {
        type: String
    },
    category: {
        type: Array
    },
    flair: {
        type: Array
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    vote: {
        upvote: {
            type: String
        },
        downvote: {
            type: String
        }
    },
    commentsCount: {
        type: String
    }
}, { timestamps: true });

const Post = mongoose.model("posts", postSchema);
export default Post;