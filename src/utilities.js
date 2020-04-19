const moment = require('moment-timezone')

module.exports = {
  timestamp() {
    const time = moment.tz(process.env.TZ).format(process.env.TS_FORMAT)
    // Don't use brackets if using logstash formatting
    if (process.env.LOGSTASH === 'true') {
      return time
    } else {
      return `[${time}]`
    }
  },

  prefixes(userstate) {
    const staff = userstate.badges.staff || userstate.badges.admin ? '&' : ''
    const globalMod = userstate.badges.global_mod ? '*' : ''
    const broadcaster = userstate.badges.broadcaster ? '~' : ''
    const moderator = userstate.badges.moderator ? '@' : ''
    const vip = userstate.badges.vip ? '!' : ''
    const subscriber = userstate.badges.subscriber ? '%' : ''
    const prime = userstate.badges.premium ? '+' : ''

    return `${staff}${globalMod}${broadcaster}${moderator}${vip}${subscriber}${prime}`
  },

  name(userstate) {
    return userstate['display-name'] || userstate.username
  },
}
