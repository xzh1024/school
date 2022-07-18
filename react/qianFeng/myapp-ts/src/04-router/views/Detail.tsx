import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IParam {
  myid: string;
}
class Detail extends Component<RouteComponentProps<IParam>, any> {
  render() {
    return <div>Detail-{this.props.match.params.myid}</div>;
  }
}

export default Detail;
