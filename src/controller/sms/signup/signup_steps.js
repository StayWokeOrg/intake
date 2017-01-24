/* eslint-disable no-param-reassign */
const message = require('../message')
const saveUser = require('../../../user/save_user')
const issues = require('../../../public/issues').issues
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

// const startsWithY = /^y/i
// const containsYes = /(yes|yeah|ya)/i
// function isAffirmative(response) {
//   if (startsWithY.test(response)) return true
//   if (containsYes.test(response)) return true
//   return false
// }

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

  'issues': (req, res, next) => {
    if (notStarted(req, 'issues')) {
      markStarted(req, 'issues')

      // construct the issues message
      const greeting = 'Okay, are there particular issues that interest you?\n'

      const menu = (
        issues
        .map((issue, i) => `${i + 1}. ${issue.description}\n`)
        .join('')
      )

      const prompt = 'Enter as many numbers as you like:'

      const msg = `${greeting}\n${menu}\n${prompt}`

      res.send(message(msg))
    } else {
      // convert the response into an array of valid numbers
      const numbers = (
        req.body.Body
        .split('')
        // convert each to a number
        .map(n => Number(n))
        // filter out non-numbers
        .filter(n => !isNaN(n))
        // subtract 1 from each for 0-based indexes
        .map(n => n - 1)
        // filter out numbers that are out of range
        .filter(n => n >= 0)
        .filter(n => n < issues.length)
      )

      // map the numbers to issue ids
      const topics = numbers.map(n => issues[n].id)

      // update user.topics in the session
      req.session.user.topics = topics

      // we have all the info we need
      // save the user
      debug('saving user', req.session.user)

      saveUser({
        user: req.session.user,
        source: 'sms',
      })
      .then((data) => {
        debug('save succeeded', data)
      }, (reason) => {
        debug('error', reason)
      })

      // don't need to wait for save to complete to proceed
      // mark this step as complete
      markComplete(req, 'issues')
      next()
    }
  },

  'goodbye': (req, res, next) => {
    // remove the user from the flow once this response is sent
    delete req.session.flowName

    // mark this step completed as well
    markComplete(req, 'goodbye')

    // say goodbye
    res.send(message('Cool, thanks for getting involved! We’ll be in touch soon with concrete actions you can take. Stay woke. ✊🏾'))
  },

  'postsignup': (req, res, next) => {
    res.send(message('You’re already signed up! ✊🏾'))
  },

}

module.exports = steps
