import React, { Component } from 'react';
import { connect } from 'react-redux';

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
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    a: 1,
    b: 2,
    isShow: state.TabbarReducer.show,
  };
};
export default connect(mapStateToProps)(App);
