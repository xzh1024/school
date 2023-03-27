import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

/*
  useMemo 记忆组件
    useCallback的功能完全可以由useMemo所取代，如果你想通过使用useMemo返回一个记忆函数也是完全可以的。
      useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).
    唯一的区别是：useCallback不会执行第一个参数函数，而是将它返回给你，而useMemo会执行第一个函数并且将函数执行结果返回给你。
*/

export default function Cinema() {
  const [keyword, setkeyword] = useState('');
  const [cinemaList, setcinemaList] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7964413',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16551164151371705180160001","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list',
      },
    })
      .then((res) => {
        if (res.data.status === 0) {
          const data = res.data.data;
          setcinemaList(data.cinemas || []);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword, cinemaList]);

  const handleChange = (event) => {
    setkeyword(event.target.value);
  };

  const handleClear = () => {
    setkeyword('');
  };

  const getCinemaList = useMemo(
    () =>
      cinemaList.filter((item) => {
        return item.name.includes(keyword) || item.address.includes(keyword);
      }),
    [keyword, cinemaList]
  );

  return (
    <div>
      <input value={keyword} onChange={handleChange} />
      <button onClick={handleClear}>清空</button>
      {getCinemaList.map((item) => (
        <dl className="cinema-item" key={item.cinemaId}>
          <dt>{item.name}</dt>
          <dd>{item.address}</dd>
        </dl>
      ))}
    </div>
  );
}
