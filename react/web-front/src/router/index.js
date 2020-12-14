import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../views/login';
import Home from '../views/home';
import ErrorPage from '../views/error';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to='/login'></Redirect>}></Route>
                    <Route exact path='/login' component={Login}></Route>
                    <Route exact path='/index' component={Home}></Route>
                    <Route exact path='/error' component={ErrorPage}></Route>
                    <Route path='/index' component={Home}></Route>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}
 