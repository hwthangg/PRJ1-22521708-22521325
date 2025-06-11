import express from 'express'
import uploadImage from '../middlewares/uploadImage.js';
import AuthController from '../controllers/auth.controller.js';

const AuthRoutes = express.Router()

// AuthRoutes.post('/login', AuthController.login)
AuthRoutes.post('/register', AuthController.register)
AuthRoutes.get('/confirm-register', AuthController.register)
// AuthRoutes.delete('/', AuthController.logout)
// AuthRoutes.get('/', AuthController.getProfile)
// AuthRoutes.put('/',uploadImage.single('avatar'), AuthController.updateProfile)


export default AuthRoutes