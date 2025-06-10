import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import React from 'react';
import Search from './search';
import Table from './table';

export default function Index() {
  const { token } = theme.useToken();

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
          title: '会计抢单记录(新)',
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
      </PageContainer>
    </div>
  );
}
