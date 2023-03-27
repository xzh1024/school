import React, { Component, createRef } from "react";

export default class App extends Component {
  a = 100;

  myRef = createRef();

  render() {
    return (
      <div>
        {/* <input ref="mytext"></input> */}
        <input ref={this.myRef}></input>
        <button
          onClick={() => {
            // console.log("click1", this.refs.mytext.value);
            console.log("click1", this.myRef.current.value);
          }}
        >
          add1
        </button>
        <button onClick={this.handleClick2}>add2</button>
      </div>
    );
  }

//   handleClick2() {
//     console.log("click2", this.myRef.current.value);
//   }
  handleClick2 = () => {
    console.log("click2", this.myRef.current.value);
  };
}
