console.log('Starting Twitch Logger...')

// Ensure we have a Twitch Channel to connect to
if (!process.env.TWITCH_CHANNELS) {
  console.error('Missing "TWITCH_CHANNELS" environment variable. Exiting...')
  process.exit()
}
// Ensure channels are lowercase and prepended with a '#'
const channels = process.env.TWITCH_CHANNELS.split(',')
for (let i = 0; i < channels.length; i++) {
  channels[i] = `#${channels[i].toLowerCase().trim().replace('#', '')}`
}
process.env.TWITCH_CHANNELS = channels

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

// Ensure LOGSTASH is true/false
if (process.env.LOGSTASH) {
  if (process.env.LOGSTASH !== 'true' && process.env.LOGSTASH !== 'false') {
    console.error(
      '"LOGSTASH" environment variable should be a Boolean value. Exiting...'
    )
    process.exit()
  }
} else {
  // Set default
  process.env.LOGSTASH = 'false'
}

console.log(`Twitch Channels: '${process.env.TWITCH_CHANNELS}'`)
console.log(`Timezone: '${process.env.TZ}'`)
console.log(
  `Timestamp Format String: ${
    process.env.TS_FORMAT ? `'${process.env.TS_FORMAT}'` : '(Default)'
  }`
)
console.log(
  `Filename Date Pattern: ${
    process.env.DATE_PATTERN
      ? `'${process.env.DATE_PATTERN}'`
      : `'null' (Singular File)`
  }`
)
console.log(`Logging RAW IRC: ${process.env.RAW}`)
console.log(`Zipping Old Logs: ${process.env.ZIP}`)
console.log(`Using Chatty Styling: ${process.env.CHATTY_STYLE}`)
console.log(`Using Logstash Formatting: ${process.env.LOGSTASH}`)

if (process.env.RAW === 'true' && process.env.CHATTY_STYLE === 'true') {
  console.warn(
    'WARNING: Chatty Styling is not available when logging the RAW IRC messages.'
  )
}

require('./app')
