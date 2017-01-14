const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const getStepName = require('../../src/controller/sms/get_step_name')

describe('controller/sms/get_step_name:', () => {
  describe('#getStepName(user)', () => {
    const method = getStepName
    describe('if user is empty', () => {
      it('should return "keyword"', () => {
        const user = {}
        method(user).should.equal('keyword')
      })
    })
    describe('if user.keyword exists', () => {
      it('should return "name"', () => {
        const user = {
          keyword: 'keyword',
        }
        method(user).should.equal('name')
      })
    })
    describe('if user.name exists', () => {
      it('should return "zip"', () => {
        const user = {
          keyword: 'keyword',
          name: 'First Last',
        }
        method(user).should.equal('zip')
      })
    })
    describe('if user.zip exists', () => {
      it('should return "goodbye"', () => {
        const user = {
          keyword: 'keyword',
          name: 'First Last',
          zip: '12345',
        }
        method(user).should.equal('goodbye')
      })
    })
  })
})
