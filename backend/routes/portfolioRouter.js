import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { deleteProjectByUser, getPortfolioByUser, putProjectByUser } from '../controllers/portfolioController.js'

const portfolioRouter = express.Router()

portfolioRouter.get('/:id', authenticate, getPortfolioByUser)
portfolioRouter.put('/:id', authenticate, putProjectByUser)
portfolioRouter.put('/:id/:name', authenticate, deleteProjectByUser)

export default portfolioRouter