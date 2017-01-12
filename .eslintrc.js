const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    "no-unused-vars": [
      ERROR,
      {
        vars: 'all',
        args: 'none',
      },
    ],
    'semi': [
      ERROR,
      'never',
    ],
    'quote-props': [
      ERROR,
      'consistent',
    ],
    'consistent-return': [
      OFF,
    ],
  },
}
