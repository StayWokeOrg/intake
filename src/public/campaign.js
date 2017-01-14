/* global $, Handlebars */
/* eslint-disable no-var */
/* eslint-disable comma-dangle */

function Campaign(opts) {
  this.data = opts
}

Campaign.prototype.toHtml = function toHtml(templateid) {
  var source = $(templateid).html()
  var renderTemplate = Handlebars.compile(source)
  return renderTemplate(this.data)
}
