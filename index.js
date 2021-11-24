import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";

import connectDatabase from "./config/database.js";
import userDetailsRoutes from "./routes/userDetailsRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import imageRoutes from './routes/imageRoutes.js';
import commentRoutes from "./routes/commentRoutes.js";
import getUserRoutes from "./routes/getUserRoutes.js";
import errorMiddleware from "./middlewares/errors.js";
// import { uploadImage } from "./controllers/imageController.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(cookieParser());

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down due to uncaught exception`);
  process.exit(1);
});

// CONNECT TO DATABASE
connectDatabase();

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
app.use("/getuser", getUserRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
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

        fs.unlink(path, (err) => {
          if (err) throw err;
        });

        res.json(image);
      }
    );
  });
});

// Middleware to handle error
app.use(errorMiddleware);

// PORT
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`)
);

// Handle Unhandled Promise rejcetion
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => process.exit(1));
});
