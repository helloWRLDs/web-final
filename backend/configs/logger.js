import pino from 'pino';
import PinoPretty from 'pino-pretty';

// Create a Pino logger instance with desired configuration
const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:hh:MM:ss'
      }
    }
  })

export default logger;