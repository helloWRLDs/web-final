import express from 'express'
import { registerUser, loginUser, getUserById} from '../controllers/userController.js'
import notify from '../services/notifier.js'
import { authenticate } from '../middleware/authenticate.js'

const userRouter = express.Router()

userRouter.post('/signup', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/:id', authenticate, getUserById)

export default userRouter;