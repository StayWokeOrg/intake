/* eslint-disable no-param-reassign */
const message = require('./message')
const saveUser = require('../../user/save_user')
const debug = require('debug')('sms')

// list of steps for the SMS flow. each step is an object with a before handler,
// or an after handler, or both. see dispatcher for more info.
const steps = {
  'keyword': {
    after(req, res) {
      req.session.phone = req.body.From
      req.session.keyword = req.body.Body
      debug(req.session)
    },
  },
  'name': {
    before(req, res) {
      res.send(message('Great! What’s your name?'))
    },
    after(req, res) {
      req.session.name = req.body.Body
      debug(req.session)
    },
  },
  'email': {
    before(req, res) {
      res.send(message(`Hi ${req.session.name}! What’s your email address?`))
    },
    after(req, res) {
      req.session.email = req.body.Body
      debug(req.session)
    },
  },
  'goodbye': {
    before(req, res) {
      const user = {
        name: req.session.name,
        email: req.session.email,
        phone: req.session.phone,
        campaign: req.session.keyword,
      }

      saveUser(user, {
        source: 'sms',
      })
      .then((data) => {
        // remove session properties so they start over again
        req.session.name = null
        req.session.email = null
        req.session.phone = null
        req.session.keyword = null

        res.send(message('Thanks for getting involved! We’ll be in touch soon.'))
      }, (reason) => {
        debug('error', reason)
      })
    },
  },
}

module.exports = steps
