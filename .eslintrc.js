module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  rules: {
    "react/display-name": 0,
    "no-console": ["error"],
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'lines-between-class-members': 0,
    '@typescript-eslint/camelcase': 0,
    'max-len': ["error", { "code": 88 }],
    'react/static-property-placement': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-var-requires': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "import/order": ["error", {
      "newlines-between": "always",
      "groups": [
        ["builtin", "external", "internal"],
        ["parent", "sibling"],
        "index",
      ],
    }],
  },
};