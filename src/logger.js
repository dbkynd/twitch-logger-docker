const winston = require('winston')
require('winston-daily-rotate-file')
const utils = require('./utilities')

const myFormat = winston.format.printf((info) => {
  const message = `[${info.timestamp}] ${info.message}`
  // Log to console in development to check formatting
  if (process.env.NODE_ENV === 'development') {
    console.log(message)
  }
  return message
})

const options = {
  dirname: './logs',
  filename: `${process.env.TWITCH_CHANNEL}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  auditFile: './audit.json',
  utc: true,
}

// Set utc filename formatting to false if UTC ENV is set to false
// Does NOT effect the timestamps of the message, only the rotating file format
if (process.env.UTC === 'false') options.utc = false

// Set zippedArchive to false if ZIP ENV is set to false
if (process.env.ZIP === 'false') options.zippedArchive = false

const transport = new winston.transports.DailyRotateFile(options)

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: utils.timestamp() }),
    myFormat
  ),
  transports: [transport],
})

module.exports = logger
