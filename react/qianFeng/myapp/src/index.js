// console.log("hello world kerwin");
import React from "react";
import ReactDom from "react-dom";
// import App from "./01-base/01-class组件";
// import App from "./01-base/02-函数式组件";
// import App from "./01-base/04-组件的样式";
// import App from "./01-base/05-事件绑定-1.js";
// import App from "./01-base/06-事件绑定-2.js";
// import App from "./01-base/07-ref.js";
// import App from "./01-base/08-state.js";
// import App from "./01-base/09-循环渲染.js";
// import App from "./01-base/10-todolist.js";
// import App from "./01-base/11-dangerouslySetInnerHTML.js";
import App from "./01-base/12-卖座选项卡.js";
import "./index.css";

ReactDom.render(<App></App>, document.getElementById("root"));

// ReactDom.render(
//   React.createElement('div', {
//     id: 'aaa',
//     class: 'bbb'
//   }, 111111),
//   document.getElementById("root")
// );