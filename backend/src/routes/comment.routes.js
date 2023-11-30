import express from 'express';
const router = express.Router();
import * as commentController from '../controllers/commentController.js';

router.post('/create', commentController.createComment);
router.delete('/:id', commentController.deleteComment);
router.get('/', commentController.getComments);

export default router;
