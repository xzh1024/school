import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import { FrontendAuth } from '../components/frontendAuth/index'
import { routerConfig } from './routerConfig'

export default class Router extends Component {
    init() {
        this.render();
    }

    render() {
        console.log("router");
        return (
            <BrowserRouter>
                <Switch>
                    <FrontendAuth config={routerConfig} />
                </Switch>
            </BrowserRouter>
        );
    }
}
