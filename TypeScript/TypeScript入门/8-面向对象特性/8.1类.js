var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person81 = /** @class */ (function () {
    /**
     * 访问控制符
     * public：公用的
     * private: 私有的
     * protected: 受保护的 只能在类和子类中访问
     */
    // name;
    // 构造函数 只在类被实例化时自动调用一次
    function Person81(name) {
        this.name = name;
        // this.name = name;
        console.log("xixi");
    }
    // 声明的方法其实就是绑定在原型prototype上的
    Person81.prototype.eat = function () {
        console.log("im eating");
    };
    Person81.prototype.showName = function () {
        console.log(this.name);
    };
    return Person81;
}());
// var p1 = new Person81();
// p1.name = "batman";
// var p2 = new Person81();
// p2.name = "supeman";
// p2.eat();
// var p3 = new Person81("xie zi han");
// p3.showName();
// 继承
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, code) {
        var _this = _super.call(this, name) || this;
        console.log("haha");
        _this.code = code;
        return _this;
    }
    Employee.prototype.work = function () {
        _super.prototype.eat.call(this);
        this.doWork();
    };
    Employee.prototype.doWork = function () {
        console.log("im working");
    };
    return Employee;
}(Person81));
var p1 = new Employee("test", 1);
p1.work();
console.log(p1);
