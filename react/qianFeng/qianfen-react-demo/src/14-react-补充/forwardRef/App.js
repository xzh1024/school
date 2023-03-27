import React, { Component } from 'react';

export default class App extends Component {
  myText = null;
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.myText.current.focus();
            this.myText.current.value = '';
          }}
        >
          获取焦点
        </button>
        <Child
          callback={(el) => {
            console.log(el);
            this.myText = el;
          }}
        />
      </div>
    );
  }
}

class Child extends Component {
  myText = React.createRef();
  componentDidMount() {
    console.log(this.myText);
    this.props.callback(this.myText);
  }
  render() {
    return (
      <div style={{ background: 'yellow' }}>
        <input defaultValue="1111" ref={this.myText} />
      </div>
    );
  }
}
