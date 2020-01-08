import React, { Component } from 'react';
// import {HashRouter, Route, Switch} from 'react-router-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// import Tabbar from './components/tabbar';
import Home from './pages/home/home';
import Category from './pages/category/category';
import Car from './pages/car/car';
import User from './pages/user/user';


import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to='/home'></Redirect>}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/category' component={Category}></Route>
                    <Route path='/car' component={Car}></Route>
                    <Route path='/user' component={User}></Route>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
        {/*<Tabbar data="tabbar" />*/}
      </div>
    );
  }
}

export default App;
