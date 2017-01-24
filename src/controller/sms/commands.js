/* eslint-disable no-param-reassign */
const message = require('./message')
const flows = require('./flows')
const getSchedule = require('./get_schedule')
const debug = require('debug')('sms') // eslint-disable-line

// note: please use ‘real’ apostrophes instead of \'
// on a mac: option-] and option-shift-]


const commands = {

  'schedule': (req, res) => {
    const schedule = getSchedule()

    const messages = [
      `Hi there! ${schedule.slice(0, 1)}`,
      ...schedule.slice(1),
      'Stay woke. ✊🏾',
    ]

    res.send(message(...messages))
  },

  'signup': (req, res) => {
    // store their phone number
    req.session.user.phone = req.body.From
    // set their campaign id
    req.session.user.campaign = 'inauguration'
    // set the flow name in the session
    req.session.flowName = 'signup'
    // delegate to the flow
    flows.signup.dispatcher(req, res)
  },

  'unknown': (req, res) => {
    if (req.session.flowName) {
      // user is in a flow, see if it exists and delegate to it
      const flow = flows[req.session.flowName]
      if (flow) {
        flow.dispatcher(req, res)
        return
      }
    }

    // no flow, or flow was invalid
    // tell them what commands they can send us
    const text = 'Sorry, didn’t quite get that. You can say ‘signup’ to join StayWoke, or ‘schedule’ for a list of upcoming events.'
    res.send(message(text))
  },
}

// aliases
commands.ready = commands.signup

if (process.env.NODE_ENV !== 'production') {
  Object.assign(commands, {
    // debugging keywords
    'flow': (req, res) => {
      const msg = req.session.flowName || 'undefined'
      res.send(message(msg))
    },
    'session': (req, res) => {
      res.send(message(JSON.stringify(req.session)))
    },
    'steps': (req, res) => {
      res.send(message(JSON.stringify(req.session.steps)))
    },
    'user': (req, res) => {
      res.send(message(JSON.stringify(req.session.user)))
    },
    'clear': (req, res) => {
      req.session = null
      res.send(message('Session cleared.'))
    },
  })
}

module.exports = commands
