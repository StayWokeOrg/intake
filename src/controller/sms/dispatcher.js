/* eslint-disable no-param-reassign */
const commands = require('./commands')
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

  // parse their input keyword (which might be a flow response)
  const keyword = req.body.Body.trim().toLowerCase()

  // look up the associated command, or call the unknown command
  // commands.unknown will see if they're in a flow and delegate to it
  const command = commands[keyword] || commands.unknown

  command(req, res)
}
