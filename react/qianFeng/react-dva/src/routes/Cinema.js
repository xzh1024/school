import { connect } from "dva";
import React, { Component } from "react";

export class Cinema extends Component {
  componentDidMount() {
    console.log(this.props);
    if (this.props.list.length === 0) {
      //dispatch
      this.props.dispatch({
        type: "maizuo/getCinemaList",
      });
    } else {
      console.log("缓存", this.props.list);
    }
  }
  render() {
    return (
      <div>
        Cinema
        {this.props.list.map((item) => (
          <div key={item.cinemaId}>{item.name}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.maizuo.list,
});

export default connect(mapStateToProps)(Cinema);
