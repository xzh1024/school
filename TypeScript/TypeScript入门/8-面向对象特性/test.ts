class Test {
    /**
     * 访问控制符
     * public：公用的
     * private: 私有的
     * protected: 受保护的 只能在类和子类中访问
     */

    // name;
    
    // 构造函数 只在类被实例化时自动调用一次
    constructor(public name: string) {
        // this.name = name;
        console.log("xixi");
    }

    private i = 1;
    public j = 2;

    // 声明的方法其实就是绑定在原型prototype上的
    eat() {
        console.log("im eating");
        this.showName()
    }
    private showName() {
        console.log(this.name);
    }
}

var test1 = new Test('xie zi han');