import { connect } from "dva";
import React, { Component } from "react";
// import Tabbar from "@/components/Tabbar";
import Tabbar from "../components/Tabbar";

class App extends Component {
  render() {
    return (
      <div>
        App
        {this.props.children}
        {this.props.isShow && <Tabbar />}
      </div>
    );
  }
}

export default connect((state) => {
  console.log(state);
  return {
    isShow: state.maizuo.isShow,
  };
})(App);
