import React, { Component } from "react";

class Child extends Component {
  state = {
    title: "aaa",
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    console.log(nextProps);
    this.setState({
      title: nextProps.text + "_",
    });
    // 最先获得父组件传来的属性，可以利用属性进行ajax或者逻辑处理。
    // 把属性转化成孩子自己的状态。
  }
  
  componentDidUpdate() {
    console.log("更新");
  }

  render() {
    return (
      <div>
        <h3>Child</h3>
        <div>{this.props.text}</div>
        <div>{this.state.title}</div>
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    text: "111",
  };

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ text: "2222222" })}>
          click
        </button>
        <Child text={this.state.text}></Child>
      </div>
    );
  }
}
