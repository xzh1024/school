import React, { Component } from "react";
import axios from "axios";
import "./css/03-communication.scss";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      filmList: [],
      filmInfo: null,
    };

    axios.get("./test.json").then((res) => {
      console.log(res.data);
      this.setState({
        filmList: res.data || [],
      });
    });
  }

  handleClick = (item) => {
    this.setState({
      filmInfo: item,
    });
  };

  render() {
    const { filmList } = this.state;
    return (
      <div>
        <div>
          {filmList.map((item) => (
            <FilmItem
              key={item.filmId}
              {...item}
              data={item}
              handleClick={this.handleClick}
            ></FilmItem>
          ))}
        </div>
        {this.state.filmInfo && (
          <FilmDetail data={this.state.filmInfo}></FilmDetail>
        )}
      </div>
    );
  }
}

class FilmItem extends Component {
  render() {
    console.log(this.props);
    return (
      <div
        className="film-item clearfix"
        onClick={() => this.props.handleClick(this.props.data)}
      >
        <div>{this.props.data.name}</div>
        <img className="film-img" src={this.props.data.poster} alt="" />
      </div>
    );
  }
}

class FilmDetail extends Component {
  render() {
    return (
      <div className="film-detail">
        <div>{this.props.data.name}</div>
        <img className="film-img" src={this.props.data.poster} alt="" />
      </div>
    );
  }
}
