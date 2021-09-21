import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userDARoutes from "./routes/userDetailsRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from './routes/imageRoutes.js';
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

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
app.use("/user", userDARoutes);
app.use("/post", postRoutes);
app.use("/upload", imageRoutes);
app.use("/comment", commentRoutes);

// PORT
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
