/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();

if (!process.env.PORT) {
  console.log('Please `cp example_dot_env .env` to create your .env file.');
  console.log('Or, please add a port to your .env file.');
  process.exit(1);
}

const app = express();

app.set('view engine', 'html');
app.set('port', process.env.PORT);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// ngrok For Testing
var ngrok = require('ngrok');
ngrok.authtoken(process.env.NGROK_AUTHTOKEN, function(err, token) {});
ngrok.connect(function (err, url) {});

// Controllers
var smsController = require('./controllers/sms.controller');

// SMS Routes
app.route('/sms')
  .get(smsController.index)
  .post(smsController.receiveWoke);

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
