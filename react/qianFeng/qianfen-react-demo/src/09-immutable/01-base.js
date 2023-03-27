import React, { Component } from 'react';
/*
  immutable
    每次修改一个Immutable对象时都会创建一个新的不可变的对象，在新对象上操作并不会影响到原对象的数据。（深拷贝）
*/
export default class App extends Component {
  render() {
    return <div>App</div>;
  }
}

var myObj = {
  name: 'zhangsan',
};
var myObj2 = {
  ...myObj,
};
myObj2.name = 'xiaoming';
console.log(myObj);
