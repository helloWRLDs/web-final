import express from "express"
import cors from 'cors'

import {connectToDb, getAddr} from "./configs/config.mjs"
import userRouter from "./routes/userRouter.js"
import logger from "./configs/logger.js"
import logRequest from "./middleware/logRequest.js"
import secureHeaders from "./middleware/secureHeaders.js"
import gitRouter from "./routes/gitRouter.js"

const app = express()
connectToDb()

app.set("Content-Type", "application/json")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/users', secureHeaders, logRequest, userRouter)
app.use('/git', secureHeaders, logRequest, gitRouter)

app.listen(getAddr(), () => {
    logger.info(`server started on http://localhost:${getAddr()}`)
})