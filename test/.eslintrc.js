const ERROR = 'error';

const baseConfig = require('../.eslintrc.js')

var testConfig = Object.assign({}, baseConfig)

testConfig.globals = testConfig.globals || {}

testConfig.plugins.push('disallow-methods')

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

module.exports = testConfig
