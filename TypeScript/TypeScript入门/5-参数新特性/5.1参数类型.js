var myname = "xie zi han";
// var alias = "xixi";
var alias = "xixi";
alias = 13;
var age = 13;
var man = true;
function text1() {
    // 无返回值
}
function text2() {
    // 返回值是字符串类型
    return '';
}
function text3(name) {
    // 参数字符串类型，返回值字符串类型
    return name;
}
text3('汤姆');
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var zhangsan = new Person();
zhangsan.name = "zhangsan";
zhangsan.age = 18;
