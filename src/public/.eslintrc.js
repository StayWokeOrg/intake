const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

const config = {
  'parserOptions': {
    'ecmaVersion': 5,
    'sourceType': 'script',
  },
  'env': {
    'browser': true,
  },
  rules: {
    'strict': [
      OFF
    ],
    'no-var': [
      OFF,
    ],
    'vars-on-top': [
      OFF,
    ],
    'prefer-arrow-callback': [
      OFF,
    ],
    'prefer-template': [
      OFF,
    ],
    'comma-dangle': [
      OFF,
    ],
    'object-shorthand': [
      OFF,
    ],
  }
}

module.exports = config
