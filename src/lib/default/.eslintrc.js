module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard'
  ],
  env: {
    browser: true
  },
  rules: {
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
}
