const steps = require('./steps')
const debug = require('debug')('sms') // eslint-disable-line

/**
 * getStepName - gets the current step name based on session data
 *
 * @param  {object} session session object from request
 * @return {string} name of current step
 */
module.exports = function getStepName(session) {
  const stepName = Object.keys(steps).reduce((memo, step) => {
    if (memo) return memo
    if (!session[step]) return step
    return null
  }, null)

  return stepName
}
