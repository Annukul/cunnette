import express from "express";

import { addDetails } from "../controllers/userDetailControllers.js";

const router = express.Router();

router.post("/addDetails", addDetails);

export default router;
