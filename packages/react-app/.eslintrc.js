module.exports = {
  env: { browser: true, node: true, es6: true },
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  plugins: ["babel"],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020,
    ecmaFeatures: { jsx: true },
    sourceType: "module",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  rules: {
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
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
    // note you must disable the base rule as it can report incorrect errors
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-var-requires": "off",
    "jsx-a11y/accessible-emoji": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "no-unused-expressions": "off",
    "prefer-template": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      extends: [
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
      ],
    },
  ],
};
