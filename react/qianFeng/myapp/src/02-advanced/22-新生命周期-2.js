import React, { Component } from 'react';

class Child extends Component {
  state = {
    title: 'hello',
  };

  // componentWillUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   console.log(nextState);
  // }

  /*
    getSnapshotBeforeUpdate()方法在呈现DOM之前被调用。用于在DOM更新后存储状态的先前值。
    getSnapshotBeforeUpdate()方法返回的任何值都将用作componentDidUpdate()方法的参数。
    此函数始终与componentDidUpdate()方法一起使用，反之亦然。
  */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate:');
    console.log(prevProps);
    console.log(prevState);
    return 100;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate:');
    console.log(prevProps);
    console.log(prevState);
  }

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              title: 'world',
            })
          }
        >
          child
        </button>
        <div>{this.props.myText}</div>
        <div>{this.state.title}</div>
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    myText: '111111',
  };
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              myText: '222222',
            })
          }
        >
          app
        </button>
        <Child myText={this.state.myText}></Child>
      </div>
    );
  }
}
