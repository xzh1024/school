import React, { useState } from 'react';

export default function App() {
  const [name, setName] = useState('kerwin');
  const [age, setAge] = useState(100);
  console.log(name);
  console.log(setName);
  return (
    <div>
      <button
        onClick={() => {
          setName('xiaoming');
        }}
      >
        setName
      </button>
      <button
        onClick={() => {
          setAge(17);
        }}
      >
        setAge
      </button>
      <div>name-{name}</div>
      <div>age-{age}</div>
    </div>
  );
}
