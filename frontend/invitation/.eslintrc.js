module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ['error', {
      singleQuote: true,
      semi: true,
      useTabs: false,
      tabWidth: 4,
      trailingComma: 'all',
      printWidth: 120,
      bracketSpacing: true,
      arrowParens: 'avoid', //가능하면 생략 , always 항상 써야한다.
      proseWrap : 'preserve', 
      jsxBracketSameLine : false ,
      htmlWhitespaceSensitivity: "strict",
      vueIndentScriptAndStyle :true, // script 영역의 들여쓰기  true false
      endOfLine: 'auto'
      // insertPragma: true
    }]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
