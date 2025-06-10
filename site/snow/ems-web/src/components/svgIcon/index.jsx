/* eslint-disable no-undef */
import React from 'react';
import { ReactSVG } from 'react-svg';

// 只有单色svg图标能够使用colorful属性，  多色图标会导致图标变为一个颜色

export default function Index(props) {
  const { style = {}, name, className = '', colorful, activeColor, size = 24 } = props;

  const imgData = require('../../../public/svg/' + name + '.svg');

  return colorful ? (
    <ReactSVG
      src={`${process.env.REACT_APP_MAIN_HOST}/svg/${name}.svg`}
      className={className}
      style={style}
      beforeInjection={svg => {
        svg.classList.add('svg-icon-colorful');
        svg.setAttribute('fill', activeColor ? activeColor : 'currentColor');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
      }}
      wrapper="span"
    ></ReactSVG>
  ) : (
    <img src={imgData} className={'svg-icon ' + className} style={style} />
  );
}
