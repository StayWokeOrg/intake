/**
 * message - TWIML markup helper
 *
 * @param  {type} ...items one or more pieces of text
 * @return {TWIML} the items wrapped in TWIML markup
 */
module.exports = function message(...messages) {
  return `<Response><Message>${messages.join('\n\n')}</Message></Response>`
}
