import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../views/login';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to='/login'></Redirect>}></Route>
                    <Route exact path='/login' component={Login}></Route>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}
 