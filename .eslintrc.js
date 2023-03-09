module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // indent: ['error', 2, {SwitchCase: 1}],
    // 'no-debugger': 2,
    // 'no-unused-vars': 1,
    // eqeqeq: 2,
    // quotes: ['error', 'single', {allowTemplateLiterals: true}],
    // 'no-irregular-whitespace': 2, // 禁止不规则的空格
    // 'no-multi-spaces': 'error', // 禁止多个空格
    // 'space-infix-ops': 2, // 运算符前后禁止多个空格
    // 'array-bracket-spacing': ['error', 'never'], // 数组统一空格
    // 'block-spacing': ['error', 'always'],
    // 'comma-spacing': ['error'],
    // 'comma-style': ['error', 'last'],
    // 'computed-property-spacing': ['error', 'never'],
    // 'func-call-spacing': ['error', 'never'],
    // 'key-spacing': ['error', {beforeColon: false, afterColon: true}], // 冒号空格
    // 'keyword-spacing': ['error', {before: true}], //if () {}空格else
    // 'no-whitespace-before-property': 'error',
    // 'semi-spacing': 'error', //分号空格
    // 'space-before-blocks': ['error', 'never'], //function name()空格{}
    // 'space-before-function-paren': ['error', 'never'], //function name空格(){}
    // 'space-in-parens': ['error', 'never'],
    // 'arrow-spacing': ['error', {before: false, after: false}], //()空格=>空格{}
    // 'rest-spread-spacing': ['error', 'never'], // 空格...空格{}
    // 'no-unreachable': 1,
    // 'no-console': ['error', {allow: ['error', 'warn']}],
  },
}
