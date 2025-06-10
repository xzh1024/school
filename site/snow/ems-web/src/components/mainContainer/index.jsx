import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import React, { createRef } from 'react';

export default function Index({ search, table, title, containerProps, children, otherChildren }) {
  const { token } = theme.useToken();
  const ref = createRef();

  return (
    <div
      className="comprehensive-query-container"
      style={{
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: token.colorBgLayout,
      }}
    >
      <PageContainer
        fixedHeader
        style={{
          backgroundColor: token.colorBgLayout,
        }}
        header={{
          title: title,
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
        {...containerProps}
      >
        <div ref={ref}>
          {children ? (
            children
          ) : (
            <>
              <div
                style={{
                  backgroundColor: token.colorBgContainer,
                  borderRadius: token.borderRadius,
                  padding: '24px 16px 16px 16px',
                  marginBottom: '16px',
                }}
              >
                {search}
              </div>
              <div
                style={{
                  backgroundColor: token.colorBgContainer,
                  borderRadius: token.borderRadius,
                }}
              >
                {table}
              </div>
            </>
          )}
        </div>
      </PageContainer>
      {otherChildren}
    </div>
  );
}
