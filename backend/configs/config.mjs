import dotenv from 'dotenv'
import Mongoose from 'mongoose'

dotenv.config({path: '../.env'})

export const getAddr = () => process.env.ADDR

export const connectToDb = async() => {
    try {
        await Mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongodb")
    } catch (error) {
        console.error(`ERROR: ${error.message}`)
        process.exit(0)
    }
}

export const getSecretKey = () => process.env.SECRET_KEY