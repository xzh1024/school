import React, { Component } from "react";

class Child extends Component {
  state = {
    title: "111",
  };

  // componentDidMount 初始化
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
    return {
      title: nextProps.myName + nextState.title,
    };
  }

  render() {
    return (
      <div>
        <div>{this.props.myName}</div>
        <div>{this.state.title}</div>
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    myName: "aaa",
  };
  // componentDidMount 初始化
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log(this); // undefined
    console.log(nextState);
    console.log("getDerivedStateFromProps");
    return {
      myName:
        nextState.myName.substring(0, 1).toUpperCase() +
        nextState.myName.substring(1),
    };
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              myName: "ccc",
            });
          }}
        >
          click
        </button>
        <div>{this.state.myName}</div>
        <Child myName={this.state.myName}></Child>
      </div>
    );
  }
}
