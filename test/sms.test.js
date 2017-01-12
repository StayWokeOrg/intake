const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const sms = require('../src/controller/sms')

describe('controller/sms:', () => {
  describe('#getStepName(session)', () => {
    const method = sms.getStepName
    describe('if session is empty', () => {
      it('should return "keyword"', () => {
        const session = {}
        method(session).should.equal('keyword')
      })
    })
    describe('if session.keyword exists', () => {
      it('should return "name"', () => {
        const session = {
          keyword: 'keyword',
        }
        method(session).should.equal('name')
      })
    })
    describe('if session.name exists', () => {
      it('should return "email"', () => {
        const session = {
          keyword: 'keyword',
          name: 'First Last',
        }
        method(session).should.equal('email')
      })
    })
    describe('if session.email exists', () => {
      it('should return "goodbye"', () => {
        const session = {
          keyword: 'keyword',
          name: 'First Last',
          email: 'email@host.com',
        }
        method(session).should.equal('goodbye')
      })
    })
  })
})
