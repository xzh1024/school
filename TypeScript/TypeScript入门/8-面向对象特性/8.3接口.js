//interface
var Person83 = /** @class */ (function () {
    function Person83(config) {
        this.config = config;
    }
    return Person83;
}());
var p83 = new Person83({
    name: "zhangsan",
    age: 18
});
console.log(p83.config);
var Sheep = /** @class */ (function () {
    function Sheep() {
    }
    Sheep.prototype.eat = function () {
        console.log("i eat grass");
    };
    return Sheep;
}());
var Tiger = /** @class */ (function () {
    function Tiger() {
    }
    Tiger.prototype.eat = function () {
        console.log("i eat meat");
    };
    return Tiger;
}());
