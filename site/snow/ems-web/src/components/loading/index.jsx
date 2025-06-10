import Icon from '@c/svgIcon';
import { Spin } from 'antd';
import React from 'react';

const SnowIcon = () => {
  return (
    <div className="h-full flex items-center justify-center animate-bounce-loading">
      <Icon name="loading-snow" className="w-6 animate-loading"></Icon>
    </div>
  );
};

export default function Index({ children, ...otherProps }) {
  return (
    <Spin {...otherProps} indicator={<SnowIcon></SnowIcon>}>
      {children}
    </Spin>
  );
}
