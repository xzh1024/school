import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('666');
  return (
    <div>
      <input
        value={text}
        onChange={(e) => {
          console.log(e.target.value);
          setText(e.target.value);
        }}
      ></input>
      <button onClick={() => setText('hahahh')}>add</button>
    </div>
  );
}
