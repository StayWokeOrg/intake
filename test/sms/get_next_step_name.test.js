const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const getNextStepName = require('../../src/controller/sms/get_next_step_name')

describe('controller/sms/get_next_step_name:', () => {
  describe('#getNextStepName(user)', () => {
    const method = getNextStepName
    describe('if user is empty', () => {
      it('should return "name"', () => {
        const user = {}
        method(user).should.equal('name')
      })
    })
    describe('if user.keyword exists', () => {
      it('should return "zip"', () => {
        const user = {
          keyword: 'keyword',
        }
        method(user).should.equal('zip')
      })
    })
    describe('if user.name exists', () => {
      it('should return "goodbye"', () => {
        const user = {
          keyword: 'keyword',
          name: 'First Last',
        }
        method(user).should.equal('goodbye')
      })
    })
    describe('if user.zip exists', () => {
      it('should return undefined', () => {
        const user = {
          keyword: 'keyword',
          name: 'First Last',
          zip: '12345',
        }
        expect(method(user)).to.be.undefined
      })
    })
  })
})
