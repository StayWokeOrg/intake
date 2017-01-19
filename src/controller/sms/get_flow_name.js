const flows = require('./flows')
const debug = require('debug')('sms') // eslint-disable-line

module.exports = function getFlow(req, res, cb) {
  const session = req.session

  let flowName = session.flowName

  if (!flowName) {
    // get flowName from user text
    flowName = req.body.Body.trim().toLowerCase()

    if (flows[flowName]) {
      // flowName is valid, save it in the session
      session.flowName = flowName
    } else {
      // not valid, use the unknown flow
      flowName = 'unknown'
    }
  }

  return flowName
}
