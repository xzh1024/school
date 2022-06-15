import React, { Component } from "react";

class Navbar extends Component {
  handleClick = () => {
    this.props.changeIsShow();
  };
  render() {
    console.log(this);
    return (
      <div style={{ background: "red" }}>
        <button onClick={this.handleClick}>
          {this.props.isShow ? "隐藏" : "显示"}
        </button>
        <span>navbar</span>
      </div>
    );
  }
}

class Sidebar extends Component {
  render() {
    return (
      <div style={{ background: "yellow", width: "200px" }}>
        <ul>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
        </ul>
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    isShow: true,
  };

  changeIsShow = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };

  render() {
    return (
      <div>
        <Navbar
          isShow={this.state.isShow}
          changeIsShow={this.changeIsShow}
        ></Navbar>
        {this.state.isShow && <Sidebar isShow={this.state.isShow}></Sidebar>}
      </div>
    );
  }
}
