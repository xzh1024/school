// 解构
function getStock() {
    return {
        code: "IBM",
        price: 100
    };
}
var _a = getStock(), code = _a.code, price = _a.price;
console.log(code);
console.log(price);
// 解构嵌套
function getStock2() {
    return {
        code: "IBM",
        price: {
            price1: 100,
            price2: 200
        }
    };
}
var _b = getStock2(), codex = _b.code, price2 = _b.price.price2;
console.log(codex);
console.log(price);
console.log(price2);
// 数组类型
var array1 = [1, 2, 3, 4];
// var [number1,,,number2] = array1;
// console.log(number1);
// console.log(number2);
// var [number1,number2,...others] = array1;
// console.log(number1);
// console.log(number2);
// console.log(others);
// function doSomething([number1, number2, ...others]) {
//     console.log(number1);
//     console.log(number2);
//     console.log(others);
// }
// doSomething(array1);
