import React, { Component } from 'react';
import { List } from 'immutable';
const arr = List([1, 2, 3]);
console.log(arr);
const arr2 = arr.push(4);
console.log(arr2);
const arr3 = arr2.shift(0);
console.log(arr3);
const arr4 = arr3.concat([5, 6, 7]);
console.log(arr4.toJS());

export default class App extends Component {
  state = {
    favor: List(['aaa', 'bbb', 'ccc']),
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.favor.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
