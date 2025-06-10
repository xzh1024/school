import { CaretDownOutlined } from '@ant-design/icons';
import { changeTokenByPosition } from '@api/dashboard';
import Icon from '@c/svgIcon';
import storage from '@u/storage';
import { Dropdown } from 'antd';
import axios from 'axios';
import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../../store';

const CURRENT_POSITION_KEY = 'ems-current-position';

function Index() {
  const { globalStore, layout } = useStores();
  const { positionList, currentPosition, userInfo } = globalStore;

  const getMenu = list => {
    return list.map((item, index) => {
      return {
        label: item.orgName + '_' + item.positionName,
        key: item.positionId,
      };
    });
  };

  const handleClick = node => {
    const clickPosition = positionList.find(item => String(item.positionId) === String(node.key));
    if (clickPosition) {
      layout.loading = true;

      // 表单岗位
      axios({
        url: `/ReimbursePlatform/reimburse/reSetOrg.action?userComplexId=${clickPosition.orgId}@${
          clickPosition.positionId
        }&SSOUserName=${JSON.parse(sessionStorage.getItem('ems-current-info') || '{}').userName?.toLocaleUpperCase()}`,
        method: 'post',
      });

      // 表单岗位
      axios({
        url: `/CommonWeb/comWebReimburse/reSetOrg.action?userComplexId=${clickPosition.orgId}@${
          clickPosition.positionId
        }&SSOUserName=${JSON.parse(sessionStorage.getItem('ems-current-info') || '{}').userName?.toLocaleUpperCase()}`,
        method: 'post',
      });

      // 表单岗位
      axios({
        url: `/ReimburseImage/imageReimburse/reSetOrg.action?userComplexId=${clickPosition.orgId}@${
          clickPosition.positionId
        }&SSOUserName=${JSON.parse(sessionStorage.getItem('ems-current-info') || '{}').userName?.toLocaleUpperCase()}`,
        method: 'post',
      });


      changeTokenByPosition({
        userName: userInfo.userName,
        orgId: clickPosition.orgId,
        positionId: clickPosition.positionId,
      })
        .then(res => {
          storage.set('token', res.data.access_token, 'sessionStorage');
          storage.set(CURRENT_POSITION_KEY, clickPosition, 'sessionStorage');
          globalStore.currentPosition = clickPosition;
          globalStore.getCurrentUserInfo();
          window.$message.success('切换成功');
        })
        .finally(() => {
          layout.loading = false;
        });
    }
  };

  return (
    <div className="flex items-center mr-8">
      <Icon name="job-change" className="w-6 mr-2"></Icon>
      <Dropdown
        menu={{
          items: getMenu(positionList),
          onClick: handleClick,
        }}
      >
        <div className="text-white text-sm font-normal leading-[22px] cursor-pointer">
          <span>{`${currentPosition.orgName}_${currentPosition.positionName}`}</span>
          <CaretDownOutlined />
        </div>
      </Dropdown>
    </div>
  );
}

export default observer(Index);
