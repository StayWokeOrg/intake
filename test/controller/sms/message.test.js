const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const message = require('../../../src/controller/sms/message')

describe('controller/sms/message:', () => {
  describe('#message()', () => {
    describe('with one item', () => {
      it('should return a response with a single message', () => {
        const expected = '<Response><Message>item</Message></Response>'
        message('item').should.equal(expected)
      })
    })
    describe('with two items', () => {
      it('should return a response with two messages', () => {
        const expected = '<Response><Message>item1\n\nitem2</Message></Response>'
        message('item1', 'item2').should.equal(expected)
      })
    })
  })
})
