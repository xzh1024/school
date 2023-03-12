//通过rollup进行打包

// const ts = require("typescript");
//（1）引入相关依赖
import ts from "rollup-plugin-typescript2" //解析 ts
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve' //解析第三方插件
import path from 'path' //处理路径

//（2）获取文件路径
const packagesDir = path.resolve(__dirname, 'packages')

//（2.1）获取需要打包的包
const packageDir = path.resolve(packagesDir, process.env.TRAGET)
console.log("--------------packageDir-----------")
console.log(packageDir)