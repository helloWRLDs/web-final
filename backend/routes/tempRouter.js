import express from 'express'
import { getTempData } from '../controllers/tempController.js'
import { authenticate, authenticateAdmin } from '../middleware/authenticate.js'

const tempRouter = express.Router()

tempRouter.get('/', authenticate, authenticateAdmin , getTempData)

export default tempRouter