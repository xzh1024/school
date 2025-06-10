// 会计处理-顶岗管理

import { PageContainer } from '@ant-design/pro-components';
import { observer } from 'mobx-react';
import React, { createRef } from 'react';
import useStores from '../../../store';
import PostStatusDrawer from './postDrawer';
import Search from './search';
import Table from './table';

function Index() {
  const { postManagement } = useStores();
  const { showPostStatus } = postManagement;
  const ref = createRef();

  return (
    <div
      style={{
        minHeight: '100vh',
        // backgroundColor: token.colorBgLayout,
      }}
    >
      <PageContainer
        fixedHeader
        style={{
          // backgroundColor: token.colorBgLayout,
          padding: '0',
        }}
        header={{
          title: '顶岗管理',
          style: {
            // backgroundColor: token.colorBgContainer,
            // boxShadow: token.boxShadowTertiary,
            padding: '0 40px',
          },
        }}
      >
        <div ref={ref}>
          <div
            className="bg-white rounded-sm"
            style={{
              padding: '24px 24px 4px 24px',
              marginBottom: '24px',
            }}
          >
            <Search></Search>
          </div>
          <div className="bg-white rounded-sm">
            <Table></Table>
          </div>
        </div>
        <PostStatusDrawer
          showPostStatus={showPostStatus}
          onClose={() => (postManagement.showPostStatus = false)}
        ></PostStatusDrawer>
      </PageContainer>
    </div>
  );
}
export default observer(Index);
