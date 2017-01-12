# StayWoke intake application

The goal: to capture the contact information for as many people who are attending a protest as possible, for the purpose of getting them to be more connected and involved in future actions.

## Getting started

- `cp example_dot_env .env`
- Open `.env` in your editor. You may need to fill in some values for your dev. See comments in that file.
- `npm install`
- `npm start`
- `open http://localhost:3030`

## To test SMS

### Set up ngrok
`ngrok` is software that allows you to expose your local dev server to the world using a dynamic domain name, e.g. http://2ce2f5a6.ngrok.io
- [Sign up for ngrok](https://ngrok.com/).
- [Install ngrok](https://ngrok.com/download). If you use [homebrew](http://brew.sh) on a Mac, you can do `brew cask install ngrok`.
- Install your ngrok authtoken. The command for this can be found on your [ngrok dashboard](https://dashboard.ngrok.com/get-started).
- In a new shell, start ngrok with `ngrok http 3030`. (Make sure your express server is already running.)
- Copy your ngrok hostname; you'll need it to configure Twilio.

### Set up Twilio
Twilio is the API server that routes SMS messages to this app.
- [Sign up for a Twilio trial account](https://www.twilio.com). You can use this account indefinitely, but you'll only be able to interact with your own phone number.
- [Buy a phone number](https://www.twilio.com/console/phone-numbers/search). I think the lowest price is $1/month. (Oddly, they didn't ask me for any payment info yet.)
- Configure your phone number in Twilio. In the messaging section, set a webhook for when a message comes in, routing to `http://yourngrokurl.ngrok.io/sms`. You'll need to reset this with a new URL each time you start ngrok.

## Read more

See the [purpose document](docs/purpose.md) to learn about what we're aiming to accomplish.
