import React, { Component } from 'react';

export default class App extends Component {
  state = {
    text: '',
    list: ['111', '222', '333']
  };
  render() {
    return (
      <div>
        <h2>kerwin-todo</h2>

        <input
          value={this.state.text}
          onChange={(evt) => {
            this.setState({
              ...this.state,
              text: evt.target.value
            });
            console.log(evt.target);
          }}
        />
        <button
          className="add"
          onClick={() =>
            this.setState({
              list: [...this.state.list, this.state.text],
              text: ''
            })
          }
        >
          add
        </button>

        <ul>
          {this.state.list.map((item, index) => (
            <li key={item}>
              {item}
              <button
                className="delete"
                onClick={() => {
                  const newList = [...this.state.list];
                  newList.splice(index, 1);
                  this.setState({
                    ...this.state,
                    list: newList
                  });
                }}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
