const request = require('request')
const validateUser = require('./validate_user')
const validateCampaign = require('./validate_campaign')
const encodeUser = require('./encode_user')
const debug = require('debug')('user') // eslint-disable-line

function makeCentralRequest(userData) {
  return new Promise((resolve, reject) => {
    // request url
    const { DATA_API, DATA_API_PORT } = process.env
    const url = `${DATA_API}:${DATA_API_PORT}/api/contacts`

    // request options
    const options = {
      url,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${process.env.DATA_API_TOKEN}`,
      },
      json: true,
      body: userData,
    }

    // create the request
    request(options, (err, res, body) => {
      if (err) {
        debug(err)
        reject(err)
        return
      }

      debug(body)
      resolve(body)
    })
  })
}

module.exports = function saveUser({ user, source }) {
  return new Promise((resolve, reject) => {
    // validate user data
    const invalid = validateUser(user)
    if (invalid) return reject(invalid)

    // validate campaign
    const campaign = validateCampaign(user.campaign)
    if (!campaign) return reject('user must have a campaign')

    // validate source
    if (!source) return reject('user must have a source')

    // encode data
    const userData = encodeUser({
      user,
      campaign,
      source,
    })

    // make request
    makeCentralRequest(userData)
    .then(resolve, reject)
  })
}
