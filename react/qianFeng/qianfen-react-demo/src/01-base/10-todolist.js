import React, { Component, createRef } from "react";
import "./css/01-index.css";

export default class App extends Component {
  myRef = createRef();
  state = {
    value: "",
    list: ["aa", "bb", "cc"],
  };

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={this.handleChange}
          ref={this.myRef}
        ></input>
        <button onClick={this.handleAdd}>add</button>

        <ul>
          {this.state.list.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => this.handleDelete(index)}>删除</button>
            </li>
          ))}
        </ul>
        {/* {this.state.list.length ? null : "暂无待办事项"} */}
        <div className={this.state.list.length && "hidden"}>暂无待办事项</div>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleAdd = () => {
    const value = this.myRef.current.value;
    if (value) {
      this.setState({
        list: [...this.state.list, value],
        value: "",
      });
    }
  };

  handleDelete = (index) => {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list,
    });
  };
}
