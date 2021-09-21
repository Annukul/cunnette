import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, path.join(__dirname, "../files"));
        } else {
            cb({ message: "This file is not an image file" }, false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = {
    imageUpload: multer({ storage: imageStorage })
};