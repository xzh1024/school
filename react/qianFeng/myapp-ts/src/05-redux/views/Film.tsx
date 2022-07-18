import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Swiper } from 'antd-mobile';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
const ref = React.createRef<SwiperRef>();
interface IState {
  list: IItem[];
}
interface IItem {
  filmId: number;
  name: string;
}
class Film extends Component<RouteComponentProps, IState> {
  state = {
    list: [],
  };
  componentDidMount() {
    axios({
      url: 'https://m.maizuo.com/gateway',
      params: {
        cityId: 110100,
        pageNum: 1,
        pageSize: 10,
        type: 1,
        k: 376980,
      },
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16556233951665077216280577"}',
        'X-Host': 'mall.film-ticket.film.list',
      },
    }).then((res) => {
      if (res.data && res.data.data && res.data.data.films) {
        console.log(res.data.data.films);
        this.setState({
          list: res.data.data.films,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Swiper allowTouchMove={false} ref={ref} loop>
          <Swiper.Item>1</Swiper.Item>
          <Swiper.Item>2</Swiper.Item>
          <Swiper.Item>3</Swiper.Item>
        </Swiper>
        <Button
          color="danger"
          onClick={() => {
            ref.current?.swipePrev();
          }}
        >
          上一个
        </Button>
        <Button
          color="primary"
          onClick={() => {
            ref.current?.swipeNext();
          }}
        >
          下一个
        </Button>
        <ul>
          {this.state.list.map((item: IItem) => (
            <li
              key={item.filmId}
              onClick={() => {
                this.props.history.push(`/detail/${item.filmId}`);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Film;
