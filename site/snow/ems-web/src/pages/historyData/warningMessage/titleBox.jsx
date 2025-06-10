import React from 'react';

export default function TitleBox(props) {
  const { title = '', children } = props;
  return (
    <div className="warning-message-box">
      <div className="warning-message-header">
        <div className="warning-message-header-title">{title}</div>
      </div>
      <div className="warning-message-content">{children && children}</div>
    </div>
  );
}
