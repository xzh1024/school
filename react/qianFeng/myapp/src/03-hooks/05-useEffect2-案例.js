import React, { Component, useState, useEffect } from "react";
import axios from "axios";

function FilmList(props) {
  // state = {
  //   filmList: [],
  // };
  const [filmList, setfilmList] = useState([])

  function getList(type) {
    if (type === 1) {
      axios({
        method: "get",
        url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=8643074",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.0","e":"16556233951665077216280577","bc":"110100"}',
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        const data = res.data;
        if (data.status === 0) {
          const list = data.data.films || [];
          setfilmList(list);
        }
      });
    } else {
      axios({
        method: "get",
        url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=742367",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.0","e":"16556233951665077216280577","bc":"110100"}',
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        const data = res.data;
        if (data.status === 0) {
          const list = data.data.films || [];
          setfilmList(list);
        }
      });
    }
  };

  // componentDidMount() {
  //   this.getList(this.props.type);
  // }
  useEffect(() => {
    getList(props.type);
  }, [props.type])
  

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.type !== this.props.type) {
  //     this.getList(nextProps.type);
  //   }
  // }

    return (
      <div>
        <div>{props.type}</div>
        <div>
          {filmList.map((item) => (
            <div key={item.filmId}>{item.name}</div>
          ))}
        </div>
      </div>
    );
}

export default class App extends Component {
  state = {
    type: 1,
  };

  handleClick(type) {
    this.setState({
      type,
    });
  }

  render() {
    return (
      <div>
        <ul>
          <li onClick={() => this.handleClick(1)}>正在热映</li>
          <li onClick={() => this.handleClick(2)}>即将上映</li>
        </ul>
        <FilmList type={this.state.type}></FilmList>
      </div>
    );
  }
}
