import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import router from './routers'
import modelIndex from './models'
import { createBrowserHistory as createHistory } from 'history';
// import createHistory from 'history/createBrowserHistory';

//1：引入dva
import dva from 'dva';
//2：创建dva的实例app对象
const app = dva({
  history: createHistory()
});

//3：配置路由app.router(fn);
app.router(router);
//4：app.use(); // 安装插件
//5：注册模块app.model({}); {state,effects,reducers}
app.model(modelIndex);
//5.5：卸载模块 app.unmodel();
//6：app.start('#root')
app.start('#root');


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
