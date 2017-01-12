const steps = require('./steps')
const getStepName = require('./get_step_name')
const debug = require('debug')('sms') // eslint-disable-line

/**
 * getNextStepName - gets the next step name based on user data
 *
 * @param  {object} user user object from request session
 * @return {string} name of next step
 */
module.exports = function getNextStepName(user) {
  const stepNames = Object.keys(steps)
  const stepName = getStepName(user)
  const stepIndex = stepNames.indexOf(stepName)
  const nextStepName = stepNames[stepIndex + 1]
  return nextStepName
}
