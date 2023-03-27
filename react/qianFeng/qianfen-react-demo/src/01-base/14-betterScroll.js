import React, { Component } from "react";
import BetterScroll from "better-scroll";

export default class App extends Component {
  state = {
    list: [],
    page: 1,
    pageSize: 10,
  };

  // componentDidMount() {
  //   let bs = new BetterScroll(".kerwinWrapper", {
  //     movable: true,
  //     zoom: true,
  //   });
  // }
  getData = () => {
    const { page, pageSize } = this.state;
    const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    console.log(page - 1, " ", page * pageSize);

    let endSize = page * pageSize;
    if (endSize > datas.length) {
      endSize = datas.length;
    }
    let list = datas.slice((page - 1) * pageSize, endSize);

    if (page > 1) {
      list = [...this.state.list, ...list];
    }
    this.setState(
      {
        list,
        page: page + 1,
      },
      () => {
        new BetterScroll(".kerwinWrapper", {
          movable: true,
          zoom: true,
        });
      }
    );
  };
  render() {
    const { list } = this.state;
    return (
      <div>
        <button onClick={this.getData}>click</button>
        <div
          className="kerwinWrapper"
          style={{
            height: "200px",
            overflow: "hidden",
            backgroundColor: "yellow",
          }}
        >
          <ul className="kerwinContent">
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
