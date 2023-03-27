import React, { Component } from 'react';
import styled from 'styled-components';

export default class App extends Component {
  render() {
    const StyledChild = styled(Child)`
      background: yellow;
    `;
    return (
      <div>
        App
        <StyledChild></StyledChild>
      </div>
    );
  }
}

function Child(props) {
  console.log(props);
  return <div className={props.className}>Child</div>;
}
