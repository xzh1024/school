// const a = '9007199254740991'
// const b = '1234567899999999999'

// function add(a, b) {
//   // 实现大数相加方法
//   return 
// }

// const result = add(a, b)
// console.log(result) //结果为：1243575099254740990

// 实现
// const a = '9007199254740991'
// const b = '1234567899999999999'

// function add(a, b) {
//   // 1. 初始化指针，指向两个字符串的末尾
//   let i = a.length - 1;
//   let j = b.length - 1;
  
//   // 2. 初始化进位 carry 和结果数组
//   let carry = 0;
//   const result = [];
  
//   // 3. 循环处理每一位，直到两个字符串都遍历完且没有进位
//   while (i >= 0 || j >= 0 || carry > 0) {
//     // 获取当前位的数字，如果索引越界则视为 0
//     const digitA = i >= 0 ? Number(a[i]) : 0;
//     const digitB = j >= 0 ? Number(b[j]) : 0;
    
//     // 计算当前位的总和
//     const sum = digitA + digitB + carry;
    
//     // 当前位的结果是 sum 对 10 取余
//     result.push(sum % 10);
    
//     // 新的进位是 sum 除以 10 的整数部分
//     carry = Math.floor(sum / 10);
    
//     // 移动指针
//     i--;
//     j--;
//   }
  
//   // 4. 因为是从低位到高位计算的，结果数组需要反转并连接成字符串
//   return result.reverse().join('');
// }

// const result = add(a, b)
// console.log(result) // 结果为：1243575099254740990


const a = '9007199254740991'
const b = '1234567899999999999'

function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let list = [];
  while (i >= 0 || j >= 0 || carry > 0) {
    let digitA = i >= 0 ? Number(a[i]) : 0;
    let digitB = j >= 0 ? Number(b[j]) : 0;
    let sum = digitA + digitB + carry;
    list.push(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  // 实现大数相加方法
  return list.reverse().join('')
}

const result = add(a, b)
console.log(result) //结果为：1243575099254740990



