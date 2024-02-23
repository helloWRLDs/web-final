import dotenv from 'dotenv'
import Mongoose from 'mongoose'
import logger from './logger.js'

dotenv.config({path: '../.env'})

export const getAddr = () => process.env.BACKADDR

export const connectToDb = async() => {
    try {
        await Mongoose.connect(process.env.MONGO_URL);
        logger.info('connected to mongodb')
    } catch (error) {
        logger.error(error)
        process.exit(0)
    }
}

export const getSecretKey = () => process.env.SECRET_KEY

export const getMailerOptions = () => {
    return {
        "mail": process.env.EMAIL, "password": process.env.EMAILPASS
    }
}