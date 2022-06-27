import React, { Component } from 'react';
import KSwiper from './swiper/Swiper.js';
import KSwiperItem from './swiper/SwiperItem.js';

export default class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.setState({
      list: ['444', '555', '666'],
    });
  }

  render() {
    return (
      <div>
        <h3>App</h3>
        <KSwiper>
          {this.state.list.map((item, index) => (
            <KSwiperItem key={index}>{item}</KSwiperItem>
          ))}
        </KSwiper>
      </div>
    );
  }
}
