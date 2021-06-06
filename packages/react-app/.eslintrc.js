module.exports = {
  env: {
    browser: true,
  },
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  plugins: ["babel"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "jsx-a11y/accessible-emoji": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "prefer-template": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
