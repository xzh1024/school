import { PageContainer } from '@ant-design/pro-components';
import useStores from '@s/index';
import { theme } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from './modal';
import Search from './search';
import Table from './table';

function Index() {
  const { token } = theme.useToken();
  const { capitalPool } = useStores();
  const { showModal } = capitalPool;
  const location = useLocation();
  //是否为独立页面
  const [isUnique, setIsUnique] = React.useState(false);

  useEffect(() => {
    setIsUnique(location.pathname.startsWith('/unique'));
  }, []);

  return (
    <div className='className="comprehensive-query-container"'>
      <PageContainer
        fixedHeader
        style={{
          backgroundColor: token.colorBgLayout,
        }}
        header={{
          title: '资金池管理',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <Search />
        <Table />
        {showModal && <Modal />}
      </PageContainer>
    </div>
  );
}

export default observer(Index);
