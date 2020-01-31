module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: "^16.8.2"
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  rules: {
    "react/display-name": 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-var-requires': 0,
    "@typescript-eslint/explicit-function-return-type": ["error"],
    '@typescript-eslint/no-empty-interface': 0,
  },
};