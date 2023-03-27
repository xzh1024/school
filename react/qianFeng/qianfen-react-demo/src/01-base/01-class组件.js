import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sub from "./03-组件的嵌套";

class App extends React.Component {
  name = "hahaha";
  constructor() {
    super();
    this.state = {
      title: "测试",
      subName: "sub",
    };
    console.log(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      title: "测试测试",
    });
  }

  render() {
    console.log(this);
    return (
      <div>
        Hello React {this.state.title}
        <Sub name={this.state.subName}>
            <h3>666</h3>
        </Sub>
      </div>
    );
  }
}

export default App;
