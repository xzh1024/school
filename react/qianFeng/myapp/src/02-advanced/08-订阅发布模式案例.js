import React, { Component } from "react";
import axios from "axios";
import "./css/03-communication.scss";

// 调度中心
const bus = {
  list: [],
  // 订阅
  subscribe(callback) {
    this.list.push(callback);
  },
  // 发布
  publish(value) {
    // 遍历所有的list，将回调函数执行
    this.list.forEach((cb) => cb && cb(value));
  },
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      filmList: [],
    };

    axios.get("./test.json").then((res) => {
      this.setState({
        filmList: res.data || [],
      });
    });
  }

  render() {
    const { filmList } = this.state;
    return (
      <div>
        <div>
          {filmList.map((item) => (
            <FilmItem key={item.filmId} {...item} data={item}></FilmItem>
          ))}
        </div>
        <FilmDetail></FilmDetail>
      </div>
    );
  }
}

class FilmItem extends Component {
  render() {
    return (
      <div
        className="film-item clearfix"
        onClick={() => {
          bus.publish(this.props.data);
        }}
      >
        <div>{this.props.data.name}</div>
        <img className="film-img" src={this.props.data.poster} alt="" />
      </div>
    );
  }
}

class FilmDetail extends Component {
  constructor() {
    super();
    this.state = {
      filmInfo: {},
    };
    const _this = this;
    bus.subscribe((data) => {
      _this.setState({
        filmInfo: data,
      });
      console.log("我在FilmDetail中定义");
    });
  }

  render() {
    return (
      <div className="film-detail">
        <div>film-detail</div>
        <div>{this.state.filmInfo.name}</div>
      </div>
    );
  }
}
