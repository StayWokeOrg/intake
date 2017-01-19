const signup = require('./signup/signup')
const debug = require('debug')('sms') // eslint-disable-line

const flows = {
  signup,
}

module.exports = flows
