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
  const [myname, setmyname] = useState('hahaha');

  /*
    useCallback(记忆函数)
    防止因为组件重新渲染，导致方法被重新创建，起到缓存作用；
    只有第二个参数变化了，才重新声明一次
  */
  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    console.log('add');
    if (text) {
      setList([...list, { text, isChecked: false }]);
      // 调用清除输入值的方法
      handleClear();
    }
  }, [text, list]);

  const handleClear = useCallback(() => {
    setText('');
  }, [text]);

  const handleDelete = useCallback(
    (index) => {
      const arr = [...list];
      arr.splice(index, 1);
      setList(arr);
    },
    [list]
  );

  function handleFinished(index) {
    const newList = [...list];
    newList[index].isChecked = !newList[index].isChecked;
    setList(newList);
  }

  return (
    <div>
      <div>
        {myname} -{' '}
        <button
          onClick={() => {
            setmyname('heiheih');
          }}
        >
          change-name
        </button>
      </div>

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
