import React, { useRef, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  // let myCount = 0;
  let myCount = useRef(0);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
          myCount.current++;
        }}
      >
        add
      </button>
      <div>{count}</div>
      <div>{myCount.current}</div>
    </div>
  );
}
