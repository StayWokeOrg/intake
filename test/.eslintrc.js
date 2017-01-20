const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

const baseConfig = require('../.eslintrc.js')

var testConfig = Object.assign({}, baseConfig)

testConfig.globals = testConfig.globals || {}

Object.assign(testConfig.globals, {
    'describe': true,
    'xdescribe': true,
    'expect': true,
    'it': true,
    'xit': true,
    'before': true,
    'beforeEach': true,
    'after': true,
    'afterEach': true,
})

testConfig.plugins.push('disallow-methods')

testConfig.rules = Object.assign({}, baseConfig.rules, {
  'no-unused-expressions': [
    OFF
  ],
  'func-names': [
    OFF
  ],
  'prefer-arrow-callback': [
    OFF
  ],
  'space-before-function-paren': [
    OFF
  ],
  'import/newline-after-import': [
    OFF
  ],
})

module.exports = testConfig
