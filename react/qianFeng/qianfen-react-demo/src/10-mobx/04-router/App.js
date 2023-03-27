import React, { Component } from 'react';
import MRouter from './router/IndexRouter.js';
import Tabbar from './components/tabbar';
// import { autorun } from 'mobx';
// import store from './mobx/store.js';
import { inject, observer } from 'mobx-react';

// 构建一个 父组件-高阶组件mobx-react
@inject('store')
@observer
class App extends Component {
  // state = {
  //   isShow: true,
  // };
  componentDidMount() {
    console.log(this.props.store.isTabbarShow);
    // autorun(() => {
    //   this.setState({
    //     isShow: store.isTabbarShow,
    //   });
    // });
  }
  render() {
    return (
      <div>
        <MRouter>{this.props.store.isTabbarShow && <Tabbar></Tabbar>}</MRouter>
      </div>
    );
  }
}
export default App;
