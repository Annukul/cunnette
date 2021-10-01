import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import fs from 'fs';
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";

import userDetailsRoutes from "./routes/userDetailsRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import imageRoutes from './routes/imageRoutes.js';
import commentRoutes from "./routes/commentRoutes.js";
// import { uploadImage } from "./controllers/imageController.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(cookieParser());

// DATABASE
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// ROUTES
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Server is working good..." });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.use("/auth", authRoutes);
app.use("/user", userDetailsRoutes);
app.use("/post", postRoutes);
// app.use("/upload", imageRoutes);
app.use("/comment", commentRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

// POST ROUTE
app.post("/upload", (req, res, next) => {
  const upload = multer({ storage }).single("image");
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }

    console.log("file uploaded to server");
    console.log(req.file);

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

      console.log("No error, it should work");
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        function (err, image) {
          if (err) return res.send(err);
          console.log("file uploaded to Cloudinary");
  
          fs.unlinkSync(path);
  
          res.json(image);
        }
      );
  });
});

// PORT
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
