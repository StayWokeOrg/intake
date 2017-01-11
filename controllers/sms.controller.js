'use strict'

// SMS controller using Twilio API
// var client = require('twilio')
//require the Twilio module and create a REST client
var client = require('twilio')(process.env.TWILIO_API_SID, process.env.TWILIO_API_TOKEN)

exports.index = function(req, res) {
  console.log('hello')
}

exports.receiveWoke = function(req, res) {
  res.header('Content-Type', 'text/xml')
  var body = req.param('Body').trim()

  // the voter, use this to keep people from voting more than once
  var from = req.param('From')
  client.sendMessage({
    to: from,
    from: process.env.TWILIO_API_NUMBER,
    body: 'Welcome to the resistance.'
  }, function(error, message) {
    // If no errors
    if (!error) {
      console.log('Success! The SID for this SMS message is:')
      console.log(message.sid)
      console.log('Message sent on:')
      console.log(message.dateCreated)
      return 'welcome'
    } else {
      // ERRORS!!!!
      console.error('Oops! There was an error.')
      console.error(error)
    }
  })
}

//Send an text message
exports.welcomeMessage = function(name, phone) {
  client.sendMessage({
  	to: phone,
  	from: process.env.TWILIO_API_NUMBER,
  	body: 'Welcome ' + name +'. Join the resistance.'
  }, function(error, message) {
    // If no errors
    if (!error) {
        console.log('Success! The SID for this SMS message is:')
        console.log(message.sid)
        console.log('Message sent on:')
        console.log(message.dateCreated)
        return 'welcome'
    } else {
    	// ERRORS!!!!
        console.error('Oops! There was an error.')
        console.error(error)
    }
  })
}