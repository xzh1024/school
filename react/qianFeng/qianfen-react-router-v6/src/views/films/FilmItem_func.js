import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FilmItem(props) {
  console.log(props);
  const { item } = props;
  const navigate = useNavigate();
  const handleChangePage = useCallback(() => {
    // 跳转页面
    // navigate(`/detail?id=${item.filmId}`);
    navigate(`/detail/${item.filmId}`);

    // query（URLSearch）传参 /detail?id=1000
    // 路由传参 /detail/1000
  }, []);

  return (
    <div onClick={() => handleChangePage()}>
      <img
        src={item.poster}
        alt=""
        style={{ width: '100px' }}
      />
      {item.name}
    </div>
  );
}
