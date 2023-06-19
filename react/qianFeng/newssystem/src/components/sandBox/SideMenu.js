import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}
const items = [
  getItem('首页', '/home', <UserOutlined />),
  getItem('用户管理', '/user-manage', <VideoCameraOutlined />, [
    getItem('用户列表', '/user-manage/list', null)
  ]),
  getItem('权限管理', '/right-manage', <UploadOutlined />, [
    getItem('权限列表', '/right-manage/role/list', null),
    getItem('角色列表', '/right-manage/right/list', null)
  ])
];
// const items = [
//   {
//     key: '/home',
//     icon: <UserOutlined />,
//     label: '首页'
//   },
//   {
//     key: '/user-manage',
//     icon: <VideoCameraOutlined />,
//     label: '用户管理',
//     children: [
//       {
//         key: '/user-manage/list',
//         icon: <VideoCameraOutlined />,
//         label: '用户列表'
//       }
//     ]
//   },
//   {
//     key: '/right-manage',
//     icon: <UploadOutlined />,
//     label: '权限管理',
//     children: [
//       {
//         key: '/right-manage/role/list',
//         icon: <UploadOutlined />,
//         label: '权限列表'
//       },
//       {
//         key: '/right-manage/right/list',
//         icon: <UploadOutlined />,
//         label: '角色列表'
//       }
//     ]
//   }
// ]

const iconList = {
  '/home': <HomeOutlined />,
  '/user-manage': <UserOutlined />,
  '/user-manage/list': <UserOutlined />,
  '/right-manage': <UploadOutlined />,
  '/right-manage/role/list': <UploadOutlined />,
  '/right-manage/right/list': <UploadOutlined />
};

export default function SideMenu({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState([]);

  const openKeys = ['/' + location.pathname.split('/')[1]];
  const selectedKeys = [location.pathname];

  useEffect(() => {
    axios.get('/rights?_embed=children').then((res) => {
      console.log(res.data);
      setMenu(res.data);
    });
  }, []);

  // 判断是否是菜单页面
  const checkPagePermission = (item) => {
    return item.pagePermission === 1;
  };

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      // if (item.children && checkPagePermission(item)) {
      //   return {
      //     key: item.key,
      //     // icon: item.icon || null,
      //     children: item.children.length ? renderMenu(item.children) : null,
      //     label: item.title || null,
      //     type: item.type || null
      //   };
      // }
      return (
        checkPagePermission(item) && {
          key: item.key,
          label: item.title,
          icon: iconList[item.key],
          children:
            item.children && item.children.length
              ? renderMenu(item.children)
              : null
        }
      );
    });
  };

  // 通过事件代理绑定路由跳转功能
  const menuClick = (e) => {
    console.log('click ', e);
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div className="logo">全球新闻发布管理系统</div>
        <Menu
          defaultOpenKeys={openKeys}
          selectedKeys={selectedKeys}
          onClick={menuClick}
          theme="dark"
          mode="inline"
          items={renderMenu(menu)}
          style={{ flex: 1, overflowY: 'auto' }}
        />
      </div>
    </Sider>
  );
}
