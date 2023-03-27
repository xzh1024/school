import React, { Component } from "react";

class Child extends Component {
  handleClick = () => {
    this.props.update(777);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <h3>Child</h3>
        <div>{this.props.text}</div>
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    text: "1111111111",
  };

  handleClick = (data) => {
    console.log(666);
    console.log(data);
  }

  render() {
    return (
      <div>
        <Child text={this.state.text} update={this.handleClick}></Child>
      </div>
    );
  }
}
