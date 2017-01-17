/* env browser */
/* global window */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-throw-literal */
(function($) {
  'use strict'

  // form validation vars
  var $form = $('#form')
  var $name = $('#name')
  var $email = $('#email')

  // reference all required inputs on the page
  var $requiredFields = $('input[required]')

  // remember if form is valid
  var formOk = false

  // check for native validation support
  var nativeValidation = typeof $name[0].checkValidity === 'function'

  // display or hide error message
  function toggleErrorMessage($parent, $label, showError) {
    if (showError) {
      $parent.addClass('has-error')
      $label.removeClass('hidden')
    } else {
      $parent.removeClass('has-error')
      $label.addClass('hidden')
    }
  }

  // make sure field is valid
  function validateField(field) {
    var $field = $(field)
    // field's container element
    var $parent = $field.parent()
    // field's error label sibling
    var $label = $parent.find('.label')
    // default to not showing an error
    var showError = false

    // show error if field is blank
    if (!$field.val()) {
      showError = true
    } else {
      // show error if email is invalid
      switch ($field.prop('id')) {
        case 'email':
          // simple email regex - just checks for a single @ that's not
          // the first or last character
          if (!(/^[^@]+@[^@]+.[^@]*$/).test($field.val())) {
            showError = true
          }

          break
        case 'zip':
          if (!(/[0-9]{5}/).test($field.val())) {
            showError = true
          }

          break
        default:
          break
      }
    }

    // show or hide the error message
    toggleErrorMessage($parent, $label, showError)

    // store form state
    formOk = !showError
  }

  // disable native validation for consistent behavior in A-grade browsers
  $form.attr('novalidate', 'true')

  // wire up event listeners
  $requiredFields.on('blur', function() {
    validateField(this)
  })

  $form.on('submit', function(e) {
    // safari doesn't validate on submit, hence the dance here
    // https://bugs.webkit.org/show_bug.cgi?id=164382 >:(
    if (!nativeValidation || !$form[0].checkValidity()) {
      $requiredFields.each(function(i, required) {
        validateField(required)
      })

      // if form isn't valid after checking each required field,
      // prevent submission and focus first invalid field
      if (!formOk) {
        e.preventDefault()
        // focus the first field with an error
        $form.find('.has-error input:first').focus()
      }
    }
  })
})(window.jQuery)
