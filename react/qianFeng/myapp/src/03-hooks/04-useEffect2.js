import React, { useState, useEffect } from 'react';

export default function App() {
  const [name, setname] = useState('kerwin');

  useEffect(() => {
    setname(name.substring(0, 1).toUpperCase() + name.substring(1));
    console.log(name);
  }, [name]);

  return (
    <div>
      <div>App-{name}</div>
      <button onClick={() => setname('xiaoming')}>click</button>
    </div>
  );
}
