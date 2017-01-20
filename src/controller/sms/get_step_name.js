const debug = require('debug')('sms') // eslint-disable-line

/**
 * getStepName - gets the current step name based on user data
 *
 * @param  {object} session request session
 * @return {string} name of current step
 */
module.exports = function getStepName(session, steps) {
  const stepName = Object.keys(steps).reduce((memo, step) => {
    if (memo) return memo
    // if step hasn't been marked yet
    if (!session.steps[step]) return step
    // if step hasn't been marked complete yet
    if (session.steps[step] !== 'complete') return step
    return null
  }, null)

  return stepName
}
