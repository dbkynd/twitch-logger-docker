if (!process.env.TWITCH_CHANNEL) {
  console.error('Missing "TWITCH_CHANNEL" environment variable. Exiting...')
  process.exit()
}

if (process.env.UTC) {
  if (process.env.UTC !== 'true' && process.env.UTC !== 'false') {
    console.error(
      '"UTC" environment variable should be a Boolean value. Exiting...'
    )
    process.exit()
  }
}

if (process.env.RAW) {
  if (process.env.RAW !== 'true' && process.env.RAW !== 'false') {
    console.error(
      '"RAW" environment variable should be a Boolean value. Exiting...'
    )
    process.exit()
  }
}

if (process.env.ZIP) {
  if (process.env.ZIP !== 'true' && process.env.ZIP !== 'false') {
    console.error(
      '"ZIP" environment variable should be a Boolean value. Exiting...'
    )
    process.exit()
  }
}

if (process.env.CHATTY_STYLE) {
  if (
    process.env.CHATTY_STYLE !== 'true' &&
    process.env.CHATTY_STYLE !== 'false'
  ) {
    console.error(
      '"CHATTY_STYLE" environment variable should be a Boolean value. Exiting...'
    )
    process.exit()
  }
}

require('./app')
