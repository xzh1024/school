import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

export default class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list: ['111', '222', '333'],
      });
      new Swiper('.swiper', {
        autoplay: 3000,
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
      });
    }, 0);
  }

  // componentDidUpdate() {
  //   new Swiper('.swiper', {
  //     autoplay: 3000,
  //     loop: true, // 循环模式选项
  //   });
  // }

  render() {
    return (
      <div>
        <div
          className="swiper"
          style={{
            width: '600px',
            height: '200px',
            backgroundColor: 'red',
          }}
        >
          <div className="swiper-wrapper">
            {this.state.list.map((item, index) => (
              <div className="swiper-slide" key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
