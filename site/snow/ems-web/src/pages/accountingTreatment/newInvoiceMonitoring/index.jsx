import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../store';
import GeneratedSearch from './generatedSearch';
import Statistic from './statistic';
import Table from './table';
import UnloadSearch from './unloadSearch';
import WaiteSearch from './waitSearch';
function Index() {
  const { token } = theme.useToken();
  const { newInvoiceMonitoring } = useStores();
  const { activeKey } = newInvoiceMonitoring;

  useEffect(() => {
    return () => {
      newInvoiceMonitoring.searchParams = {};
      newInvoiceMonitoring.dataSource = [];
      newInvoiceMonitoring.total = 0;
      newInvoiceMonitoring.pageIndex = 1;
    };
  }, []);

  return (
    <div
      className="new-invoice-monitoring-container"
      style={{
        minHeight: '100vh',
        backgroundColor: token.colorBgLayout,
      }}
    >
      <PageContainer
        fixedHeader
        header={{
          title: '生成发票监控',
          style: {
            backgroundColor: token.colorBgContainer,
          },
        }}
      >
        <Statistic />
        {activeKey === 'erpFailed' ? (
          <UnloadSearch />
        ) : activeKey === 'fmsFailed' ? (
          <WaiteSearch />
        ) : (
          <GeneratedSearch />
        )}

        <Table />
      </PageContainer>
    </div>
  );
}

export default observer(Index);
