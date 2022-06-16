import React, { Component } from "react";
import "./css/02-maizou.css";
import Film from "./maiZuoComponent/Film";
import Cinema from "./maiZuoComponent/Cinema";
import Center from "./maiZuoComponent/Center";
import Tabbar from "./maiZuoComponent/Tabbar";
import Navbar from "./maiZuoComponent/Navbar";

export default class App extends Component {
  state = {
    current: 0,
    list: [
      {
        id: 1,
        text: "电影",
      },
      {
        id: 2,
        text: "影院",
      },
      {
        id: 3,
        text: "我的",
      },
    ],
  };

  changeCurrent = (index) => {
    this.setState({
      current: index,
    });
  };

  render() {
    return (
      <div>
        <Navbar changeCurrent={this.changeCurrent}></Navbar>
        {this.state.current === 0 && <Film></Film>}
        {this.state.current === 1 && <Cinema></Cinema>}
        {this.state.current === 2 && <Center></Center>}
        <Tabbar
          current={this.state.current}
          list={this.state.list}
          changeCurrent={this.changeCurrent}
        ></Tabbar>
      </div>
    );
  }
}
