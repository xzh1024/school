import { useEffect, useState } from 'react';
import { history } from 'umi';

export default function Nowplaying() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=7343525',
      {
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"16556233951665077216280577"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res.data.films);
        setList(res.data.films || []);
      });
  }, []);
  return (
    <div>
      Nowplaying
      {list.map((item: any) => (
        <div
          key={item.filmId}
          onClick={() => {
            console.log(history);
            history.push(`/detail/${item.filmId}`);
          }}
        >
          <img src={item.poster} style={{ height: '100px' }} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
