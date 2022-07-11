import React from 'react';
// import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import style from './index.module.scss';
import { TabBar } from 'antd-mobile';
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';

function MyTabbar(props) {
  console.log(props);
  const tabs = [
    {
      key: '/films',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/cinemas',
      title: '影院',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/center',
      title: '我的',
      icon: <UserOutline />,
    },
  ];
  // const active = tabs.find((item) => {
  //   return props.location.pathname.includes(item.key);
  // });
  // const [activeKey, setActiveKey] = useState(active ? active.key : '');

  return (
    <div className={style.tabbar}>
      <TabBar
        activeKey={'/' + props.location.pathname.split('/')[1]}
        onChange={(value) => {
          props.history.push(value);
          // setActiveKey(value);
        }}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

export default withRouter(MyTabbar);
