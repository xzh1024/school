import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import React, { createRef } from 'react';
import Search from './search';
import Table from './table';

export default function Index() {
  const { token } = theme.useToken();
  const ref = createRef();

  // useEffect(() => {
  //   if(ref && ref.current) {
  //     Dragula([ref.current]);
  //   }
  // }, []);

  return (
    <div
      className="comprehensive-query-container"
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
          title: '报账单综合查询(新)',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <div ref={ref}>
          <div
            style={{
              backgroundColor: token.colorBgContainer,
              borderRadius: token.borderRadius,
              padding: '24px 24px 4px 24px',
              marginBottom: '16px',
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
        </div>
      </PageContainer>
    </div>
  );
}
