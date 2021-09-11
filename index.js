import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

import sample from './routes/sample.js';

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb+srv://annu_2020:annu_2020@cluster0.duywm.mongodb.net/cun?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

app.use("/new", sample);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged error: ${err}`);
    server.close(() => process.exit(1));
});
