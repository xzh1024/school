import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import React, { createRef } from 'react';
import Search from './search';
import Table from './table';

export default function Index() {
  const { token } = theme.useToken();

  const ref = createRef();

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
          padding: '0',
        }}
        header={{
          title: '我的报账单',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <div ref={ref}>
          <Search />
          <div
            style={{
              backgroundColor: token.colorBgContainer,
              borderRadius: token.borderRadius,
            }}
          >
            <Table />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
