import React, { Component } from "react";
import Navbar from "./Navbar/index";

export default class App extends Component {
  render() {
    return (
      <div>
        App
        <Navbar id={1}></Navbar>
      </div>
    );
  }
}
