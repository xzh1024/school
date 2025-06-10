import useStores from '@/store';
import MainContainer from '@c/mainContainer';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import Express from './express-modal';
import OtherPerson from './otherPerson';
import Personal from './personal';

export default observer(function Index() {
  const { presentationManagement, globalStore } = useStores();
  const { selectedRowKeys, dataSource, showExpressModal, formSearch, activeKey } = presentationManagement;

  const baseButton = [
    {
      title: '提交邮寄',
      type: 'primary',
      onClick: () => {
        if (selectedRowKeys.length === 0) {
          return window.$message.warning('请选择需要邮寄的单号');
        }
        const selectedData = dataSource.filter(item => {
          const key = `${item.claimId}&&${item.acquiringId}`;
          if (selectedRowKeys.includes(key)) {
            return true;
          }
          return false;
        });
        const errorRow = selectedData
          .filter(item => item.operateStatus !== 1)
          .map(item => `${item.claimId}&&${item.acquiringId}`);

        if (errorRow.length > 0) {
          presentationManagement.errorRow = errorRow;
          return window.$message.warning('所选单据不能提交邮寄');
        }
        presentationManagement.errorRow = [];
        presentationManagement.showExpressModal = true;
      },
    },
    {
      title: '撤销邮寄',
      type: 'primary',
      disabled: formSearch.acquiringStatus !== 2,
      onClick: () => {
        if (presentationManagement.selectedRowKeys.length === 0) {
          return window.$message.warning('请选择需要撤销邮寄的单号');
        }
        Modal.confirm({
          title: '确认撤销邮寄',
          content: null,
          okText: '撤销',
          cancelText: '取消',
          onOk: close => {
            close();
            const selectedData = dataSource.filter(item => {
              const key = `${item.claimId}&&${item.acquiringId}`;
              if (selectedRowKeys.includes(key)) {
                return true;
              }
              return false;
            });
            const errorRow = selectedData
              .filter(item => !(item.operateStatus === 0 && item.acquiringStatus === 2))
              .map(item => `${item.claimId}&&${item.acquiringId}`);

            if (errorRow.length > 0) {
              presentationManagement.errorRow = errorRow;
              return window.$message.warning('所选单据不能撤销邮寄');
            }
            presentationManagement.errorRow = [];
            presentationManagement.cancelPost({ userName: globalStore.userInfo.userName });
          },
          onCancel: close => {
            close();
          },
        });
      },
    },
  ];

  const handleTabChange = key => {
    presentationManagement.activeKey = key;
    presentationManagement.formSearch = {};
    presentationManagement.pageCurrent = 1;
    presentationManagement.getList({ userName: globalStore.userInfo.userName });
  };

  useEffect(() => {
    return () => {
      presentationManagement.activeKey = 'personal';
      presentationManagement.formSearch = {};
    };
  }, []);

  return (
    <MainContainer
      title="我的交单"
      containerProps={{
        tabList: [
          { tab: '个人邮寄', key: 'personal' },
          { tab: '代人邮寄', key: 'otherPerson' },
        ],
        activeKey: activeKey,
        onTabChange: handleTabChange,
      }}
    >
      {activeKey === 'personal' ? (
        <Personal buttons={baseButton} />
      ) : activeKey === 'otherPerson' ? (
        <OtherPerson buttons={baseButton} />
      ) : null}
      {showExpressModal ? <Express /> : null}
    </MainContainer>
  );
});
