import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';

import Store from './redux/store'

import App from './App';

// const store = Store({
//   isLogin: false
// });
const store = Store({
  user: {
    isLogin: false
  },
  city: {
    '029': '成都'
  }
});
// console.log(store);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
