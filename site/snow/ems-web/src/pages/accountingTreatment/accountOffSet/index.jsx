import useStores from '@/store';
import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import EditModal from './EditModal';
import Modal from './Modal';
import Search from './search';
import Table from './table';

function Index() {
  const { token } = theme.useToken();
  const { accountOffSet } = useStores();
  const { showModal, showEditMoadl } = accountOffSet;

  useEffect(() => {
    return () => {
      accountOffSet.searchParams = {};
      accountOffSet.dataSource = [];
      accountOffSet.pageIndex = 1;
      accountOffSet.total = 0;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: token.colorBgLayout,
      }}
    >
      <PageContainer
        fixedHeader
        style={{
          backgroundColor: token.colorBgLayout,
        }}
        header={{
          title: '会计不在岗设置',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <div
          style={{
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadius,
            padding: '24px 24px 4px 24px',
            marginBottom: '24px',
          }}
        >
          <Search />
        </div>
        <div
          style={{
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadius,
          }}
        >
          <Table />
        </div>
        {showModal && <Modal />}
        {showEditMoadl && <EditModal />}
      </PageContainer>
    </div>
  );
}

export default observer(Index);
