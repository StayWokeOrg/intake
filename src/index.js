/* eslint-disable no-console */
const dotenv = require('dotenv')

// Load environment variables from .env file
// need to do this before initializing other modules (e.g. debug)
dotenv.load()

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const logger = require('morgan')
const compression = require('compression')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const session = require('express-session')
const debug = require('debug')('app') // eslint-disable-line

if (!process.env.PORT) {
  console.log('Please `cp example_dot_env .env` to create your .env file.')
  console.log('Or, please add a port to your .env file.')
  process.exit(1)
}

const app = express()

app.set('view engine', 'html')
app.set('port', process.env.PORT)
app.use(helmet())
app.use(compression())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, './public')))

// Controllers
const sms = require('./controller/sms/sms')
const web = require('./controller/web')

// SMS route
app.post('/sms', sms.dispatcher)

// web app routes
app.post('/submit', web.submit)

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`)
})


// if ngrok auth token is defined, setup ngrok
if (process.env.NGROK_AUTHTOKEN) {
  // eslint-disable-next-line global-require
  const ngrok = require('ngrok')
  ngrok.authtoken(process.env.NGROK_AUTHTOKEN, (err, token) => {
    if (err) debug(err)
  })
  ngrok.connect(app.get('port'), (err, url) => {
    if (err) debug(err)
    console.log('ngrok URL', url)
  })
}

// ^ TODO(pascal): this doesn't work so well when running with nodemon; it tries
// to restart ngrok on every change. I find it preferable to run ngrok manually
// in a separate shell so the URL is persistent and I don't have to keep
// reconfiguring twilio.

module.exports = app
