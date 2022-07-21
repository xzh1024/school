import React, { Component } from 'react';

// import { HashRouter, Route } from 'react-router-dom';
// import Films from './views/Films';
// import Cinemas from './views/Cinemas';
// import Center from './views/Center';
import MRouter from './router/IndexRouter.js';
import Tabbar from './components/tabbar';
import store from './redux/store';

export default class App extends Component {
  state = {
    isShow: store.getState().TabbarReducer.show,
  };

  // store.subsribe  订阅
  componentDidMount() {
    store.subscribe(() => {
      console.log('app中订阅');
      this.setState({
        isShow: store.getState().TabbarReducer.show,
      });
    });
  }

  render() {
    console.log(store.getState());
    return (
      <div style={{ height: '100%' }}>
        <MRouter>
          {/* <Tabbar></Tabbar> */}
          {this.state.isShow && <Tabbar></Tabbar>}
        </MRouter>
      </div>
    );
  }
}
