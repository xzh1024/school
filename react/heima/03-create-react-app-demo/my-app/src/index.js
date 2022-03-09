// 1 导入react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 2 创建react元素
// const title = React.createElement('h1', null, 'Hello React !!!');

// 条件渲染
let isLoading = true;
const loadData = () => {
  if (isLoading) {
    return <div>loading...</div>;
  }
};
const name = 'Jack';
const title = (
  <React.Fragment>
    <h1 className="red">Hello JSX</h1>
    <h3 className="red">Hello {name}</h3>
    <h1>{loadData()}</h1>
  </React.Fragment>
);

// 3 渲染react元素
ReactDOM.render(title, document.getElementById('root'));
