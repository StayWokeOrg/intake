const saveUser = require('../user/save_user')
const debug = require('debug')('web')

function submit(req, res) {
  // form data is in req.body
  const user = req.body
  saveUser({
    user,
    source: 'web',
  })
  .then((data) => {
    debug(data)
    // redirect to a static confirmation page
    res.redirect('/success.html')
  }, (reason) => {
    debug(reason)
    // TODO(pascal): redirect to an error message
    res.redirect('/')
  })
}

module.exports = {
  submit,
}
