import React, { useEffect, useState, useMemo } from 'react';
import store from '../redux/store';
import { getCinemaListAction } from '../redux/actionCreator/getCinemaListAction';
import './css/search.scss';

export default function Search() {
  const [keyword, setkeyword] = useState('');
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
      console.log('Search 订阅');
      setCinemaList(store.getState().CinemaListReducer.list);
    });

    return () => {
      // 组件销毁时 取消订阅
      unsubscribe();
    };
  }, []);

  const handleChange = (event) => {
    setkeyword(event.target.value);
  };

  const handleClear = () => {
    setkeyword('');
  };

  const getCinemaList = useMemo(
    () =>
      cinemaList.filter((item) => {
        return (
          item.name.toUpperCase().includes(keyword.toUpperCase()) ||
          item.address.toUpperCase().includes(keyword.toUpperCase())
        );
      }),
    [keyword, cinemaList]
  );

  return (
    <div className="search">
      <div className="search-input">
        <input value={keyword} onChange={handleChange} />
        <button onClick={handleClear}>清空</button>
      </div>
      <ul className="search-content">
        {getCinemaList.map((item) => (
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
