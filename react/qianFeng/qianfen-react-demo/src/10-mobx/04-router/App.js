import React, { Component } from 'react';
import MRouter from './router/IndexRouter.js';
import Tabbar from './components/tabbar';
// import { autorun } from 'mobx';
// import store from './mobx/store.js';
import { inject, observer } from 'mobx-react';

// mobx@5 mobx-react@6 的写法
// 构建一个 父组件-高阶组件mobx-react
// @inject('store')
// @observer
class App extends Component {
  // state = {
  //   isShow: true,
  // };
  componentDidMount() {
    console.log(this.props);
    // autorun(() => {
    //   this.setState({
    //     isShow: store.isTabbarShow,
    //   });
    // });
  }
  render() {
    return (
      <div>
        <MRouter>{this.props.isTabbarShow && <Tabbar></Tabbar>}</MRouter>
      </div>
    );
  }
}
// mobx@6 mobx-react@7 的写法
// export default inject('isTabbarShow')(observer(App));
export default inject((stores) => {
  return {
    isTabbarShow: stores.store.isTabbarShow
  };
})(App);
