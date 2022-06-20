import React, { Component } from "react";

class Cell extends Component {
  componentWillUnmount() {
    console.log("Cell组件销毁");
  }

  render() {
    return (
      <div>
        <h4>cell</h4>
      </div>
    );
  }
}

class Child extends Component {
  componentDidMount() {
    window.onresize = () => {
      console.log("resize");
    };

    this.timer = setInterval(() => {
      console.log(new Date().getTime());
    }, 2000);
  }

  componentWillUnmount() {
    console.log("Child组件销毁");
    window.onresize = null;
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h3>child</h3>
        <Cell></Cell>
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    isCreated: true,
  };

  componentWillUnmount() {
    console.log("App组件销毁");
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              isCreated: !this.state.isCreated,
            });
          }}
        >
          click
        </button>
        {this.state.isCreated && <Child></Child>}
      </div>
    );
  }
}
