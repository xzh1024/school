import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export default function Nowplaying(props) {
  const [list, setlist] = useState([]);
  useEffect(() => {
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
        pageNum: 1,
        pageSize: 10,
        type: 1,
        k: 9058537,
      },
    }).then((res) => {
      console.log(res);
      setlist(res.data.data.films);
    });
  }, []);

  return (
    <div>
      <ul>
        {list.map((item) => (
          // <li key={item.filmId} onClick={() => handleChangePage(item.filmId)}>
          //   {/* <NavLink to={'/detail' + item.filmId}>{item.name}</NavLink> */}
          //   {item.name}
          // </li>
          <WithFilmItem key={item.filmId} {...item}>
            {item.name}
          </WithFilmItem>
        ))}
      </ul>
    </div>
  );
}

function FilmItem(props) {
  return (
    <li
      onClick={() => {
        props.history.push(`/detail/${props.filmId}`);
      }}
    >
      {props.name}
    </li>
  );
}

const WithFilmItem = withRouter(FilmItem);
