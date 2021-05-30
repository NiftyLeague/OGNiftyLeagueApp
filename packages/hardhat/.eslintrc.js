module.exports = {
  env: {
    mocha: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["babel"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "prefer-template": "off",
    "no-console": "off",
    "func-names": "off",
    "no-underscore-dangle": "off",
  },
};
