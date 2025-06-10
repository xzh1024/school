import { CaretDownOutlined } from '@ant-design/icons';
import Icon from '@c/svgIcon';
import { Dropdown } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStores from '../../../store';
import JobChange from './jobChange';

const DROP_MENU = [
  {
    title: '菜单自定义',
    path: '/menu-custom',
  },
];

function Index() {
  const { globalStore } = useStores();
  const navigate = useNavigate();
  // const { positionList } = globalStore;

  // useEffect(() => {

  // }, []);

  const getMenu = () => {
    return DROP_MENU.map((item, index) => ({ key: item.title, label: item.title, path: item.path }));
  };

  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
    const options = item.props.options;
    navigate(options.path);
  };

  return (
    <div className="flex justify-end items-center">
      <JobChange></JobChange>
      <div className="flex items-center text-white text-sm font-normal leading-[22px] cursor-pointer">
        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              {
                label: '系统设置',
                key: '/menu-custom',
                options: {
                  title: '系统设置',
                  path: '/menu-custom',
                },
              },
            ],
            onClick: handleMenuClick,
          }}
          placement="bottom"
        >
          <div className="flex justify-start items-center">
            <Icon name="avatar"></Icon>
            <span className="px-2">{globalStore.userInfo.employeeName || '--'}</span>
            <CaretDownOutlined></CaretDownOutlined>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default observer(Index);
