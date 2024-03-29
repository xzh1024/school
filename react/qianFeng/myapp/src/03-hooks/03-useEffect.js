import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*
  你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。
  我们统一把这些操作称为“副作用”，或者简称为“作用”。
*/
export default function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get('/test.json').then((res) => {
      setList(res.data);
      console.log(list);
    });
  }, []); // 第二个参数：依赖的状态；空数组，代表不依赖

  const [count, setCount] = useState(0);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <div>app</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
      <div>{count}</div>

      <ul>
        {list.map((item) => (
          <li key={item.filmId}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
