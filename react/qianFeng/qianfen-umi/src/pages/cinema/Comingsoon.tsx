import { useEffect, useState } from 'react';

export default function Comingsoon() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(
      '/api/mmdb/movie/v3/list/hot.json?ct=%E6%88%90%E9%83%BD&ci=59&channelId=4'
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res.data.hot);
        setList(res.data.hot);
      });
  }, []);
  return (
    <div>
      Comingsoon
      {list.map((item: any) => (
        <div key={item.id}>
          <img src={item.img} style={{ height: '100px' }} />
          <p>{item.nm}</p>
        </div>
      ))}
    </div>
  );
}
