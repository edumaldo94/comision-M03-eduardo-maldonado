import {Router} from 'express'
import { register, login, logout, profile, verifyToken, perfilComent, updateUserProfile } from '../controllers/authController.js'
import { authRequired } from '../middlewares/validateToken.js';
import { validateRegister, validateLogin, handleErrorValidations } from '../middlewares/authMiddleware.js';
export const routes = Router();

//rutas para registro de usuario

routes.post('/register', validateRegister, handleErrorValidations, register)

//rutas para el login

routes.post('/login', validateLogin, handleErrorValidations, login)

//rutas para el logout
routes.post('/logout', logout)

routes.get('/verifyToken', verifyToken)

routes.get('/profile', authRequired, profile)

routes.get('/profileComent/:userId', perfilComent)

routes.put('/user/:userId', authRequired, updateUserProfile);

export default routes;