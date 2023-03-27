import React, { useRef, useState } from 'react';

export default function App() {
  const textRef = useRef(); // React.createRef()
  // const [text, setText] = useState('666');
  const [list, setList] = useState([
    {
      text: 'aaa',
      isChecked: false,
    },
    {
      text: 'bbb',
      isChecked: false,
    },
    {
      text: 'ccc',
      isChecked: true,
    },
  ]);

  function handleAdd() {
    const text = textRef.current.value;
    if (text) {
      setList([...list, { text, isChecked: false }]);
      // 调用清除输入值的方法
      handleClear();
    }
  }

  function handleClear() {
    // setText('');
    textRef.current.value = '';
  }

  function handleDelete(index) {
    const arr = [...list];
    arr.splice(index, 1);
    setList(arr);
  }

  function handleFinished(index) {
    const newList = [...list];
    newList[index].isChecked = !newList[index].isChecked;
    setList(newList);
  }

  return (
    <div>
      <input ref={textRef}></input>
      <button onClick={handleAdd}>add</button>
      <button onClick={handleClear}>清除</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <input type="checkbox" checked={item.isChecked} readOnly />
            {/* 富文本展示 */}
            <span
              className={item.isChecked ? 'line-through' : ''}
              dangerouslySetInnerHTML={{
                __html: item.text,
              }}
            ></span>
            <button onClick={() => handleFinished(index)}>完成</button>
            <button onClick={() => handleDelete(index)}>删除</button>
          </li>
        ))}
      </ul>
      <div className={list.length && 'hidden'}>暂无待办事项</div>
    </div>
  );
}
