import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

export default class App extends Component {
  state = {
    list: ['111', '222', '333'],
  };

  componentDidMount() {
    console.log(Swiper);
    new Swiper('.swiper', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项
      autoplay: 3000,
    });
  }

  render() {
    return (
      <div>
        <div
          className="swiper"
          style={{
            width: '600px',
            height: '200px',
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
