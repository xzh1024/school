import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import store from '../redux/store';

interface IParam {
  myid: string;
}
class Detail extends Component<RouteComponentProps<IParam>, any> {
  componentDidMount() {
    store.dispatch({
      type: 'hide',
    });
  }

  componentWillUnmount() {
    store.dispatch({
      type: 'show',
    });
  }

  render() {
    return <div>Detail-{this.props.match.params.myid}</div>;
  }
}

export default Detail;
