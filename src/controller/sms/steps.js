/* eslint-disable no-param-reassign */
const message = require('./message')
const saveUser = require('../../user/save_user')
const debug = require('debug')('sms')

// list of steps for the SMS flow. each step is an object with a before handler,
// or an after handler, or both. see dispatcher for more info.
const steps = {
  'keyword': {
    after(req, res) {
      req.session.user.phone = req.body.From
      req.session.user.keyword = req.body.Body
      debug(req.session.user)
    },
  },
  'name': {
    before(req, res) {
      res.send(message('✊🏾 Thank you for joining! 😀 What’s your name?'))
    },
    after(req, res) {
      // trim the name and collapse multiple spaces
      req.session.user.name = req.body.Body.trim().replace(/ +/g, ' ')
      debug(req.session.user)
    },
  },
  'zip': {
    before(req, res) {
      // if they gave us a name, use it in the greeting
      const firstName = req.session.user.name.split(' ')[0]
      const greeting = (
        firstName
        ? `Hi ${firstName}! 😀 `
        : ''
      )
      res.send(message(`${greeting}To connect with events in your area, enter your zip code.`))
    },
    after(req, res) {
      req.session.user.zip = req.body.Body
      debug(req.session.user)
    },
  },
  'goodbye': {
    before(req, res) {
      const user = {
        name: req.session.user.name,
        // TODO(pascal): are we going to ask for email over SMS?
        // email: req.session.user.email,
        phone: req.session.user.phone,
        zip: req.session.user.zip,
        campaign: req.session.user.keyword,
      }

      saveUser(user, {
        source: 'sms',
      })
      .then((data) => {
        res.send(message('Thanks for getting involved! We’ll be in touch soon.'))
      }, (reason) => {
        debug('error', reason)
      })
    },
    after(req, res) {
      res.send(message('We’ll be in touch soon, we promise! ✊🏾'))
    },
  },
}

module.exports = steps
