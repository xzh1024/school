import React, { Component } from 'react';
import { Map } from 'immutable';

const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const oldObj = Map(obj);
const newObj = oldObj.set('b', 20);
console.log(oldObj, newObj);
// 1.get获取immutalble
console.log(oldObj.get('b'), newObj.get('b'));
// 2.immutable ===> 普通对象
console.log(oldObj.toJS(), newObj.toJS());

export default class App extends Component {
  state = {
    // info: Map({
    //   name: '张三',
    //   age: 100,
    // }),
    info: {
      name: '张三',
      age: 100,
    },
  };

  render() {
    return (
      <div>
        {/* <button
          onClick={() => {
            this.setState({
              info: this.state.info.set('name', '小明').set('age', 18),
            });
          }}
        > */}
        <button
          onClick={() => {
            const oldInfo = Map(this.state.info);
            const newInfo = oldInfo.set('name', '小明').set('age', 18);
            this.setState({
              info: newInfo.toJS(),
            });
          }}
        >
          click
        </button>
        {/* {this.state.info.get('name')}-{this.state.info.get('age')} */}
        {this.state.info.name}-{this.state.info.age}
      </div>
    );
  }
}
