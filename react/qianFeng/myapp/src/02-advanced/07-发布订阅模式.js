import React, { Component } from "react";

export default class App extends Component {
  render() {
    return <div>App</div>;
  }
}

// 调度中心
let bus = {
  list: [],
  // 订阅
  subscribe(callback) {
    // console.log(callback);
    this.list.push(callback);
  },
  // 发布
  publish(text) {
    // 遍历所有的list，将回调函数执行
    this.list.forEach((cb) => cb && cb(text));
  },
};

bus.subscribe((msg) => {
  console.log(111);
  console.log(msg);
});
bus.subscribe((msg) => {
  console.log(222);
  console.log(msg);
});
bus.subscribe((msg) => {
  console.log(666);
  console.log(msg);
});
// 调用发布
setTimeout(() => {
  bus.publish("男默女泪");
});
