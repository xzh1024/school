import React, { Component } from 'react';
import { connect } from 'react-redux';
// import logo from './logo.svg';
import './App.css';

import 'element-theme-default';
import Router from './router/router';

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

//获取需要的数据
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

// export default App;
export default connect(mapStateToProps)(App);
