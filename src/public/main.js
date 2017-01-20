/* env browser */
/* global $, Handlebars, document */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-throw-literal */
// TODO(pascal): figure out better linting for client-side JS

// TODO(pascal): get a real number
var NUMBER = '678-RESISTS (678-737-4787)'


/**
 * CampaignView - view class which consumes a data object and a template id
 * provides a renderTo method for rendering the view into a node
 *
 * @param  {object} options
 * @return {view} view instance
 */
function CampaignView(options) {
  if (!options.data) throw ('CampaignView requires data')
  if (!options.templateId) throw ('CampaignView requires a templateId')

  this.data = options.data

  // store source template once
  var source = $(options.templateId).html()

  // create render method from template source
  this.render = Handlebars.compile(source)
}

CampaignView.prototype = {

  // generate html using handlebars render method
  toHtml: function toHtml() {
    return this.render(this.data)
  },

  // insert rendered html into a dom node
  renderTo: function renderTo(selector) {
    $(selector).html(this.toHtml())
  },

  // append rendered html into a dom node
  appendTo: function appendTo(selector) {
    $(selector).append(this.toHtml())
  },

}

// campaign data object, used on both pages
var inauguration = {
  id: 'inauguration',
  sms_keyword: 'ready',
  name: '(Anti) Inauguration',
  number: NUMBER,
  description: 'Already public pressure has reversed the Republican Party’s attempt to gut the ethics committee, but we cannot back down now. We are the majority. We are the resistance.',
  url: '/inauguration.html',
}

// smooth scrolling when clicking scroll links
$(document).ready(() => {
  $('.scroll-button').click(function onClickScrollButton(event) {
    event.preventDefault()
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, 500)
  })
})
