/* eslint-disable no-param-reassign */

// const twilio = require('twilio')
const saveUser = require('../user/save_user')
const debug = require('debug')('sms')

// don't initialize twilio in tests. TODO(pascal): better way to do this?
// not sure we actually need the twilio client since we're not initiating the contact
// all we have to do is listen for requests and send a response
// let client
// if (process.env.NODE_ENV !== 'test') {
//   client = twilio(process.env.TWILIO_API_SID, process.env.TWILIO_API_TOKEN)
// } else {
//   client = {}
// }

// TWIML helper
function message(msg) {
  return `
    <Response>
      <Message>
        ${msg}
      </Message>
    </Response>
  `
}

// list of steps for the SMS flow. each step is an object with a before handler,
// or an after handler, or both. when a request comes in, the dispatcher
// inspects the session to see which steps have been satisfied already to
// determine the current step and the next step. it then calls the after handler
// of the current step, and the before handler of the next step. the after
// handler for a step reads the user's response and stores it in the session.
// the before handler for a step asks the user for the next piece of data.
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
        debug(data)
        res.send(message('Thanks for getting involved! We’ll be in touch soon.'))
      }, (reason) => {
        debug('error', reason)
      })
    },
  },
}

// determines the current step name based on session data
// just returning a string here for easy testability
function getStepName(session) {
  const stepName = Object.keys(steps).reduce((memo, step) => {
    if (memo) return memo
    if (!session[step]) return step
    return null
  }, null)

  return stepName
}

// gets the next step name based on session data
function getNextStepName(session) {
  const stepNames = Object.keys(steps)
  const stepName = getStepName(session)
  const stepIndex = stepNames.indexOf(stepName)
  const nextStepName = stepNames[stepIndex + 1]
  return nextStepName
}

function dispatcher(req, res) {
  const stepName = getStepName(req.session)
  debug('step', stepName)

  // if the step exists and has an after handler, call it
  const step = steps[stepName]
  if (step && step.after) {
    step.after(req, res)
  }

  const nextStepName = getNextStepName(req.session)
  debug('next step', nextStepName)

  // if the next step exists and has a before handler, call it
  const nextStep = steps[nextStepName]
  if (nextStep && nextStep.before) {
    nextStep.before(req, res)
  }
}

module.exports = {
  dispatcher,
  getStepName,
}
