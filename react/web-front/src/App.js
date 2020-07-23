import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'element-theme-default';
import Router from './router';

class App extends Component {
    render() {
        // function App() {
        return (
            <div className="App">
                <div className="container">
                    <Router></Router>
                </div>
            </div>
        );
    }
}

export default App;
