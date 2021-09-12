import express from 'express';

import { newPost } from '../actions/postActions.js';

const router = express.Router();

router.post("/new", newPost);

export default router;