import React, { Component } from "react";
import axios from "axios";

export default class Cinema extends Component {
  constructor() {
    super();
    // 请求数据
    this.state = {
      cinemaList: [],
      backCinemaList: [],
    };
  }

  componentDidMount() {
    // 当组件输出到 DOM 后会执行 componentDidMount() 钩子
    this.getList();
  }

  getList = () => {
    axios({
      method: "get",
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7964413",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16551164151371705180160001","bc":"110100"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    })
      .then((res) => {
        console.log(res.data.data.cinemas);
        if (res.data.status === 0) {
          const data = res.data.data;
          this.setState(
            {
              cinemaList: data.cinemas || [],
              backCinemaList: data.cinemas || [],
            },
            () => {
              // this.filterList();
              console.log(this.state);
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  filterList = (keyword = "") => {
    const { backCinemaList } = this.state;
    let newList = [];
    if (keyword) {
      newList = backCinemaList.filter((item) => {
        return item.name.includes(keyword) || item.address.includes(keyword);
      });
    } else {
      newList = backCinemaList || [];
    }
    this.setState({
      cinemaList: newList,
    });
  };

  handleInput = (event) => {
    this.filterList(event.target.value);
  };

  render() {
    const { cinemaList } = this.state;
    console.log("------------");
    console.log(cinemaList);
    return (
      <div>
        <input onInput={this.handleInput} />
        {cinemaList.map((item) => (
          <dl className="cinema-item" key={item.cinemaId}>
            <dt>{item.name}</dt>
            <dd>{item.address}</dd>
          </dl>
        ))}
      </div>
    );
  }
}
