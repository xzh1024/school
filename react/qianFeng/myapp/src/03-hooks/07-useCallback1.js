import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  let myCount = 0;
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
          myCount++;
        }}
      >
        add
      </button>
      <div>{count}</div>
      <div>{myCount}</div>
    </div>
  );
}
