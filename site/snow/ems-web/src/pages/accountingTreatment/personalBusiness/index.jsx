import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import OnDutyStatustable from './OnDutyStatustable';
function Index() {
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
          title: '个人营业管理',
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
          }}
        >
          <div style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '500', padding: '24px 0 0 24px' }}>
            顶岗状态
          </div>
          <OnDutyStatustable />
        </div>
      </PageContainer>
    </div>
  );
}
export default observer(Index);
