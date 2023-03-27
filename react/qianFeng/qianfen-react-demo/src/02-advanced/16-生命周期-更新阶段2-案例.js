import React, { Component } from "react";

class Box extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      this.props.current === this.props.index ||
      nextProps.current === nextProps.index
    ) {
      return true;
    }
    return false;
  }

  render() {
    console.log(this.props.index);
    return (
      <div
        style={{
          width: "100px",
          height: "100px",
          border: "1px solid gray",
          borderColor: this.props.index === this.props.current ? "red" : "gray",
          margin: "10px",
          float: "left",
        }}
      >
        {this.props.data}
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    current: 2,
    list: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
  };

  render() {
    return (
      <div>
        <input
          type="number"
          value={this.state.current}
          onChange={(event) =>
            this.setState({
              current: event.target.value ? Number(event.target.value) : "",
            })
          }
        ></input>

        <div style={{ overflow: "hidden" }}>
          {this.state.list.map((item, index) => (
            <Box
              key={index}
              data={item}
              index={index}
              current={this.state.current}
            ></Box>
          ))}
        </div>
      </div>
    );
  }
}
