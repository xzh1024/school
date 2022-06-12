import React, { Component } from "react";
import "./css/02-maizou.css";
import Film from "./maiZuoComponent/Film";
import Cinema from "./maiZuoComponent/Cinema";
import Center from "./maiZuoComponent/Center";

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

  handleClick = (index) => {
    this.setState({
      current: index,
    });
  };

  render() {
    return (
      <div>
        {this.state.current === 0 && <Film></Film>}
        {this.state.current === 1 && <Cinema></Cinema>}
        {this.state.current === 2 && <Center></Center>}
        <ul>
          {this.state.list.map((item, index) => (
            <li
              key={item.id}
              className={this.state.current === index ? "active" : ""}
              onClick={() => {
                this.handleClick(index);
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
