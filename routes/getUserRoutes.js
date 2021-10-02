import express from 'express';

import { getUser, getUserBr } from '../controllers/getUserControllers.js';

const router = express.Router();

router.get("/:id", getUser);
router.get("/:br", getUserBr);

export default router;