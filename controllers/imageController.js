import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})

export const uploadImage = (req, res, next) => {
    const upload = multer({ storage }).single('image');
    upload(req, res, function (err) {
        if (err) {
            return res.send(err)
        }
        res.json(req.file)
    });

    const pat = req.file.path
    const uniqueFilename = new Date().toISOString()

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    cloudinary.uploader.upload(
        pat,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        function (err, image) {
            if (err) return res.send(err)
            console.log('file uploaded to Cloudinary')
            // remove file from server
            fs.unlinkSync(path)
            // return image details
            res.json(image)
        }
    );
}