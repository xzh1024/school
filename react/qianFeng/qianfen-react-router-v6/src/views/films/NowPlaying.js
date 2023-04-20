import React, { useEffect, useState } from 'react';
import FilmItem from './FilmItem';

export default function NowPlaying() {
  const [list, setList] = useState([]);

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
        <FilmItem key={item.filmId} item={item} />
      ))}
    </div>
  );
}
