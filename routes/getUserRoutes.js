import express from 'express';

import { getUser, getUserBr } from '../controllers/getUserControllers.js';

const router = express.Router();

router.get("/single/:id", getUser);
router.get("/branch/:br", getUserBr);

export default router;