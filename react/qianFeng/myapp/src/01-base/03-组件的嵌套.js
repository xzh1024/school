import React, { Component } from "react";

class Child extends Component {
  render() {
    return <div>child</div>;
  }
}

function Navbar() {
  return (
    <div>
      <div>NavBar</div>
      <Child></Child>
    </div>
  );
}
const Swiper = () => {
  return <div>Swiper</div>;
};
const Tabbar = () => <div>Tabbar</div>;

class Sub extends Component {
  render() {
    console.log(this);
    return (
      <div>
        <h3>我是子组件 {this.props.name}</h3>
        {this.props.children}
        <Navbar></Navbar>
        <Swiper></Swiper>
        <Tabbar></Tabbar>
      </div>
    );
  }
}

export default Sub;
