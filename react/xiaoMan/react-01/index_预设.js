import babel from '@babel/core'
import presetEnv from '@babel/preset-env' // es6 转 es5 核心包
import react from '@babel/preset-react' // 支持jsx
import fs from 'node:fs'
// const code = fs.readFileSync('./test.js', 'utf-8')
const code = fs.readFileSync('./app.jsx', 'utf-8')
const result = babel.transformSync(code, {
  //   presets: [presetEnv]
  presets: [
    // usage 按需引入
    // entry 手动引入
    [presetEnv, { useBuiltIns: 'usage', corejs: 3 }],
    react
  ]
})

console.log(result.code)
