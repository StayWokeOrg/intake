const http = require('http')
const validateUser = require('./validate_user')
const validateCampaign = require('./validate_campaign')
const encodeUser = require('./encode_user')
const debug = require('debug')('user')

function makeRequest(userData) {
  return new Promise((resolve, reject) => {
    // options for http request
    const API_OPTIONS = {
      hostname: process.env.DATA_API,
      port: process.env.DATA_API_PORT,
      path: '/api/contacts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${process.env.DATA_API_TOKEN}`,
      },
    }

    // create the request
    const req = http.request(API_OPTIONS, (res) => {
      debug(`Status: ${res.statusCode}`)
      debug(`Headers: ${JSON.stringify(res.headers)}`)
      res.setEncoding('utf8')

      // listen for the response data
      res.on('data', (body) => {
        debug(`Body: ${body}`)
        resolve(body)
      })
    })

    // if an error occurs, reject the promise
    req.on('error', (err) => {
      debug(`problem with request: ${err.message}`)
      reject(err)
    })

    // send our data
    req.write(userData)

    // end the request
    req.end()
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
    makeRequest(userData).then(resolve, reject)
  })
}
