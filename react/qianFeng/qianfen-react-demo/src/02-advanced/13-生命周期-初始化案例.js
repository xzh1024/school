import React, { Component } from "react";
import BetterScroll from "better-scroll";

export default class App extends Component {
  state = {
    list: [
      "111",
      "222",
      "333",
      "444",
      "555",
      "666",
      "777",
      "888",
      "999",
      "000",
      "121",
      "123",
      "124",
      "125",
    ],
  };

  componentDidMount() {
    console.log(document.querySelectorAll("li"));

    const bScroll = new BetterScroll("#wrapper", {
      probeType: 3,
      mouseWheel: true,
      // movable: true,
      // zoom: true,
    });
    bScroll.on("scroll", (position) => {
      console.log(position);
    });
  }

  render() {
    return (
      <div>
        <div id="wrapper" style={{ height: "200px", overflow: "hidden" }}>
          <div>
            {this.state.list.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
