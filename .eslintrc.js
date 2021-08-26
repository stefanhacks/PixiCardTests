module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['tests/*'],
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    indent: 'warn',
    'one-var': 'warn',
    camelcase: 'warn',
    'comma-spacing': 'warn',
    eqeqeq: 'error',
    'no-shadow': 'off',
    'no-eq-null': 'error',
    'no-alert': 'warn',
    'no-console': 'warn',
    'no-new': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'IfStatement[test.operator=undefined]',
        message:
          "No implicit 'if' conditions, use of an explicit operator is mandatory.\nWrong: if(true)\nRight: if(condition === true){}",
      },
    ],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'object-curly-newline': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 120,
        endOfLine: 'auto',
      },
    ],
  },
};
