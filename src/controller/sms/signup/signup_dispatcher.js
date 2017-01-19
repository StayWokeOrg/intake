/* eslint-disable no-param-reassign */
const steps = require('./signup_steps.js')
const getStepName = require('../get_step_name')
// const getNextStepName = require('../get_next_step_name')
const debug = require('debug')('sms')

/**
 * signup_dispatcher
 *

walks the user through each signup step

 * @param  {type} req express request object
 * @param  {type} res express response object
 */
module.exports = function stepsDispatcher(req, res) {
  const session = req.session

  const stepName = getStepName(session, steps)
  debug('step', stepName)

  // if the step exists, call it
  const step = steps[stepName]
  if (step) {
    // passing req, res, next
    step(req, res, () => {
      debug('calling next step')
      stepsDispatcher(req, res)
    })
  }
}
