import { SettingFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../store';

const Setting = observer(() => {
  const { configStore } = useStores();

  const handleOpenSettings = () => {
    runInAction(() => {
      configStore.isSettingDrawerOpen = true;
    });
  };

  return (
    <Tooltip title="设置">
      <SettingFilled onClick={handleOpenSettings} />
    </Tooltip>
  );
});

export default prors => {
  return [<Setting key="Setting" />];
};
