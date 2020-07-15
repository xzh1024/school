import React, { Component } from 'react';

import { connect } from 'dva';
import { render } from '@testing-library/react';

class Home extends Component {

  add = () => {
    this.props.dispatch({type:'index/changeNum',payload: {num: 8}});
    console.log(this.props);
  }

  render() {
    console.log(this);
    return (
      <React.Fragment>
        数量是{this.props.num}
        <button onClick={this.add}>增加</button>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    num: state.index.num
  }
})(Home);