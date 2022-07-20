import React, { Component } from 'react';
import styled from 'styled-components';

export default class App extends Component {
  render() {
    const StyleButton = styled.button`
      width: 100px;
      height: 100px;
      background: yellow;
    `;
    const StyleButton2 = styled(StyleButton)`
      background: red;
    `;
    const StyleButton3 = styled(StyleButton)`
      background: blue;
    `;
    return (
      <div>
        App
        <StyleButton></StyleButton>
        <StyleButton2></StyleButton2>
        <StyleButton3></StyleButton3>
      </div>
    );
  }
}
