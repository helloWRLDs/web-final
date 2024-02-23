import express from "express"
import {connectToDb, getAddr} from "./configs/config.mjs"
import userRoutes from "./routes/userRoutes.js"

const app = express()
connectToDb()

app.set("Content-Type", "application/json")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes)

app.listen(getAddr(), () => {
    console.log(`server started on ${getAddr()}`)
})