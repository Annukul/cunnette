import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloud = (file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({ url: result.url, id: result.public_id });
            },
            { resource_type: "auto" }
        )
    })
}

export default cloud;