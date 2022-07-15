import React, { useRef, useState } from 'react';

export default function App() {
  const myText = useRef<HTMLInputElement>(null);
  const [list, setList] = useState<string[]>([]);

  return (
    <div>
      <input type="text" ref={myText} />

      <button
        onClick={() => {
          console.log(myText.current?.value);
          setList([...list, (myText.current as HTMLInputElement).value]);
          (myText.current as HTMLInputElement).value = '';
        }}
      >
        click
      </button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
