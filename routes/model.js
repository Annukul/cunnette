import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    }
}, { timestamps: true });

const Post = mongoose.model("post", PostSchema);
export default Post;