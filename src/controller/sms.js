const twilio = require('twilio')(process.env.TWILIO_API_SID, process.env.TWILIO_API_TOKEN)
const debug = require('debug')('sms')

function dispatcher(req, res) {

}


function receiveWoke(req, res) {
  res.header('Content-Type', 'text/xml')
  const body = req.param('Body').trim()
  debug('body', body)

  // the voter, use this to keep people from voting more than once
  const from = req.param('From')
  twilio.sendMessage({
    to: from,
    from: process.env.TWILIO_API_NUMBER,
    body: 'Welcome to the resistance.',
  }, (error, message) => {
    if (error) {
      debug(error)
      return
    }

    debug('Success! The SID for this SMS message is:')
    debug(message.sid)
    debug('Message sent on:')
    debug(message.dateCreated)
    return 'welcome'
  })
}

// Send an text message
function welcomeMessage(name, phone) {
  twilio.sendMessage({
    to: phone,
    from: process.env.TWILIO_API_NUMBER,
    body: `Welcome ${name}. Join the resistance.`,
  }, (error, message) => {
    // If no errors
    if (error) {
      debug(error)
      return
    }

    debug('Success! The SID for this SMS message is:')
    debug(message.sid)
    debug('Message sent on:')
    debug(message.dateCreated)
    return 'welcome'
  })
}

module.exports = {
  receiveWoke,
  welcomeMessage,
  dispatcher,
}
