const signup = require('./signup/signup')
// const schedule = require('./schedule/schedule')
const unknown = require('./unknown/unknown')
const debug = require('debug')('sms') // eslint-disable-line

const flows = {
  'ready': signup,
  // 'schedule': schedule,
  'unknown': unknown,
}

module.exports = flows
