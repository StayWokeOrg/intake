/* eslint-disable no-param-reassign */
const message = require('./message')
const flows = require('./flows')
const events = require('./schedule')
const debug = require('debug')('sms') // eslint-disable-line

// note: please use ‘real’ apostrophes instead of \'
// on a mac: option-] and option-shift-]


const commands = {

  'schedule': (req, res) => {
    const messages = [
      'Here’s a list of upcoming protest events:',
      ...events,
      'You can visit https://in.staywoketech.org/inauguration.html for more info. Stay woke. ✊🏾',
    ]
    res.send(message(...messages))
  },

  'signup': (req, res) => {
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
      res.send(message(req.session.flowName))
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
      delete req.session
      res.send(message('Session cleared.'))
    },
  })
}

module.exports = commands
