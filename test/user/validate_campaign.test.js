const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const validateCampaign = require('../../src/user/validate_campaign')
const validCampaigns = require('../../src/user/valid_campaigns')

describe('user/validate_campaign:', () => {
  describe('#validateCampaign()', () => {
    const invalidExamples = [
      { value: null, description: 'null', expected: false },
      { value: undefined, description: 'undefined', expected: false },
      { value: '', description: 'empty string', expected: false },
      { value: 'random', expected: 'unknown:random' },
    ]
    const validExamples = validCampaigns.map(id => ({
      value: id,
      expected: id,
    }))
    const examples = [].concat(invalidExamples, validExamples)
    examples.forEach((example) => {
      describe(`${example.value || example.description}`, () => {
        it(`should return ${example.expected}`, () => {
          validateCampaign(example.value).should.equal(example.expected)
        })
      })
    })
  })
})
