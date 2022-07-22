import React, { Component, forwardRef } from 'react';

export default class Apo_forwardRef extends Component {
  myText = React.createRef();
  render() {
    return (
      <div>
        Apo_forwardRef
        <button
          onClick={() => {
            this.myText.current.focus();
            this.myText.current.value = '';
          }}
        >
          click
        </button>
        <Child ref={this.myText} />
      </div>
    );
  }
}

const Child = forwardRef((props, ref) => {
  return (
    <div style={{ background: 'red' }}>
      <input defaultValue="11111" ref={ref} />
    </div>
  );
});
