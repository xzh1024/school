import React, { Component } from 'react';
import './App.css';
// import Dialog from './compoents/Dialog';
import PortalDialog from './compoents/PortalDialog';

export default class App extends Component {
  state = {
    isShow: false,
  };

  hide = () => {
    this.setState({
      isShow: false,
    });
  };
  render() {
    return (
      <div
        className="box"
        onClick={() => {
          console.log('box');
        }}
      >
        <div className="left"></div>
        <div className="right">
          <button onClick={() => this.setState({ isShow: true })}>show</button>
          {this.state.isShow && (
            <PortalDialog onClose={this.hide}></PortalDialog>
          )}
        </div>
      </div>
    );
  }
}
