import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "收藏",
      show: false,
    };
  }
  //   state = {
  //     text: "收藏",
  //   };

  handleClick = () => {
    console.log(this.state);
    this.setState(
      {
        //   ...this.state,
        text: this.state.text === "收藏" ? "取消收藏" : "收藏",
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <div>
        <h2>欢迎来到react开发</h2>
        <button onClick={this.handleClick}>{this.state.text}</button>
      </div>
    );
  }
}
