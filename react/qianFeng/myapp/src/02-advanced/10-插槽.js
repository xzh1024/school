import React, { Component } from "react";

class Child extends Component {
  render() {
    console.log(this);
    return (
      <div>
        <h3>child</h3>
        {this.props.children.map((item, index) => {
          return index > 1 ? item : "";
        })}
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <h3>App</h3>
        <Child>
          <div>111</div>
          <p>222</p>
          <p>333</p>
        </Child>
      </div>
    );
  }
}
