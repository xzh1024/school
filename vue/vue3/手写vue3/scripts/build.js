//进行打包  monerepo
//（1）获取打包目录 文件
const fs = require('fs')
const execa = require('execa')

const dirs = fs.readdirSync('packages').filter((p) => {
  // 判断是不是文件夹
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false
  }
  return true
})
//2 进行打包 并行打包
async function build(target) {
  console.log()
  console.log('5555555555', target)
  // 注意 开启子进程 execa -c 执行rullup配置，环境变量 -env
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit'
  })
}
async function runParaller(dirs, itemfn) {
  const result = []
  for (const item of dirs) {
    result.push(itemfn(item))
  }
  return Promise.all(result) // 存放打包的promise，等待这里的打包执行完毕之后，调用成功
}
runParaller(dirs, build).then(() => {
  //promise
  console.log('成功')
})
//注意 文件夹才打包
console.log(dirs)
