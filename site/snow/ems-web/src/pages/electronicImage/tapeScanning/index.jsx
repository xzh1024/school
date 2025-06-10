import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import Search from './search';
import Table from './table';
import React from 'react';

export default function Index() {
  const { token } = theme.useToken();

  return (
    <div
      className="snow-beer-monitoring-container"
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
          title: '待扫描单据列表',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <Search />
        <Table />
      </PageContainer>
    </div>
  );
}
