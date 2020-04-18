const winston = require('winston')
require('winston-daily-rotate-file')

const myFormat = winston.format.printf((info) => {
  return `${info.timestamp} ${info.message}`
})

const options = {
  dirname: './logs',
  filename: `${process.env.TWITCH_CHANNEL}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  auditFile: './audit.json',
  utc: true,
}

if (process.env.UTC === false) options.utc = false

const transport = new winston.transports.DailyRotateFile(options)

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), myFormat),
  transports: [transport],
})

module.exports = logger
