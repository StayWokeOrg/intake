'use strict';

// SMS controller using Twilio API
// var client = require('twilio');
//require the Twilio module and create a REST client
var client = require('twilio')(process.env.TWILIO_API_SID, process.env.TWILIO_API_TOKEN);

//Send an text message

exports.welcomeMessage = function(name, phone) {
  client.sendMessage({
  	to: phone,
  	from: process.env.TWILIO_API_NUMBER,
  	body: 'Welcome ' + name +'. Join the resistance.'
  }, function(error, message) {
    // If no errors
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
        return 'welcome';
    } else {
    	// ERRORS!!!!
        console.error('Oops! There was an error.');
        console.error(error);
    }
  })
}