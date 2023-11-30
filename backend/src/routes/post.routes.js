import {Router} from 'express'
import { createPost, updatePost, deletePost, getPosts, getPostsById } from '../controllers/postController.js'
import { authRequired } from '../middlewares/validateToken.js';
export const routes = Router();

routes.get('/get', authRequired, getPosts);
routes.get('/get/:id', authRequired, getPostsById);
routes.post('/create', authRequired, createPost);
routes.put('/update/:id', authRequired, updatePost);
routes.delete('/delete/:id', authRequired, deletePost);



export default routes;