class Person82 {
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


// 继承
class Employee2 extends Person81 {
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

// 泛型
var woekers: Array<Person82> = [];
woekers[0] = new Person82("zhangsan");
woekers[1] = new Employee2("lisi", 2);
// woekers[1] = 2;

var p2 = new Employee2("test", 1);
p2.work();