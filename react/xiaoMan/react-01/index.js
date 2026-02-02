import babel from '@babel/core'
import fs from 'node:fs'
const code = fs.readFileSync('./test.js', 'utf-8')
// () => function
const transformFunction = ({ types: t }) => {
  return {
    name: 'transformFunction',
    visitor: {
      // 匹配
      ArrowFunctionExpression(path) {
        // 箭头函数转成普通function
        const node = path.node
        console.log(node)
        // 转换成普通函数
        // async params body
        const arrowFunction = t.functionExpression(
          null, // 匿名函数
          node.params,
          //   node.body,
          t.blockStatement([t.returnStatement(node.body)]),
          node.async
        )
        path.replaceWith(arrowFunction)
        // 替换
        // path.replaceWith(
        //   t.functionExpression(null, path.node.params, path.node.body)
        // )
      }
    }
  }
}
const result = babel.transformSync(code, {
  plugins: [transformFunction]
})

console.log(result.code)
