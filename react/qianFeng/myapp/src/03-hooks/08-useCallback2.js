import React, { useCallback, useState } from 'react';

export default function App() {
  const [text, setText] = useState('666');
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

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    if (text) {
      setList([...list, { text, isChecked: false }]);
      // 调用清除输入值的方法
      handleClear();
    }
  }, [text, list]);

  const handleClear = useCallback(() => {
    setText('');
  }, [text])

  const handleDelete = useCallback((index) => {
    const arr = [...list];
    arr.splice(index, 1);
    setList(arr);
  },
    [list.length],
  )
  

  function handleFinished(index) {
    const newList = [...list];
    newList[index].isChecked = !newList[index].isChecked;
    setList(newList);
  }

  return (
    <div>
      <input value={text} onChange={handleChange}></input>
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
      <div className={list.length ? 'hidden' : ''}>暂无待办事项</div>
    </div>
  );
}
