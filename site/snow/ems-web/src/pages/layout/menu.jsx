import * as Icon from '@ant-design/icons';
import { jumpOutLink } from '@api/layout';
import { Menu } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStores from '../../store';

function Index() {
  const { layout } = useStores();
  const { menuSourceData, constRouterList } = layout;
  const navigate = useNavigate();
  const locationData = useLocation();
  const { pathname } = locationData;

  const [menuItems, setMenuItems] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    getMenu();
    // const path = window.location.pathname;
    // setSelectedKeys([path.replace('/ems-web', '') || '/']);
  }, [menuSourceData]);

  useEffect(() => {
    const path = pathname.replace('/ems-web', '') || '/dashboard';
    setSelectedKeys(path);
    if (path === '/') {
      navigate('dashboard');
    }
  }, [pathname]);

  const getMenu = () => {
    const menu = formatMenu(menuSourceData);
    setMenuItems(menu);
  };

  const getIcon = (iconName, props) => {
    const Component = Icon[iconName];

    return <Component {...props}></Component>;
  };

  const formatMenu = (data, isChildren = false) => {
    return data.map(item => {
      let children = [];
      const constRouter =
        constRouterList.find(router => {
          return router.path === item.newEmsPath;
        }) || {};

      if (item.children) {
        children = formatMenu(item.children, true);
      }
      return {
        key: item.newEmsPath,
        path: item.newEmsPath,
        icon: isChildren
          ? null
          : item.icon
          ? getIcon(item.icon, {
              className: 'w-4 h-4',
            })
          : null,
        label: item.menuName,
        children: children.length ? children : null,
        option: { ...item, ...constRouter },
      };
    });
  };

  const handleSelectMenu = menuItem => {
    console.log(menuItem, 33333);
    const itemProps = menuItem.item.props;
    const { option } = itemProps;

    // 埋点
    window._czc &&
      window._czc.push(['_trackEvent', option.menuTitle, '菜单切换', sessionStorage.getItem('ems-current-info'), 0]);

    // 外链需要判断是外部链接还是外部系统
    if (option.isOutLink === 1) {
      if (option.newEmsPath.startsWith('http://') || option.newEmsPath.startsWith('https://')) {
        window.open(option.newEmsPath, '_blank');
        return;
      }
      layout.loading = true;
      jumpOutLink({
        thirdSystemCode: option.newEmsPath,
      })
        .then(res => {
          window.open(res.data, '_blank');
        })
        .finally(() => {
          layout.loading = false;
        });
      return;
    }

    const title = option.menuTitle;
    document.title = `财务报账系统-${title}`;
    if (option.isOutLink === 2) {
      // 内嵌链接
      const title = option.menuTitle;
      const url = itemProps.path;

      navigate(`/iframe-page?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
      return;
    }

    if (itemProps.path) {
      setSelectedKeys([itemProps.path]);
      navigate(itemProps.path);

      return;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-1 overflow-scroll no-scrollbar mt-5">
        <Menu
          className="px-2"
          selectedKeys={selectedKeys}
          onSelect={handleSelectMenu}
          mode="inline"
          theme="light"
          inlineCollapsed={false}
          items={menuItems}
        />
      </div>
      <div className="p-6 flex items-center">4444</div>
    </div>
  );
}

export default observer(Index);
