import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmItem from './FilmItem';

export default function NowPlaying() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const handleChangePage = useCallback(
    (item) => {
      console.log(item);
      // 跳转页面
      // navigate(`/detail?id=${item.filmId}`);
      navigate(`/detail/${item.filmId}`);

      // query（URLSearch）传参 /detail?id=1000
      // 路由传参 /detail/1000
    },
    [navigate]
  );

  useEffect(() => {
    fetch(
      'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=6929659',
      {
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"16556233951665077216280577","bc":"110100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res && res.msg === 'ok') {
          setList(res.data.films);
        }
      });
  }, []);

  return (
    <div>
      NowPlaying
      {list.map((item) => (
        <div key={item.filmId} onClick={() => handleChangePage(item)}>
          {item.name}
        </div>
      ))}
      {list.map((item) => (
        <FilmItem key={item.filmId} item={item} />
      ))}
    </div>
  );
}
