import express from 'express'
import { registerUser, loginUser} from '../controllers/userController.js'
import notify from '../services/notifier.js'

const userRouter = express.Router()

userRouter.post('/signup', registerUser)
userRouter.post('/login', loginUser)

export default userRouter;