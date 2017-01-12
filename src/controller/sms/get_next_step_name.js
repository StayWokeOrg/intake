const steps = require('./steps')
const getStepName = require('./get_step_name')
const debug = require('debug')('sms') // eslint-disable-line

/**
 * getNextStepName - gets the next step name based on session data
 *
 * @param  {object} session session object from request
 * @return {string} name of next step
 */
module.exports = function getNextStepName(session) {
  const stepNames = Object.keys(steps)
  const stepName = getStepName(session)
  const stepIndex = stepNames.indexOf(stepName)
  const nextStepName = stepNames[stepIndex + 1]
  return nextStepName
}
