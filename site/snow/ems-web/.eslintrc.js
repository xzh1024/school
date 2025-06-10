module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'no-explicit-any': 0,
    'no-case-declarations': 0,
    // 定义后未使用
    'no-unused-vars': 0,
    // console警告
    'no-console': 1,
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
