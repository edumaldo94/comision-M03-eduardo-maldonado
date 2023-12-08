import {Router} from 'express'
import { createPost, updatePost, deletePost, getPosts, getPostsById, getPostsByIdPost } from '../controllers/postController.js'
import { authRequired } from '../middlewares/validateToken.js';
export const routes = Router();

routes.get('/get', getPosts);
routes.get('/user/:id/posts', authRequired, getPostsById);
routes.post('/create', authRequired, createPost);
routes.put('/update/:id', authRequired, updatePost);
routes.delete('/delete/:id', authRequired, deletePost);
routes.get('/posteo/:id', authRequired, getPostsByIdPost);


export default routes;