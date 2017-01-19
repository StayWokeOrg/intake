const debug = require('debug')('user') // eslint-disable-line

/**
 * encodeUser - encode user data before saving
 *
 * @param  {object} user user object
 * @param  {string} campaign
 * @param  {string} source web/sms
 * @return {Promise}
 */
module.exports = function encodeUser({ user, campaign, source }) {
  // build data object for POST to central
  const data = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    zip: user.zip,
    topics: user.topcis,
    campaign,
    source,
  }

  // remove null/undefined/empty string
  Object.keys(data).forEach((key) => {
    if (!data[key]) delete data[key]
  })

  return data
}
