/* eslint-disable no-console */
const express = require('express')
const path = require('path')
const logger = require('morgan')
const compression = require('compression')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const saveUser = require('./src/user/save_user')
const dotenv = require('dotenv')
const debug = require('debug')('app')

// Load environment variables from .env file
dotenv.load()

if (!process.env.PORT) {
  console.log('Please `cp example_dot_env .env` to create your .env file.')
  console.log('Or, please add a port to your .env file.')
  process.exit(1)
}

debug('test')

const app = express()

app.set('view engine', 'html')
app.set('port', process.env.PORT)
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// ngrok For Testing
const ngrok = require('ngrok')
ngrok.authtoken(process.env.NGROK_AUTHTOKEN, function(err, token) {})
ngrok.connect(function (err, url) {})

// Controllers
const smsController = require('./controllers/sms.controller')

// SMS Routes
app.route('/sms')
  .get(smsController.index)
  .post(smsController.receiveWoke)

// web app endpoints
app.post('/submit', (req, res) => {
  // form data is in req.body
  saveUser(req.body, {
    source: 'web',
  })
  .then((data) => {
    debug(data)
    // redirect to a static confirmation page
    res.redirect('/success.html')
  })
  .catch((reason) => {
    debug(reason)
    // TODO(pascal): redirect to an error message
    res.redirect('/')
  })
})

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