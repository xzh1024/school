import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('id'));
  useEffect(() => {
    // 获取参数
    // console.log(searchParams.get('id'));
    // 判断参数是否存在
    console.log(searchParams.has('id'));
    // 页面内也可以用set方法来改变路由
    // setSearchParams({ id: 1000 });
  }, []);
  return (
    <div>
      Detail
      <button
        onClick={() => {
          setSearchParams({ id: 1000 });
        }}
      >
        猜你喜欢
      </button>
    </div>
  );
}
