import React, { Component } from 'react';
import A from './A'

class C extends Component {
  render() {
    return (
      <div className="C">
        我是C组件
        <input type="text" {...this.props} />
        <div>{this.props.value}</div>
      </div>
    );
  }
}

export default A('')(C);
