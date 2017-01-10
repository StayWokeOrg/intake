'use strict';

// SMS controller using Twilio API
var client = require('twilio');
var request =  require('request');

exports.welcomeMessage = function(req, res) {
  client.sendMessage({
  	to: phone,
  	from: TWILIO_API_NUMBER,
  	message: 'Welcome' + name +'. Join the resistance.'
  }, function(error, message) {
    // If no errors
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
    	// ERRORS!!!!
        console.log('Oops! There was an error.');
    }
  })
}