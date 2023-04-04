import { connect } from "dva";
import React, { Component } from "react";

class Detail extends Component {
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.match.params.myId);
    this.props.dispatch({
      type: "maizuo/hide"
    })
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: "maizuo/show"
    })
  }
  render() {
    return <div>Detail</div>;
  }
}

export default connect()(Detail);
