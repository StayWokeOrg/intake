const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const validateCampaign = require('../../src/user/validate_campaign')

describe('validate_campaign:', () => {
  describe('#validateCampaign()', () => {
    const examples = [
      { value: null, description: 'null', expected: false },
      { value: undefined, description: 'undefined', expected: false },
      { value: '', description: 'empty string', expected: false },
      { value: 'inauguration', expected: 'inauguration' },
      { value: 'random', expected: 'unknown:random' },
    ]
    examples.forEach((example) => {
      describe(`${example.value || example.description}`, () => {
        it(`should return ${example.expected}`, () => {
          validateCampaign(example.value).should.equal(example.expected)
        })
      })
    })
  })
})
