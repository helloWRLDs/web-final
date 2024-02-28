import logger from "../configs/logger.js";

const serverErrorHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
        logger.error(error)
        res.status(500).json({ message: error.message })
    })
}

export default serverErrorHandler;