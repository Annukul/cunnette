import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

import userDARoutes from './routes/userDARoute.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://localhost:27017/cun", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

app.use("/user", userDARoutes);
app.use("/post", postRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged error: ${err}`);
    server.close(() => process.exit(1));
});
