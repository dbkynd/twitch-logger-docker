if (!process.env.TWITCH_CHANNEL) {
  console.error('Missing "TWITCH_CHANNEL" environment variable. Exiting...')
  process.exit()
}

require('./app')
