import React, { Component } from "react";
import axios from "axios";
import BetterScroll from "better-scroll";

export default class App extends Component {
  state = {
    myName: "aaa",
    list: [],
    bs: null,
  };

  componentDidMount() {
    axios.get("/test.json").then((res) => {
      console.log(res.data);
      this.setState({
        list: res.data || [],
      });
    });

    new BetterScroll("#wrapper", {
      probeType: 3,
      mouseWheel: true,
    });
  }

  UNSAFE_componentWillUpdate() {
    console.log("更新前");
    console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("更新后");
    console.log("旧的props:", prevProps);
    console.log("旧的state:", prevState);
    console.log(this.state);
    // 更新后，想要获取dom节点，更新

    if (prevState.list.length === 0) {
      new BetterScroll("#wrapper", {
        probeType: 3,
        mouseWheel: true,
      });
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              myName: "bbb",
            });
          }}
        >
          click
        </button>
        <h3>{this.state.myName}</h3>

        <div id="wrapper" style={{ height: "200px", overflow: "hidden" }}>
          <div>
            {this.state.list.map((item) => (
              <div key={item.filmId}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
