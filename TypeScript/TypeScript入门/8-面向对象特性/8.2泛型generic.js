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
var Person82 = /** @class */ (function () {
    /**
     * 访问控制符
     * public：公用的
     * private: 私有的
     * protected: 受保护的 只能在类和子类中访问
     */
    // name;
    // 构造函数 只在类被实例化时自动调用一次
    function Person82(name) {
        this.name = name;
        // this.name = name;
        console.log("xixi");
    }
    // 声明的方法其实就是绑定在原型prototype上的
    Person82.prototype.eat = function () {
        console.log("im eating");
    };
    Person82.prototype.showName = function () {
        console.log(this.name);
    };
    return Person82;
}());
// 继承
var Employee2 = /** @class */ (function (_super) {
    __extends(Employee2, _super);
    function Employee2(name, code) {
        var _this = _super.call(this, name) || this;
        console.log("haha");
        _this.code = code;
        return _this;
    }
    Employee2.prototype.work = function () {
        _super.prototype.eat.call(this);
        this.doWork();
    };
    Employee2.prototype.doWork = function () {
        console.log("im working");
    };
    return Employee2;
}(Person81));
// 泛型
var woekers = [];
woekers[0] = new Person82("zhangsan");
woekers[1] = new Employee2("lisi", 2);
// woekers[1] = 2;
var p2 = new Employee2("test", 1);
p2.work();
