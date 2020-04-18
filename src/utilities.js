const moment = require('moment')

module.exports = {
  timestamp() {
    if (process.env.FORMAT) {
      if (process.env.UTC === 'false') {
        return moment().format(process.env.FORMAT)
      } else {
        return moment.utc().format(process.env.FORMAT)
      }
    } else {
      if (process.env.UTC === 'false') {
        return moment().format('YYYY-MM-DDThh:mm:ss.SSS')
      } else {
        return new Date().toISOString()
      }
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
