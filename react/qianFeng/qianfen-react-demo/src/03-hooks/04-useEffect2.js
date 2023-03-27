import React, { useState, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('kerwin');

  useEffect(() => {
    setName(name.substring(0, 1).toUpperCase() + name.substring(1));
    console.log(name);
  }, [name]);
  // 第一次执行一次，之后name（依赖）更新也会执行
  return (
    <div>
      <div>App-{name}</div>
      <button onClick={() => setName('xiaoming')}>click</button>
    </div>
  );
}
