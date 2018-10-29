module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": "off",
    "import/prefer-default-export": "off",
    "strict": 0,
    "react/prop-types": 0,
    "no-console": "off",
  },
  "globals": {
    "window": true,
    "document": true,
    "console": true,
    "localStorage": true,
  }
};
