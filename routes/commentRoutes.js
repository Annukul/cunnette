import express from 'express';

const router = express.Router();

import { addComment, getComments, editComment, deleteComment } from '../controllers/commentControllers.js';

router.post("/new/add", addComment);
router.get("/single/:id", getComments);
router.put("/edit/:id", editComment);
router.delete("/delete/:id", deleteComment);

export default router;