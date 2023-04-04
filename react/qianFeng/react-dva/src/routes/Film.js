import React, { Component } from "react";
import request from "../utils/request";

export default class Film extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    request(
      "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=485752",
      {
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"16556233951665077216280577"}',
          "X-Host": "mall.film-ticket.film.list",
        },
      }
    )
      .then((result) => {
        console.log(result.data.data);
        this.setState({
          list: result.data.data.films || [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    console.log(this.state.list);
    return (
      <div>
        {this.state.list.map((item) => (
          <div
            key={item.filmId}
            onClick={() => {
              // this.props.history.push({
              //   pathname: "/detail",
              //   myId: item.filmId,
              // });
              this.props.history.push(`/detail/${item.filmId}`);
            }}
          >
            <img
              src={item.poster}
              alt={item.name}
              style={{ width: "100px" }}
            ></img>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    );
  }
}
