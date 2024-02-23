import logger from "../configs/logger.js"

const logRequest = async(req, res, next) => {
    logger.info(`received request: method=${req.method} uri=${req.originalUrl}`)
    next()
}

export default logRequest