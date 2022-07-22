import React, { Component, memo } from 'react';

export default class App extends Component {
  state = {
    name: 'zhangsan',
    title: 'aaa',
  };
  render() {
    return (
      <div>
        {this.state.name}
        <button
          onClick={() =>
            this.setState({
              name: 'xiaoming',
            })
          }
        >
          click
        </button>
        <button
          onClick={() =>
            this.setState({
              title: 'bbb',
            })
          }
        >
          click2
        </button>
        <Child title={this.state.title}></Child>
      </div>
    );
  }
}

const Child = memo(() => {
  console.log('Child-1111');
  return <div>Child</div>;
});
