import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    post_id: {
        type: String
    },
    user_id: {
        type: String
    },
    imageName: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
}, { timestamps: true });

const Image = mongoose.model("images", imageSchema);
export default Image;