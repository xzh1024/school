import useStores from '@/store';
import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import Modal from './Modal';
import Search from './search';
import Table from './table';
function Index() {
  const { token } = theme.useToken();
  const { groupInfo } = useStores();
  const { showModal } = groupInfo;
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
          title: '会计分组设置',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <div
          className="mb-4"
          style={{
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadius,
            padding: '24px 24px 4px 24px',
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
      </PageContainer>
    </div>
  );
}
export default observer(Index);
