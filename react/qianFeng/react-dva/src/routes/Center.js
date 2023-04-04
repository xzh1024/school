import { withRouter } from "dva/router";
import React, { Component } from "react";
import request from "../utils/request";

export default class Center extends Component {
  componentDidMount() {
    request(
      "/api/mmdb/movie/v3/list/hot.json?ct=%E6%88%90%E9%83%BD&ci=59&channelId=4"
    )
      .then((res) => {
        console.log(res);
        const list = res.data.data.hot;
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
      });

    request("/users")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        Center
        <WithChild />
      </div>
    );
  }
}

class Child extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            console.log(this.props);
            localStorage.removeItem("token");
            this.props.history.push("/login");
          }}
        >
          退出登录
        </button>
      </div>
    );
  }
}

const WithChild = withRouter(Child);
