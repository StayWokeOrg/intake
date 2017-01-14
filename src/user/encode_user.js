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
    campaign,
    source,
  }

  // remove null/undefined/empty string
  Object.keys(data).forEach((key) => {
    if (!data[key]) delete data[key]
  })

  // convert data to a query-encoded string key1=val1&key2=val2
  const encodedData = (
    Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
  )

  return encodedData
}
