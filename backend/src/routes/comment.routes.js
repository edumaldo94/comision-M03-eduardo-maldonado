//backend/src/routes/comment.routes.js

import {Router} from 'express'
import { createComment, deleteComment, getComments } from '../controllers/commentController.js'
import { authRequired } from '../middlewares/validateToken.js';
export const routes = Router();

routes.post('/posts/:postId/comments', authRequired, createComment);
routes.delete('/deleteComment/:id', authRequired, deleteComment);
routes.get('/posts/:postId/comments', authRequired, getComments);

export default routes;
