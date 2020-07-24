import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../views/login';
import Index from '../views/systemsetting/notice';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to='/login'></Redirect>}></Route>
                    <Route exact path='/login' component={Login}></Route>
                    <Route path='/index' component={Index}></Route>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}
 