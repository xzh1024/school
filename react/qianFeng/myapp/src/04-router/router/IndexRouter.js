import React from 'react';
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import Films from '../views/films';
import Cinemas from '../views/Cinemas';
import Center from '../views/Center';
import NotFound from '../views/NotFound';
import Detail from '../views/films/detail';
import Login from '../views/Login';

export default function IndexRouter(props) {
  function isAuth() {
    return localStorage.getItem('token');
  }
  return (
    <Router>
      {props.children}
      <Switch>
        <Route path="/films" component={Films} />
        <Route path="/cinemas" component={Cinemas} />
        {/* <Route path="/center" component={Center} /> */}
        <Route
          path="/center"
          render={(props) => {
            console.log(props);
            return isAuth() ? (
              // <Center {...props} />
              <Center />
            ) : (
              <Redirect to="/login"></Redirect>
            );
          }}
        />
        <Route path="/login" component={Login} />
        <Route path="/detail/:id" component={Detail} />
        {/* <Route path="/detail" component={Detail} /> */}
        <Redirect exact from="/" to="/films" />
        <Route component={NotFound} />
        {/* <Route
          exact
          path="/"
          render={() => <Redirect to="/films"></Redirect>}
        ></Route>
        <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
}
