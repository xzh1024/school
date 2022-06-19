import React, { Component } from "react";

class Child extends Component {
  state = {
    title: "child组件",
  };

  // 16.2之前与之后

  UNSAFE_componentWillMount() {
    /* 即将废弃 */
    console.log("1.componentWillMount");

    // 第一次上树前的 最后一次修改状态机会
    this.setState({
      title: "hello",
    });
  }

  render() {
    console.log("2、7.render");
    return <div>child</div>;
  }

  componentDidMount() {
    console.log("3.componentDidMount");
    // 数据请求axios
    // 订阅函数调用
    // setInterval
    // 基于创建完的dom进行 初始化，，，，，，BetterScroll
  }

  componentWillReceiveProps() {
    /* 即将废弃 */
    console.log("4.componentWillReceiveProps");
  }

  shouldComponentUpdate() {
    console.log("5.shouldComponentUpdate");
    return true;
  }

  componentWillUpdate() {
    /* 即将废弃 */
    console.log("6.componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("8.componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("9.componentWillUnmount");
  }
}

export default class App extends Component {
  state = {
    id: 1,
    flag: true,
  };
  render() {
    return (
      <div>
        <h3
          onClick={() => {
            this.setState({
              id: 2,
            });
          }}
        >
          App
        </h3>
        <button
          onClick={() => {
            this.setState({
              flag: false,
            });
          }}
        >
          delete
        </button>
        {this.state.flag && <Child id={this.state.id}></Child>}
      </div>
    );
  }
}
