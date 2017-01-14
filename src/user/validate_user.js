const debug = require('debug')('user') // eslint-disable-line

/**
 * validateUser - validate the contents of a user object before saving
 *
 * @param  {object} user data from web form or sms endpoint
 * @return {string|undefined}
 *    returns an error string if the user is invalid
 *    returns undefined if user is valid
 */
module.exports = function validateUser(user) {
  if (!user) return 'user must exist'

  if (!user.name) return 'user must have a name'
  if (!user.zip) return 'user must have a zip code'
  if (!user.email && !user.phone) return 'user must have an email or a phone'

  return undefined
}
