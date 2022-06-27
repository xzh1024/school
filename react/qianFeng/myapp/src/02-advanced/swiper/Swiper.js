import React, { Component } from 'react';
// import Swiper from 'swiper';
// import 'swiper/css';
import Swiper from 'swiper/js/swiper';
import 'swiper/css/swiper.min.css';

export default class KSwiper extends Component {
  // state = {
  //   list: [],
  // };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       list: ['111', '222', '333'],
  //     });
  //     new Swiper('.swiper', {
  //       autoplay: 3000,
  //       // direction: 'vertical', // 垂直切换选项
  //       loop: true, // 循环模式选项
  //     });
  //   }, 0);
  // }

  componentDidUpdate() {
    new Swiper('.swiper-container', {
      autoplay: true,
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div
          className="swiper-container"
          style={{
            width: '600px',
            height: '200px',
          }}
        >
          <div className="swiper-wrapper">
            {/* <div className="swiper-slide">111</div>
            <div className="swiper-slide">222</div>
            <div className="swiper-slide">333</div> */}
            {this.props.children}
          </div>
          {/* <!-- 如果需要分页器 --> */}
          <div className="swiper-pagination"></div>

          {/* <!-- 如果需要导航按钮 --> */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

          {/* <!-- 如果需要滚动条 --> */}
          <div className="swiper-scrollbar"></div>
        </div>
      </div>
    );
  }
}
