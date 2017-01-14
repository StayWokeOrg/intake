function Campaign(opts) {
  for (key in opts) {
    this[key] = opts[key]
  }
}

Campaign.prototype.toHtml = function toHtml(templateid) {
  var source = $(templateid).html()
  var renderTemplate = Handlebars.compile(source)
  return renderTemplate(this)
}
