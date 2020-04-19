const winston = require('winston')
require('winston-daily-rotate-file')
const utils = require('./utilities')

const myFormat = winston.format.printf((info) => {
  const message = `[${info.timestamp}] ${info.message}`
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(message)
  }
  return message
})

let logger = []

process.env.TWITCH_CHANNELS.split(',').forEach((chan) => {
  // If a DATE_PATTERN is used do file rotation
  if (process.env.DATE_PATTERN) {
    const options = {
      dirname: `./logs/${chan}`,
      filename: `${chan}-%DATE%.log`,
      datePattern: process.env.DATE_PATTERN,
      zippedArchive: true,
      auditFile: 'audit.json',
      utc: true,
    }

    // Set utc filename formatting to false if the TZ is not UTC
    // Does NOT effect the timestamps of the message, only the rotating file format
    if (process.env.TZ !== 'UTC') options.utc = false

    // Set zippedArchive to false if ZIP ENV is set to false
    if (process.env.ZIP === 'false') options.zippedArchive = false
    const rotateTransport = new winston.transports.DailyRotateFile(options)

    logger[chan] = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: utils.timestamp() }),
        myFormat
      ),
      transports: [rotateTransport],
    })
  } else {
    // Otherwise log all messages to a singular file
    logger[chan] = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: utils.timestamp() }),
        myFormat
      ),
      transports: [
        new winston.transports.File({
          filename: `./logs/${chan}/${chan}.log`,
        }),
      ],
    })
  }
})

module.exports = logger
