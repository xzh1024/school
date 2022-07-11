import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Nowplaying from './Nowplaying';
import Comingsoon from './Comingsoon';
// import style from '../css/Film.module.css';
// import { Button, Space, Swiper, Toast } from 'antd-mobile'
import MainSwiper from './Swiper';
import { Tabs } from 'antd-mobile';

export default function Films(props) {
  const [activeKey, setActiveKey] = useState(props.location.pathname);
  // console.log(activeKey);
  return (
    <div>
      <h3>films</h3>
      {/* <div style={{ height: '200px', background: 'yellow' }}> */}
      {/* <Swiper>
          <Swiper.Item key="111">111</Swiper.Item>
          <Swiper.Item key="222">222</Swiper.Item>
          <Swiper.Item key="333">333</Swiper.Item>
        </Swiper> */}
      <MainSwiper></MainSwiper>
      {/* </div> */}
      {/* <ul>
        <li>
          <NavLink to="/films/nowplaying" activeClassName={style.active}>
            正在热映
          </NavLink>
        </li>
        <li>
          <NavLink to="/films/comingsoon" activeClassName={style.active}>
            即将上映
          </NavLink>
        </li>
      </ul> */}
      <div style={{ position: 'sticky', top: 0 }}>
        <Tabs
          onChange={(value) => {
            console.log(props);
            console.log(value);
            props.history.push(value);
            setActiveKey(value);
          }}
          activeKey={activeKey}
        >
          <Tabs.Tab title="正在热映" key="/films/nowplaying">
            {/* 正在热映 */}
          </Tabs.Tab>
          <Tabs.Tab title="即将上映" key="/films/comingsoon">
            {/* 即将上映 */}
          </Tabs.Tab>
        </Tabs>
      </div>

      {/* 路由配置 嵌套路由 */}
      <Switch>
        <Route path="/films/nowplaying" component={Nowplaying}></Route>
        <Route path="/films/comingsoon" component={Comingsoon}></Route>
        <Redirect from="/films" to="/films/nowplaying" />
      </Switch>
    </div>
  );
}
