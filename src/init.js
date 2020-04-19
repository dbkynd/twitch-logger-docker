console.log('Starting Twitch Logger...')

// Ensure we have a Twitch Channel to connect to
if (!process.env.TWITCH_CHANNEL) {
  console.error('Missing "TWITCH_CHANNEL" environment variable. Exiting...')
  process.exit()
}
process.env.TWITCH_CHANNEL = process.env.TWITCH_CHANNEL.toLowerCase()

// Set default TZ as UTC if not otherwise set
if (!process.env.TZ) {
  process.env.TZ = 'UTC'
}

// Set default DATE_PATTERN to monthly if not otherwise set
if (!process.env.DATE_PATTERN) {
  process.env.DATE_PATTERN = 'YYYY-MM'
}

// If DATE_PATTERN is set to the string 'null' delete the DATE_PATTERN ENV variable
// This is for singular files with no rotation
if (process.env.DATE_PATTERN === 'null') {
  delete process.env.DATE_PATTERN
}

// Ensure RAW is true/false
if (process.env.RAW) {
  if (process.env.RAW !== 'true' && process.env.RAW !== 'false') {
    console.error(
      '"RAW" environment variable should be a Boolean value. Exiting...'
    )
    process.exit()
  }
} else {
  // Set default
  process.env.RAW = 'true'
}

// Ensure ZIP is true/false
if (process.env.ZIP) {
  if (process.env.ZIP !== 'true' && process.env.ZIP !== 'false') {
    console.error(
      '"ZIP" environment variable should be a Boolean value. Exiting...'
    )
    process.exit()
  }
} else {
  // Set default
  process.env.ZIP = 'true'
}

// Ensure CHATTY_STYLE is true/false
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
} else {
  // Set default
  process.env.CHATTY_STYLE = 'false'
}

console.log(`Twitch Channel: '${process.env.TWITCH_CHANNEL}'`)
console.log(`Timezone: '${process.env.TZ}'`)
console.log(
  `Timestamp Format String: ${
    process.env.TS_FORMAT ? `'${process.env.TS_FORMAT}'` : '(Default)'
  }`
)
console.log(
  `Filename Date Pattern: '${
    process.env.DATE_PATTERN
      ? `'${process.env.DATE_PATTERN}'`
      : `'null' (Singular File)`
  }'`
)
console.log(`Logging RAW IRC: ${process.env.RAW}`)
console.log(`Zipping Old Logs: ${process.env.ZIP}`)
console.log(`Using Chatty Styling: ${process.env.CHATTY_STYLE}`)

if (process.env.RAW === 'true' && process.env.CHATTY_STYLE === 'true') {
  console.warn(
    'WARNING: Chatty Styling is not available when logging the RAW IRC messages.'
  )
}

require('./app')
