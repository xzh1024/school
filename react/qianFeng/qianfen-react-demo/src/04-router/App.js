import React, { Component } from 'react';

// import { HashRouter, Route } from 'react-router-dom';
// import Films from './views/Films';
// import Cinemas from './views/Cinemas';
// import Center from './views/Center';
import MRouter from './router/IndexRouter.js';
import Tabbar from './components/tabbar';

export default class App extends Component {
  // store.subsribe  订阅
  render() {
    return (
      <div>
        <MRouter>
          <Tabbar></Tabbar>
        </MRouter>
      </div>
    );
  }
}
