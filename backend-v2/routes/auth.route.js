import express from 'express'
import { AuthController } from '../controllers/index.js'
import uploadImage from '../middlewares/uploadImage.js';

const AuthRoutes = express.Router()

AuthRoutes.post('/login', AuthController.login)
AuthRoutes.post('/register',uploadImage.single('avatar'), AuthController.register)
AuthRoutes.delete('/logout', AuthController.logout)
AuthRoutes.get('/', AuthController.getProfile)
AuthRoutes.put('/',uploadImage.single('avatar'), AuthController.updateProfile)


export default AuthRoutes