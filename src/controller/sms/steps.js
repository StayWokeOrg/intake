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
      res.send(message('Great! What’s your name?'))
    },
    after(req, res) {
      req.session.user.name = req.body.Body
      debug(req.session.user)
    },
  },
  'email': {
    before(req, res) {
      res.send(message(`Hi ${req.session.user.name}! What’s your email address?`))
    },
    after(req, res) {
      req.session.user.email = req.body.Body
      debug(req.session.user)
    },
  },
  'goodbye': {
    before(req, res) {
      const user = {
        name: req.session.user.name,
        email: req.session.user.email,
        phone: req.session.user.phone,
        campaign: req.session.user.keyword,
        // TODO(pascal): ^ are we going to use the initial SMS keyword as the
        // campaign name?
      }

      saveUser(user, {
        source: 'sms',
      })
      .then((data) => {
        // remove session properties so they start over again
        req.session.user.name = null
        req.session.user.email = null
        req.session.user.phone = null
        req.session.user.keyword = null

        res.send(message('Thanks for getting involved! We’ll be in touch soon.'))
      }, (reason) => {
        debug('error', reason)
      })
    },
  },
}

module.exports = steps
