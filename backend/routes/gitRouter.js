import express from 'express'
import { getRepositoryByUserName, getUserByEmail } from '../controllers/gitController.js';
import { authenticate, authenticateAdmin } from '../middleware/authenticate.js';

const gitRouter = express.Router()

gitRouter.get('/:email', authenticate, getUserByEmail)
gitRouter.get('/:userName/repository', authenticate, getRepositoryByUserName)

export default gitRouter;