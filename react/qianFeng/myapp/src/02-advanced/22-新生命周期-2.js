import React, { Component } from 'react';

class Child extends Component {
  state = {
    title: 'hello',
  };

  // componentWillUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   console.log(nextState);
  // }

  getSnapshotBeforeUpdate(...arg) {
    console.log("getSnapshotBeforeUpdate:");
    console.log(arg);
    return 100;
  }
  componentDidUpdate(...arg) {
    console.log("componentDidUpdate:");
    console.log(arg);
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
