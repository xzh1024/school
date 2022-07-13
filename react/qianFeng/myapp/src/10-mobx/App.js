import React, { Component } from 'react';
import { observable, autorun } from 'mobx';

// 对于普通类型数据的监听
// var observableNumber = observable.box(10);
// var observableName = observable.box('小明');

// 第一次执行，之后每次改变也会执行
// autorun(() => {
//   console.log(observableNumber.get());
// });
// autorun(() => {
//   console.log(observableName.get());
// });

// setTimeout(() => {
//   observableNumber.set(20);
//   observableName.set('明明');
// }, 1000);

// var myObj = observable.map({ name: 'zhangsan', age: 100 });
// autorun(() => {
//   console.log('对象的name属性改变了:' + myObj.get('name'));
// });
// autorun(() => {
//   console.log('对象的age属性改变了:' + myObj.get('age'));
// });
// myObj.set('name', 'xiaoming');
// setTimeout(() => {
//   myObj.set('age', 18);
// }, 1000);
var myObj = observable({ name: 'zhangsan', age: 100 });
autorun(() => {
  console.log('对象的name属性改变了:' + myObj.name);
});
autorun(() => {
  console.log('对象的age属性改变了:' + myObj.age);
});
myObj.name = 'xiaoming';
setTimeout(() => {
  myObj.age = 18;
}, 1000);
export default class App extends Component {
  render() {
    return <div>App</div>;
  }
}
