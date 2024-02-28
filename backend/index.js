import express from "express"
import cors from 'cors'

import {connectToDb, getAddr} from "./configs/config.mjs"
import userRouter from "./routes/userRouter.js"
import logger from "./configs/logger.js"
import logRequest from "./middleware/logRequest.js"
import secureHeaders from "./middleware/secureHeaders.js"
import portfolioRouter from "./routes/portfolioRouter.js"

const app = express()
connectToDb()

app.set("Content-Type", "application/json")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/users', secureHeaders, logRequest, userRouter)
app.use('/portfolios', secureHeaders, logRequest, portfolioRouter)

app.listen(getAddr(), () => {
    logger.info(`server started on http://localhost:${getAddr()}`)
})