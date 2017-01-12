const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const getNextStepName = require('../../src/controller/sms/get_next_step_name')

describe('controller/sms/get_next_step_name:', () => {
  describe('#getNextStepName(session)', () => {
    const method = getNextStepName
    describe('if session is empty', () => {
      it('should return "name"', () => {
        const session = {}
        method(session).should.equal('name')
      })
    })
    describe('if session.keyword exists', () => {
      it('should return "email"', () => {
        const session = {
          keyword: 'keyword',
        }
        method(session).should.equal('email')
      })
    })
    describe('if session.name exists', () => {
      it('should return "goodbye"', () => {
        const session = {
          keyword: 'keyword',
          name: 'First Last',
        }
        method(session).should.equal('goodbye')
      })
    })
    describe('if session.email exists', () => {
      it('should return undefined', () => {
        const session = {
          keyword: 'keyword',
          name: 'First Last',
          email: 'email@host.com',
        }
        expect(method(session)).to.be.undefined
      })
    })
  })
})
