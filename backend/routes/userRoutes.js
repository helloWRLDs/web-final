import express from 'express'
import { registerUser} from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/signup', registerUser)

export default userRoutes;