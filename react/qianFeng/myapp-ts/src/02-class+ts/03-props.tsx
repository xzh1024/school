import React, { Component } from 'react';

interface IProps {
  name: string;
}
class App extends Component {
  state = {
    name: 'hahaha',
  };
  render() {
    return (
      <div>
        app
        <Child name={this.state.name}></Child>
      </div>
    );
  }
}
class Child extends Component<IProps, any> {
  render() {
    return (
      <div>
        child
        <div>{this.props.name}</div>
      </div>
    );
  }
}

export default App;
