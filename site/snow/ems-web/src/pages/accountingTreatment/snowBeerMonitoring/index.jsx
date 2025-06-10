import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import React from 'react';
import Search from './search';
import Statistic from './statistic';
import Table from './table';

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
          title: '雪花个性发票生成监控',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <Statistic />
        <Search />
        <Table />
      </PageContainer>
    </div>
  );
}
