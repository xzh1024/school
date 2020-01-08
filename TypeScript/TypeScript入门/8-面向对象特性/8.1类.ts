class Person81 {
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

    // 声明的方法其实就是绑定在原型prototype上的
    eat() {
        console.log("im eating");
    }
    showName() {
        console.log(this.name);
    }
}

// var p1 = new Person81();
// p1.name = "batman";

// var p2 = new Person81();
// p2.name = "supeman";

// p2.eat();

// var p3 = new Person81("xie zi han");
// p3.showName();

// 继承
class Employee extends Person81 {
    constructor(name: string, code: number){
        super(name);
        console.log("haha");
        this.code = code;
    }

    code: number;

    work() {
        super.eat();
        this.doWork();
    }

    private doWork() {
        console.log("im working")
    }
}
var p1 = new Employee("test", 1);

p1.work();

console.log(p1);