class Bus {
  public name = 'bus'; // 共有属性
  private _list: Function[] = []; // 私有变量

  protected age = 100; // 受保护的
  
  // 订阅
  subscribe(callback: Function) {
    // console.log(callback);
    this._list.push(callback);
  }
  dispatch() {
    this._list.forEach((cb) => cb && cb());
  }
}

class Child extends Bus {
  constructor() {
    super();
    console.log(this.age);
  }
}

const but = new Bus();
console.log(but);
console.log(but.name);
// console.log(but.age);
const child = new Child();

export default {};
