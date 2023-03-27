import React, { Component } from "react";
import axios from "axios";

export default class Cinema extends Component {
  constructor() {
    super();
    // 请求数据
    this.state = {
      keyword: "",
      cinemaList: [],
      // backCinemaList: [],
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
        if (res.data.status === 0) {
          const data = res.data.data;
          this.setState({
            cinemaList: data.cinemas || [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCinemaList = () => {
    const { keyword, cinemaList } = this.state;
    return cinemaList.filter((item) => {
      return item.name.includes(keyword) || item.address.includes(keyword);
    });
  };

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  handleClear = () => {
    this.setState({
      keyword: "",
    });
  };

  render() {
    return (
      <div>
        <input value={this.state.keyword} onChange={this.handleChange} />
        <button onClick={this.handleClear}>清空</button>
        {this.getCinemaList().map((item) => (
          <dl className="cinema-item" key={item.cinemaId}>
            <dt>{item.name}</dt>
            <dd>{item.address}</dd>
          </dl>
        ))}
      </div>
    );
  }
}
