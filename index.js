/* eslint-disable no-console */

// Load environment variables from .env file
const dotenv = require('dotenv')

dotenv.load()

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const logger = require('morgan')
const compression = require('compression')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const saveUser = require('./src/user/save_user')
const debug = require('debug')('app')

if (!process.env.PORT) {
  debug('Please `cp example_dot_env .env` to create your .env file.')
  debug('Or, please add a port to your .env file.')
  process.exit(1)
}

debug('test')

const app = express()

app.set('view engine', 'html')
app.set('port', process.env.PORT)
app.use(helmet())
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(methodOverride('_method'))
app.use(express.static(path.resolve(__dirname, 'public')))

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

app.post('/submit', function (req, res) {
  name = req.body.name;
  phone = req.body.phone_number;
  smsController.welcomeMessage(name, phone);
});

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`)
})

module.exports = app
