import React, { Component } from "react";

/*
  setState处在同步的逻辑中，异步更新状态，更新真实dom。
  
  setState处在异步的逻辑中，同步更新状态，同步更新真实dom。

  setState 接受第二个参数，第二个参数是回调函数，状态和dom更新完后就会被触发。
*/
export default class App extends Component {
  state = {
    count: 0,
  };

  handleAdd1 = () => {
    this.setState(
      {
        count: this.state.count + 1,
      },
      () => {
        // 状态 和真实dom已经更新完了
        console.log(this.state.count);
      }
    );
    this.setState({
      count: this.state.count + 1,
    });
    this.setState({
      count: this.state.count + 1,
    });
    // this.setState({
    //   count: this.state.count + 5,
    // });
  };
  handleAdd2 = () => {
    // setTimeout(() => {
    //   this.setState({
    //     count: this.state.count + 2,
    //   });
    //   this.setState({
    //     count: this.state.count + 2,
    //   });
    // }, 1);
    new Promise((resolve) => {
      resolve(2);
    }).then((res) => {
      this.setState({
        count: this.state.count + res,
      });
      this.setState({
        count: this.state.count + res,
      });
    });
  };

  render() {
    console.log("------------");
    const { count } = this.state;
    return (
      <div>
        {count}
        <button onClick={this.handleAdd1}>add1</button>
        <button onClick={this.handleAdd2}>add2</button>
      </div>
    );
  }
}
