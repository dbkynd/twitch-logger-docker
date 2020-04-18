const tmi = require('tmi.js')
const logger = require('./logger')

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [process.env.TWITCH_CHANNEL],
})

client.on('connected', (address, port) => {
  console.log('Connected to Twitch')
})

client.on('disconnected', (reason) => {
  console.log('Disconnected from Twitch')
})

client.on('reconnect', () => {
  console.log('Attempting to reconnect to Twitch')
})

client.on('raw_message', (messageCloned, message) => {
  logger.info(message.raw)
})

client.connect()
