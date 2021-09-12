import express from 'express';

import { addDetails } from '../actions/userDetailActions.js';

const router = express.Router();

router.post("/addDetails", addDetails);

export default router;