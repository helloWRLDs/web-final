import dotenv from 'dotenv'
import Mongoose from 'mongoose'

dotenv.config({path: '../.env'})

export const getAddr = () => {
    const addr = process.env.ADDR
    return addr
}

export const connectToDb = async() => {
    try {
        await Mongoose.createConnection(process.env.MONGO_URL);
        console.log("connected to mongodb")
    } catch (error) {
        console.error(`ERROR: ${error.message}`)
        process.exit(0)
    }
}