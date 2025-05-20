import express from 'express'
import { AuthController } from '../controllers/index.js'


const AuthRoutes = express.Router()

AuthRoutes.post('/login', AuthController.login)
AuthRoutes.post('/register', AuthController.register)
AuthRoutes.delete('/logout', AuthController.logout)
AuthRoutes.get('/', AuthController.getProfile)
AuthRoutes.put('/', AuthController.updateProfile)


export default AuthRoutes