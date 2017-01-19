/* eslint-disable no-param-reassign */
const flows = require('./flows')
const getFlowName = require('./get_flow_name')
const message = require('./message')
const debug = require('debug')('sms') // eslint-disable-line

/**
 * dispatcher - primary SMS handler
 *
 * determines which flow the user wants or is using, and calls its dispatcher
 *
 * @param  {type} req express request object
 * @param  {type} res express response object
 */
module.exports = function dispatcher(req, res) {
  // ensure the user object exists in the session
  req.session.user = req.session.user || {}

  // ensure the steps object exists
  req.session.steps = req.session.steps || {}

  debug('----------------------------')
  debug('req.body.Body', req.body.Body)
  debug('req.session', req.session)

  // debugging keywords
  if (req.body.Body === 'flow') {
    res.send(message(req.session.flowName))
  }
  if (req.body.Body === 'session') {
    res.send(message(JSON.stringify(req.session)))
  }
  if (req.body.Body === 'steps') {
    res.send(message(JSON.stringify(req.session.steps)))
  }
  if (req.body.Body === 'user') {
    res.send(message(JSON.stringify(req.session.user)))
  }
  if (req.body.Body === 'clear') {
    delete req.session
    res.send(message('Session cleared.'))
  }

  const flowName = getFlowName(req, res)
  debug('flowName', flowName)

  const flow = flows[flowName]
  flow.dispatcher(req, res)
}
