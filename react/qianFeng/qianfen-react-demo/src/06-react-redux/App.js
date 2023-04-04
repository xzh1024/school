import React, { Component } from 'react';
import { connect } from 'react-redux'; // connect函数 生成一个父组件订阅，取消订阅 dispatch action

// import { HashRouter, Route } from 'react-router-dom';
// import Films from './views/Films';
// import Cinemas from './views/Cinemas';
// import Center from './views/Center';
import MRouter from './router/IndexRouter.js';
import Tabbar from './components/tabbar';
// import store from './redux/store';

class App extends Component {
  // state = {
  //   // isShow: store.getState().TabbarReducer.show,
  //   isShow: true,
  // };

  // store.subsribe  订阅
  // componentDidMount() {
  //   store.subscribe(() => {
  //     console.log('app中订阅');
  //     this.setState({
  //       isShow: store.getState().TabbarReducer.show,
  //     });
  //   });
  //   console.log(this.props);
  // }

  render() {
    // console.log(store.getState());
    return (
      <div style={{ height: '100%' }}>
        <MRouter>
          {/* <Tabbar></Tabbar> */}
          {this.props.isShow && <Tabbar></Tabbar>}
        </MRouter>
      </div>
    );
  }
}
/**
 * 高阶组件 connect
 * connect(将来给孩子传的属性<必须为一个回调函数>，将来给孩子传的回调函数<dispatch action 可缺省>)
 * 
 * **/
const mapStateToProps = (state) => {
  console.log(state);
  // store state
  // 返回的数据会绑定到组件的props上
  return {
    a: 1,
    b: 2,
    isShow: state.TabbarReducer.show,
  };
};
export default connect(mapStateToProps)(App);
