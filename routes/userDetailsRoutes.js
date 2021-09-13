import express from "express";

import { addDetails } from "../controllers/userDetailsControllers.js";

const router = express.Router();

router.post("/addDetails", addDetails);

export default router;
