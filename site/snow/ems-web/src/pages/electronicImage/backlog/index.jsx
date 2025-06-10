import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import Search from './search';
import Table from './table';
import React, { useState, useEffect } from 'react';

export default function Index() {
  const { token } = theme.useToken();
  const [isUniquePage, setIsUniquePage] = useState(false);
  useEffect(() => {
    setIsUniquePage(window.location.href.includes('/unique/') > -1);
  }, []);

  return (
    <div
      className={isUniquePage ? 'page-unique' : 'page-layout'}
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
          title: '影像待办',
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
