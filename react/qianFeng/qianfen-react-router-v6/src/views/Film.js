import React, { useCallback, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Film.css';
/**
 * 声明式导航与编程式导航
 * 
 * 编程式导航
 * **/
export default function Film() {
  const navigate = useNavigate();
  const [type, setType] = useState(1);
  const changeTab = useCallback((value) => {
    setType(value);
    switch (value) {
      case 1: {
        navigate('/films/nowPlaying');
        return;
      }
      case 2: {
        navigate('/films/comingSoon');
        return;
      }
      default:
        break;
    }
  }, [navigate]);
  return (
    <div>
      <div style={{ height: '200px', background: 'yellow' }}>大轮播</div>
      <div className="tabs">
        <div
          className={type === 1 ? 'tab-item active' : 'tab-item'}
          onClick={() => changeTab(1)}
        >
          正在热映
        </div>
        <div
          className={type === 2 ? 'tab-item active' : 'tab-item'}
          onClick={() => changeTab(2)}
        >
          即将上映
        </div>
      </div>
      {/* 路由容器 */}
      <Outlet></Outlet>
    </div>
  );
}
