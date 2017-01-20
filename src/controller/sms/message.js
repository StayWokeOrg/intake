/**
 * message - TWIML markup helper
 *
 * @param  {type} ...items one or more pieces of text
 * @return {TWIML} the items wrapped in TWIML markup
 */
module.exports = function message(...items) {
  const messages = items.map(item => `<Message>${item}</Message>`)
  return `<Response>${messages.join('')}</Response>`
}
