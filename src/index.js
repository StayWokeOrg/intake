/* eslint-disable no-console */
const dotenv = require('dotenv')

// Load environment variables from .env file
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

// we'd only want this in dev, so need to conditionalize this
// ngrok For Testing
// const ngrok = require('ngrok')
// ngrok.authtoken(process.env.NGROK_AUTHTOKEN, (err, token) => {})
// ngrok.connect((err, url) => {})

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

module.exports = app
