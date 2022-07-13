import React, { useEffect, useState } from 'react';
// import { autorun } from 'mobx';
import store from '../mobx/store';
import { Observer } from 'mobx-react';
// import { getCinemaListAction } from '../redux/actionCreator/getCinemaListAction';

export default function Cinemas(props) {
  // const [cinemaList, setCinemaList] = useState([]);

  useEffect(() => {
    if (store.list.length === 0) {
      store.getList();
    }
    // const unsubscribe = autorun(() => {
    //   console.log(store.list, store.isTabbarShow);
    //   setCinemaList(store.list);
    // });
    return () => {
      // 组件销毁时 取消订阅
      // unsubscribe();
    };
  }, []);

  return (
    <div>
      <Observer>
        {() => {
          return store.list.map((item) => (
            <dl
              key={item.cinemaId}
              style={{
                padding: '10px',
              }}
            >
              <dt>{item.name}</dt>
              <dd style={{ fontSize: '12px', color: 'gray' }}>
                {item.address}
              </dd>
            </dl>
          ));
        }}
      </Observer>
    </div>
  );
}
