/* eslint-disable no-param-reassign */
const steps = require('./steps')
const getStepName = require('./get_step_name')
const getNextStepName = require('./get_next_step_name')
const debug = require('debug')('sms')

/**
 * dispatcher - primary SMS handler
 *

 when a request comes in, the dispatcher inspects the session to see which steps
 have been satisfied already to determine the current step and the next step. it
 then calls the after handler of the current step, and the before handler of the
 next step. the after handler for a step reads the user's response and stores it
 in the session. the before handler for a step asks the user for the next piece
 of data.

 * @param  {type} req express request object
 * @param  {type} res express response object
 */
module.exports = function dispatcher(req, res) {
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
