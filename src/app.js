const tmi = require('tmi.js')
const logger = require('./logger')
const utils = require('./utilities')

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [process.env.TWITCH_CHANNEL],
})

// Connection events
client.on('connected', (address, port) => {
  console.log(`[${utils.timestamp()}]`, 'Connected to Twitch')
})

client.on('disconnected', (reason) => {
  console.log(`[${utils.timestamp()}]`, 'Disconnected from Twitch')
})

client.on('reconnect', () => {
  console.log(`[${utils.timestamp()}]`, 'Attempting to reconnect to Twitch')
})

// Raw message event
client.on('raw_message', (messageCloned, message) => {
  // Don't log raw messages if RAW is set to false
  if (process.env.RAW === 'false') return
  // Don't log PONG messages
  if (message.raw.startsWith('PONG')) return
  logger.info(message.raw)
})

// Chat message event
client.on('message', (channel, tags, message, self) => {
  // Don't log messages from self
  // There shouldn't be any self messages as an anonymous user
  if (self) return

  // Don't log formatted chat messages if RAW is not set to false
  if (process.env.RAW !== 'false') return

  let msg

  switch (tags['message-type']) {
    case 'action':
      if (process.env.CHATTY_STYLE === 'true') {
        msg = `<${utils.prefixes(tags)}${utils.name(tags)}>* ${message}`
      } else {
        msg = `* ${utils.name(tags)} ${message}`
      }
      break
    case 'chat':
      if (process.env.CHATTY_STYLE === 'true') {
        msg = `<${utils.prefixes(tags)}${utils.name(tags)}> ${message}`
      } else {
        msg = `${utils.name(tags)}: ${message}`
      }
      break
    case 'whisper':
      // Should not be getting any whispers as an anonymous user
      break
    default:
      // Do nothing
      break
  }
  logger.info(msg)
})

client.connect()
