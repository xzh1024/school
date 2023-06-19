import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/sandBox/SideMenu';
import TopHeader from '../../components/sandBox/TopHeader';
import { Layout, theme } from 'antd';
import './NewsSandBox.css'

const { Content } = Layout;

export default function NewsSandBox() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout className='ant-layout'>
      <SideMenu collapsed={collapsed} />
      <Layout>
        <TopHeader
          collapsed={collapsed}
          setCollapsed={(value) => setCollapsed(value)}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: 'auto'
          }}
        >
          {/* 路由 出口 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
