var Test = /** @class */ (function () {
    /**
     * 访问控制符
     * public：公用的
     * private: 私有的
     * protected: 受保护的 只能在类和子类中访问
     */
    // name;
    // 构造函数 只在类被实例化时自动调用一次
    function Test(name) {
        this.name = name;
        this.i = 1;
        this.j = 2;
        // this.name = name;
        console.log("xixi");
    }
    // 声明的方法其实就是绑定在原型prototype上的
    Test.prototype.eat = function () {
        console.log("im eating");
        this.showName();
    };
    Test.prototype.showName = function () {
        console.log(this.name);
    };
    return Test;
}());
var test1 = new Test('xie zi han');
