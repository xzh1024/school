import React, { Component } from 'react';

// import { HashRouter, Route } from 'react-router-dom';
// import Films from './views/Films';
// import Cinemas from './views/Cinemas';
// import Center from './views/Center';
import MRouter from './router/IndexRouter.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <MRouter></MRouter>
      </div>
    );
  }
}
