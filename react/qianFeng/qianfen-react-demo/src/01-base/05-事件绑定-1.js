import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    console.log(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  a = "aaa";

  handleClick2() {
    console.log(this);
    console.log(this.a);
    console.log("click2");
  }
  handleClick3 = () => {
    console.log(this);
    console.log(this.a);
    console.log("click3");
  };
  handleClick4() {
    console.log(this);
    console.log("click4");
  }
  handleClick5() {
    console.log(this); // undefined
    console.log("click5");
  }

  render() {
    return (
      <div>
        <input />
        <button
          onClick={() => {
            console.log(this);
            console.log("click1");
          }}
        >
          add1
        </button>
        <button onClick={this.handleClick2}>add2</button>
        <button onClick={this.handleClick3}>add3</button>
        <button onClick={() => this.handleClick4()}>add4</button>
        <button onClick={this.handleClick5}>add5</button>
      </div>
    );
  }
}
