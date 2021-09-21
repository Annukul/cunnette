import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    image_id: {
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
    imageUrl: {
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