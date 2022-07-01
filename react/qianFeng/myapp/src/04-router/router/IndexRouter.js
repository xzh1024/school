import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Films from '../views/Films';
import Cinemas from '../views/Cinemas';
import Center from '../views/Center';

export default function IndexRouter() {
  return (
    <HashRouter>
      <Route path="/films" component={Films} />
      <Route path="/cinemas" component={Cinemas} />
      <Route path="/center" component={Center} />
    </HashRouter>
  );
}
