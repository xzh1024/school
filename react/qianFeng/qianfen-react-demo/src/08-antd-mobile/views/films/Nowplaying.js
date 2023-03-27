import React, { useRef, useState } from 'react';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
import { InfiniteScroll, List, Image, Toast } from 'antd-mobile';

export default function Nowplaying(props) {
  const [list, setlist] = useState([]);
  const count = useRef(0);
  const getList = () => {
    setHasMore(false);
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration: 0,
    });
    axios({
      // url: 'https://m.maizuo.com/gateway?cityId=510100&pageNum=1&pageSize=10&type=1&k=9058537',
      url: 'https://m.maizuo.com/gateway',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16556233951665077216280577"}',
        'X-Host': 'mall.film-ticket.film.list',
      },
      params: {
        cityId: 510100,
        pageNum: ++count.current,
        pageSize: 10,
        type: 1,
        k: 9058537,
      },
    })
      .then((res) => {
        console.log(res);
        toast.close();
        if (res && res.data && res.data.data && res.data.data.films) {
          if (count.current === 1) {
            setlist(res.data.data.films);
          } else {
            setlist([...list, ...res.data.data.films]);
          }
          if (res.data.data.films.length) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      })
      .catch(() => {
        toast.close();
        setHasMore(true);
      });
  };

  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    console.log('到底了');

    getList();
    // const append = await mockRequest();
    // setlist((val) => [...val, ...append]);
    // setHasMore(append.length > 0);
  }

  return (
    <>
      <List>
        {list &&
          list.map((item) => (
            <List.Item
              onClick={() => props.history.push(`/detail/${item.filmId}`)}
              key={item.filmId}
              prefix={
                <Image
                  src={item.poster}
                  style={{ borderRadius: 0 }}
                  fit="cover"
                  width={66}
                  height={92}
                />
              }
              description={
                <div>
                  <div>
                    观众评分{' '}
                    <span style={{ color: '#ffb232' }}>{item.grade}</span>
                  </div>
                  <div>
                    主演：
                    {item.actors &&
                      item.actors.map((item) => item.name).join(' ')}
                  </div>
                  <div>{`${item.nation} | ${item.runtime}分钟`}</div>
                </div>
              }
            >
              {item.name}
            </List.Item>
          ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
}
