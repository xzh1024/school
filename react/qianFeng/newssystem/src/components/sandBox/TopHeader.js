import React from 'react';
import { Layout, Button, theme, Dropdown, Space, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const menuItems = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        超级管理员
      </a>
    ),
    icon: <UserOutlined />,
    disabled: false
  },
  {
    key: '2',
    label: '退出',
    icon: <LogoutOutlined />,
    disabled: false,
    danger: true
  }
];

export default function TopHeader({ collapsed, setCollapsed }) {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64
        }}
      />

      <div style={{ float: 'right' }}>
        <span>欢迎admin回来</span>
        <Dropdown
          menu={{
            items: menuItems
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size="large" icon={<UserOutlined />} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
