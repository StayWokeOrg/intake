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
const debug = require('debug')('app') // eslint-disable-line
const favicon = require('serve-favicon')
const enforce = require('express-sslify')
const cookieSession = require('cookie-session')

if (!process.env.PORT) {
  console.log('Please `cp example_dot_env .env` to create your .env file.')
  console.log('Or, please add a port to your .env file.')
  process.exit(1)
}

const app = express()

app.set('view engine', 'html')
app.set('port', process.env.PORT)

// production middleware
if (app.get('env') === 'production') {
  // redirect http requests to https
  // use trustProtoHeader: true when behind load balancer/reverse proxy
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
  app.set('trust proxy', 1)

  // production error handler
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.use(helmet())
app.use(cookieSession({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    overwrite: true
}))
app.use(compression())
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(methodOverride('_method'))
app.use(favicon(path.join(__dirname, './public/img/favicon.ico')))
app.use(express.static(path.join(__dirname, './public')))

// Controllers
const sms = require('./controller/sms/sms')
const web = require('./controller/web')

// SMS route
app.post('/sms', sms.dispatcher)

// web app routes
app.post('/submit', web.submit)

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`)
})

module.exports = app
