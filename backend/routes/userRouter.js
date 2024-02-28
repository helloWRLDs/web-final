import express from 'express'
import { registerUser, loginUser, getUserById, getUsers, deleteUserById, putUserById} from '../controllers/userController.js'
import { authenticate, authenticateAdmin } from '../middleware/authenticate.js'

const userRouter = express.Router()

userRouter.post('/signup', registerUser)
userRouter.post('/login', loginUser,)

userRouter.get('/', authenticate, getUsers)
userRouter.get('/:id', authenticate, getUserById)
userRouter.put('/:id', authenticate, putUserById)

userRouter.delete('/:id', authenticate, authenticateAdmin, deleteUserById)

export default userRouter;