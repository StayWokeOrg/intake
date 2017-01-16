const chai = require('chai')
const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line
const debug = require('debug')('test') // eslint-disable-line

const encodeUser = require('../../src/user/encode_user')

describe('encode_user:', () => {
  describe('#encodeUser()', () => {
    function makeUser() {
      const user = {
        name: 'First Last',
        email: 'email@domain.com',
        phone: '1234567890',
        zip: '12345',
        campaign: 'campaign',
      }
      return user
    }
    function makeUserWithout(...keys) {
      const user = makeUser()
      keys.forEach(key => delete user[key])
      return user
    }
    const examples = [
      {
        description: 'user with everything',
        user: makeUser(),
        source: 'web',
        campaign: 'campaign',
        expected: { 'name': 'First Last', 'email': 'email@domain.com', 'phone': '1234567890', 'zip': '12345', 'campaign': 'campaign', 'source': 'web' },
        expectedDescription: 'object with all properties',
      },
      {
        description: 'user with no phone',
        user: makeUserWithout('phone'),
        source: 'web',
        campaign: 'campaign',
        expected: { 'name': 'First Last', 'email': 'email@domain.com', 'zip': '12345', 'campaign': 'campaign', 'source': 'web' },
        expectedDescription: 'object without empty phone property',
      },
    ]
    examples.forEach((example) => {
      describe(`${example.description}`, () => {
        it(`should return ${example.expectedDescription}`, () => {
          const result = encodeUser({
            user: example.user,
            source: example.source,
            campaign: example.campaign,
          })
          expect(result).to.eql(example.expected)
        })
      })
    })
  })
})
