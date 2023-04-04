import React, { useEffect, useState } from 'react';
import store from '../redux/store';
import { getCinemaListAction } from '../redux/actionCreator/getCinemaListAction';

export default function Cinemas(props) {
  const [cityName] = useState(store.getState().CityReducer.cityName);

  const [cinemaList, setCinemaList] = useState(
    store.getState().CinemaListReducer.list
  );

  useEffect(() => {
    if (cinemaList.length === 0) {
      // 去后台取数据
      store.dispatch(getCinemaListAction());
    } else {
      console.log('store 缓存');
    }
    // 订阅
    const unsubscribe = store.subscribe(() => {
      console.log('Cinema 中订阅');
      setCinemaList(store.getState().CinemaListReducer.list);
    });

    return () => {
      // 组件销毁时 取消订阅
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{ float: 'left' }}
          onClick={() => props.history.push('./city')}
        >
          Cinemas-{cityName}
        </div>
        <div
          style={{ float: 'right' }}
          onClick={() => props.history.push('/cinemas/search')}
        >
          搜索
        </div>
      </div>
      <ul>
        {cinemaList.map((item) => (
          <dl
            key={item.cinemaId}
            style={{
              padding: '10px',
            }}
          >
            <dt>{item.name}</dt>
            <dd style={{ fontSize: '12px', color: 'gray' }}>{item.address}</dd>
          </dl>
        ))}
      </ul>
    </div>
  );
}
