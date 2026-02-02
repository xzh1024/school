// 语法
const a = (params = 2) => 1 + params
const b = [1, 2, 3]
const c = [...b, 4, 5]
class Babel {}
new Babel()
// API
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((item) => item % 2 === 0)
const y = x.map((item) => item * 2)
// core-js
// if (!('filter' in Array.prototype)) {
//   Array.prototype.filter = function (callback) {
//     const arr = []
//     for (let i = 0; i < this.length; i++) {
//       if (callback(this[i], i, this)) {
//         arr.push(this[i])
//       }
//     }
//     return arr
//   }
// }
