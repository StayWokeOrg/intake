// TWIML markup helper
module.exports = function message(msg) {
  return `
    <Response>
      <Message>
        ${msg}
      </Message>
    </Response>
  `
}
