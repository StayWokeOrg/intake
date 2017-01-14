const chai = require('chai')

const expect = chai.expect // eslint-disable-line
const should = chai.should() // eslint-disable-line

const validateUser = require('../../src/user/validate_user')

describe('validate_user:', () => {
  describe('#validateUser()', () => {
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
        description: 'null',
        value: null,
        expected: 'user must exist',
      },
      {
        description: 'undefined',
        value: undefined,
        expected: 'user must exist',
      },
      {
        description: 'empty user',
        value: {},
        expected: 'user must have a name',
      },
      {
        description: 'user without name',
        value: makeUserWithout('name'),
        expected: 'user must have a name',
      },
      {
        description: 'user without zip',
        value: makeUserWithout('zip'),
        expected: 'user must have a zip code',
      },
      {
        description: 'user without email and phone',
        value: makeUserWithout('email', 'phone'),
        expected: 'user must have an email or a phone',
      },
      {
        description: 'user without email',
        value: makeUserWithout('email'),
        expected: undefined,
      },
      {
        description: 'user without phone',
        value: makeUserWithout('phone'),
        expected: undefined,
      },
      {
        description: 'user with everything',
        value: makeUser(),
        expected: undefined,
      },
    ]
    examples.forEach((example) => {
      describe(`${example.description}`, () => {
        const expectedDescription = (
          typeof example.expected === 'string'
          ? `"${example.expected}"`
          : typeof example.expected
        )
        it(`should return ${expectedDescription}`, () => {
          const result = validateUser(example.value)
          expect(result).to.equal(example.expected)
        })
      })
    })
  })
})
