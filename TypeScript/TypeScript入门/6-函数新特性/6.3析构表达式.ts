// 解构
function getStock() {
    return {
        code: "IBM",
        price: 100
    }
}

var {code, price} = getStock();
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
    }
}

var {code: codex, price: {price2}} = getStock2();
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