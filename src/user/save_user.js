const http = require('http')
const debug = require('debug')('user save')

module.exports = function saveUser(user, { source }) {
  return new Promise((resolve, reject) => {
    if (!user.name) return reject('user must have a name')
    if (!user.campaign) return reject('user must have a campaign')
    if (!user.email_address && !user.phone_number) return reject('user must have an email_address or a phone_number')
    if (!source) return reject('user must have a source')

    const data = {
      name: user.name,
      email: user.email_address,
      phone: user.phone_number,
      campaign: user.campaign,
      source,
    }

    const encodedData = (
      Object.keys(data)
      .map(key => `${key}=${data[key]}`)
      .join('&')
    )

    const API_OPTIONS = {
      hostname: process.env.DATA_API,
      port: process.env.DATA_API_PORT,
      path: '/api/contacts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }

    const req = http.request(API_OPTIONS, (res) => {
      debug(`Status: ${res.statusCode}`)
      debug(`Headers: ${JSON.stringify(res.headers)}`)
      res.setEncoding('utf8')
      res.on('data', (body) => {
        debug(`Body: ${body}`)
        resolve(body)
      })
    })
    req.on('error', (err) => {
      debug(`problem with request: ${err.message}`)
    })

    req.write(encodedData)
    req.end()

    return null
  })
}
