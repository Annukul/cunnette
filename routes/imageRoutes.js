import express from "express";
const router = express.Router();

import { uploadImage } from '../controllers/imageController.js';

router.post("/", uploadImage);

export default router;