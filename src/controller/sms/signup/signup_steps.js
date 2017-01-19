/* eslint-disable no-param-reassign */
const message = require('../message')
const saveUser = require('../../../user/save_user')
const debug = require('debug')('sms')

function notStarted(req, step) {
  return !req.session.steps[step]
}
function markStarted(req, step) {
  req.session.steps[step] = 'started'
}
function markNotStarted(req, step) {
  delete req.session.steps[step]
}
function markComplete(req, step) {
  req.session.steps[step] = 'complete'
}

const validZip = /^\d{5}$/

function validateZip(zip) {
  return validZip.test(zip) && zip
}

/**
list of steps for the SMS signup flow.

each step is typically called twice.

the first time it's called, it should:
- mark itself as 'started'
- res.send a question to the user

the second time it's called, it should:
- read and validate the user's response
- if the response is not valid, it should:
  - mark the step as unstarted
  - call next(), so the user will be prompted again
- if the response is valid, it should:
  - store the response in the session
  - mark the step as complete
  - call next()

*/
const steps = {

  'name': (req, res, next) => {
    if (notStarted(req, 'name')) {
      markStarted(req, 'name')
      res.send(message('✊🏾 Hi, thanks for pledging to resist. StayWoke will be planning actions in your area, and we need your voice. What’s your name?'))
    } else {
      // trim the name and collapse multiple spaces
      req.session.user.name = req.body.Body.trim().replace(/ +/g, ' ')
      // store their phone as well
      req.session.user.phone = req.body.From
      // mark this step as complete
      markComplete(req, 'name')
      next()
    }
  },

  'zip': (req, res, next) => {
    // make sure there's a zip_attempts counter
    req.session.zip_attempts = req.session.zip_attempts || 0

    if (notStarted(req, 'zip')) {
      markStarted(req, 'zip')
      let firstSentence = ''

      if (req.session.zip_attempts === 0) {
        // if they gave us a name, use it as a greeting
        const firstName = req.session.user.name.split(' ')[0]
        if (firstName) firstSentence = `👋🏾 Hi ${firstName}!`
      } else {
        firstSentence = '🤔 Hmm, that doesn’t look like a zip code.'
      }

      res.send(message(`${firstSentence}\n\nTo connect with events in your area, enter your 5-digit zip code. Or say 'skip'.`))
    } else {
      // increment the zip_attempts counter
      req.session.zip_attempts += 1

      // trim/lowercase the response
      const response = req.body.Body.trim().toLowerCase()

      if (response === 'skip') {
        // user doesn't want to give their zip
        markComplete(req, 'zip')
        return next()
      }

      // sanitize the zip input
      const zip = validateZip(response)

      if (zip) {
        // got a zip! set it and mark complete
        req.session.user.zip = zip
        markComplete(req, 'zip')
        return next()
      }

      if (req.session.zip_attempts >= 2) {
        // we've asked twice, that's enough nagging
        // don't set the zip, just mark this step complete
        markComplete(req, 'zip')
        return next()
      }

      // mark this step as not started, so it'll try again
      markNotStarted(req, 'zip')
      next()
    }
  },

  // WIP
  'issues': (req, res, next) => {
    if (notStarted(req, 'issues')) {
      markStarted(req, 'issues')
      res.send(message('Great'))
    } else {
      // trim the name and collapse multiple spaces
      req.session.user.name = req.body.Body.trim().replace(/ +/g, ' ')
      // store their phone as well
      req.session.user.phone = req.body.From
      // mark this step as complete
      markComplete(req, 'issues')
      next()
    }
  },

  'goodbye': (req, res, next) => {
    const user = {
      name: req.session.user.name,
      phone: req.session.user.phone,
      zip: req.session.user.zip,
      campaign: 'inauguration',
    }

    saveUser({
      user,
      source: 'sms',
    })
    .then((data) => {
      // remove them from this flow
      delete req.session.flowName
      res.send(message('Cool, thanks for getting involved! We’ll be in touch soon with concrete actions you can take. Stay woke. ✊🏾'))
    }, (reason) => {
      debug('error', reason)
      res.send(message('Hmm, there was an error saving your info.'))
    })
  },
}

module.exports = steps
