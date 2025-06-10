import { Layout, theme } from 'antd';
import React from 'react';

const { Content, Footer, Header } = Layout;

export default function Web({ children, title }) {
  const { token } = theme.useToken();
  return (
    <Layout className="beer-layout-container">
      <Header className="beer-layout-container-header" style={{ backgroundColor: token.colorBgContainer }}>
        <div className="header-container">
          <div className="header-container-logo"></div>
          {title && <div className="header-container-title">{title}</div>}
        </div>
      </Header>
      <Content className="beer-layout-container-content">{children && children}</Content>
    </Layout>
  );
}
