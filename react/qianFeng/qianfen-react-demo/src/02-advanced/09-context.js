import React, { Component } from 'react';
import axios from 'axios';
import './css/03-communication.scss';

const GlobaContext = React.createContext();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      filmList: [],
      filmInfo: {}
    };

    axios.get('./test.json').then((res) => {
      console.log(res.data);
      this.setState({
        filmList: res.data || []
      });
    });
  }

  changeFilmInfo = (item) => {
    this.setState({
      filmInfo: item
    });
  };

  render() {
    const { filmList } = this.state;
    return (
      // 供应者
      <GlobaContext.Provider
        value={{
          call: '打电话',
          sms: '短信',
          info: this.state.filmInfo,
          changeInfo: this.changeFilmInfo
        }}
      >
        <div>
          <div>
            {filmList.map((item) => (
              <FilmItem key={item.filmId} data={item}></FilmItem>
            ))}
          </div>
          {this.state.filmInfo && (
            <FilmDetail data={this.state.filmInfo}></FilmDetail>
          )}
        </div>
      </GlobaContext.Provider>
    );
  }
}

class FilmItem extends Component {
  render() {
    return (
      // 消费者，顾客，用户；使用者，消耗者
      <GlobaContext.Consumer>
        {(value) => (
          <div
            className="film-item clearfix"
            onClick={() => value.changeInfo(this.props.data)}
          >
            <h3>{value.sms}</h3>
            <div>{this.props.data.name}</div>
            <img className="film-img" src={this.props.data.poster} alt="" />
          </div>
        )}
      </GlobaContext.Consumer>
    );
  }
}

class FilmDetail extends Component {
  render() {
    return (
      <GlobaContext.Consumer>
        {(datas) => {
          console.log(datas);
          return (
            <div className="film-detail">
              {/* <div>{this.props.data.name}</div> */}
              <div>{datas.info.name}</div>
              <img className="film-img" src={this.props.data.poster} alt="" />
            </div>
          );
        }}
      </GlobaContext.Consumer>
    );
  }
}
