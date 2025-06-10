import { RollbackOutlined } from '@ant-design/icons';
import { editCustomMenu } from '@api/dashboard';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStores from '../../../store';
import MenuCustom from './menuCustom';
const DEFAULT_ACTIONS = [
  {
    title: '我的报账单',
    icon: 'dashboard-action-1',
  },
  {
    title: '我的已处理',
    icon: 'dashboard-action-2',
  },
  {
    title: '接收报送',
    icon: 'dashboard-action-3',
  },
  {
    title: '本地出纳代办',
    icon: 'dashboard-action-4',
  },
  {
    title: '我的待处理',
    icon: 'dashboard-action-5',
  },
  {
    title: '委托授权',
    icon: 'dashboard-action-6',
  },
  {
    title: '付款代办',
    icon: 'dashboard-action-7',
  },
  {
    title: '质量代办',
    icon: 'dashboard-action-8',
  },
];

function Index() {
  const navigate = useNavigate();
  const { layout } = useStores();

  const [edit, setEdit] = useState(null);
  const [actions, setActions] = useState(DEFAULT_ACTIONS);
  const [iconSelectIndex, setIconSelectIndex] = useState(-1);

  useEffect(() => {
    layout.hideMenu = true;
    return () => {
      layout.hideMenu = false;
    };
  }, []);

  const handleSelectIcon = icon => {
    const data = [...actions];
    data[iconSelectIndex].icon = icon;
    setActions(data);

    setIconSelectIndex(-1);
  };

  const handleSave = () => {
    editCustomMenu(
      actions.map((item, index) => {
        return {
          menuId: item.menuId,
          orderNum: index + 1,
          icon: item.icon,
        };
      }),
    ).then(() => {
      setEdit(null);
    });
  };

  return (
    <div className="p-4 bg-white h-full">
      <div className="flex items-center">
        <div className="flex px-1 items-center cursor-pointer text-xs font-normal text-[#2C68FF] leading-5 rounded-[3px] border-[#1A8CFF] border-[1px] border-solid">
          <RollbackOutlined />
          <span className="ml-1" onClick={() => navigate('/dashboard')}>
            返回首页
          </span>
        </div>
      </div>

      <div>
        
        <MenuCustom></MenuCustom>
      </div>
    </div>
  );
}

export default observer(Index);
