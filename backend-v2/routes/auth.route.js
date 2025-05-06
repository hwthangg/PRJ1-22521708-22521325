import express from 'express'
import AuthController from '../controllers/auth.controller.js'


const AuthRoutes = express.Router()

AuthRoutes.post('/login', AuthController.login)
AuthRoutes.get('/logout', AuthController.logout)
AuthRoutes.post('/register', AuthController.register)
AuthRoutes.get('/me', AuthController.getOwnedChapter)

export default AuthRoutes