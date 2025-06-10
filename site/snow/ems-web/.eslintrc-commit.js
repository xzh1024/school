/* eslint-disable*/
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  ignorePatterns: "subapp",
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-explicit-any': 0,
    // 定义后未使用
    '@typescript-eslint/no-unused-vars': 1,
    // console警告
    'no-console': 2,
    // const 变量不能更改
    'no-const-assign': 2,
    // 禁止使用var定义
    'no-var': 0,
    // super之前不能使用this
    'no-this-before-super': 2,
    // 必须使用全等
    eqeqeq: 2,
    // 分号
    semi: 2,
  },
};
