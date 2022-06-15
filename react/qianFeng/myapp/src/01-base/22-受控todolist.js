import React, { Component } from "react";
import "./css/01-index.css";

export default class App extends Component {
  state = {
    value: "",
    list: [
      {
        text: "aaa",
        isChecked: false,
      },
      {
        text: "bbb",
        isChecked: false,
      },
      {
        text: "ccc",
        isChecked: true,
      },
    ],
  };

  render() {
    return (
      <div>
        <input value={this.state.value} onChange={this.handleChange}></input>
        <button onClick={this.handleAdd}>add</button>
        <button onClick={this.handleClear}>清除</button>

        <ul>
          {this.state.list.map((item, index) => (
            <li key={index}>
              <input type="checkbox" checked={item.isChecked} readOnly />
              {/* 富文本展示 */}
              <span
                className={item.isChecked ? "line-through" : ""}
                dangerouslySetInnerHTML={{
                  __html: item.text,
                }}
              ></span>
              <button onClick={() => this.handleFinished(index)}>完成</button>
              <button onClick={() => this.handleDelete(index)}>删除</button>
            </li>
          ))}
        </ul>
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
    const value = this.state.value;
    if (value) {
      this.setState({
        list: [...this.state.list, { text: value, isChecked: false }],
        value: "",
      });
    }
  };

  handleClear = () => {
    this.setState({
      value: "",
    });
  };

  handleDelete = (index) => {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list,
    });
  };

  handleFinished = (index) => {
    const newList = [...this.state.list];
    newList[index].isChecked = !newList[index].isChecked;
    this.setState({
      list: newList,
    });
  };
}
