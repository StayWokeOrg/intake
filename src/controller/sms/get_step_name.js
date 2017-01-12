const steps = require('./steps')
const debug = require('debug')('sms') // eslint-disable-line

/**
 * getStepName - gets the current step name based on user data
 *
 * @param  {object} user user object from request session
 * @return {string} name of current step
 */
module.exports = function getStepName(user) {
  const stepName = Object.keys(steps).reduce((memo, step) => {
    if (memo) return memo
    if (!user[step]) return step
    return null
  }, null)

  return stepName
}
