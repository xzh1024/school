// var sum = arg1 => arg1;
// var sum = (arg1: number, arg2: number) :number => arg1 + arg2;
// sum(5, 10);
var myArray = [1, 2, 3, 4, 5];
var filterArr = myArray.filter(function (value) { return value % 2 == 0; });
console.log(filterArr);
