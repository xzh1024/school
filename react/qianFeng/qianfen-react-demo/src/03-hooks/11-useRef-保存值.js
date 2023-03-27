import React, { useRef, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const count2 = useRef(0);

  let count3 = 0;
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
          count2.current++;
          count3++;
        }}
      >
        add
      </button>
      <div>useState：{count}</div>
      <div>useRef：{count2.current}</div>
      <div>普通变量：{count3}</div>
    </div>
  );
}
