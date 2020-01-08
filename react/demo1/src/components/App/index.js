import React, { Component } from 'react';
import Header from '../Header';
import OrderList from '../OrderList';

class App extends Component {
  constructor(){
    super();
    console.log('constructor');
  }
  // static getDerivedStateFromProps(){
  //     console.log('getDerivedStateFromProps');
  //     return null;
  // }
  componentDidMount(){//当组件输出到 DOM 后会执行 componentDidMount() 钩子
      // console.log('创建后');
      // console.log('componentDidMount');
  }
  render() {
    return (
      <div className="App">
          <Header />
          <OrderList />
      </div>
    );
  }
}

export default App;
