const message = require('../message')

const text = 'Sorry, didn’t quite get that. You can say ‘ready’ to join StayWoke, or ‘schedule’ for a list of upcoming events.'

module.exports = {
  dispatcher(req, res) {
    res.send(message(text))
  },
}
