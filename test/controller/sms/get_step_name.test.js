const chai = require('chai')
const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const getStepName = require('../../../src/controller/sms/get_step_name')

describe('controller/sms/get_step_name:', function() {
  describe('#getStepName(session, steps)', function() {
    const method = getStepName
    const steps = {
      step_one: 'step_one',
      step_two: 'step_two',
      step_three: 'step_three',
    }
    function makeSession() {
      return {
        steps: {},
      }
    }
    beforeEach(function() {
      this.session = makeSession()
    })
    describe('if session is empty', function() {
      it('should return "step_one"', function() {
        method(this.session, steps).should.equal('step_one')
      })
    })
    describe('if step_one is started, but not complete', function() {
      beforeEach(function() {
        this.session.steps.step_one = 'started'
      })
      it('should return "step_one"', function() {
        method(this.session, steps).should.equal('step_one')
      })
    })
    describe('if step_one is complete', function() {
      beforeEach(function() {
        this.session.steps.step_one = 'complete'
      })
      it('should return "step_two"', function() {
        method(this.session, steps).should.equal('step_two')
      })

      describe('if step_two is started, but not complete', function() {
        beforeEach(function() {
          this.session.steps.step_two = 'started'
        })
        it('should return "step_two"', function() {
          method(this.session, steps).should.equal('step_two')
        })
      })
      describe('if step_two is complete', function() {
        beforeEach(function() {
          this.session.steps.step_two = 'complete'
        })
        it('should return "step_three"', function() {
          method(this.session, steps).should.equal('step_three')
        })
      })
    })
  })
})
