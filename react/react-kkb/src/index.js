// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './kreact/index';
import ReactDOM from './kreact/react-dom';

function FunctionComponent(props) {
  return <div className="border">FunctionComponent-{props.name}</div>;
}

const jsx = (
  <div className="border">
    <h1>慢 慢 慢</h1>
    <p>开课吧</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <FunctionComponent name="函数组件" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
