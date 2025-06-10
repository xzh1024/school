import useStores from '@/store';
import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import AllocatedToIndividualsModal from './modelComponents/allocatedToIndividualsModal';
import OneClickDispatchingModal from './modelComponents/oneClickDispatchingModal';
import RedistributionModel from './modelComponents/redistributionModal';
import AccountingNotSpecifiedSearch from './searchComponents/accountingNotSpecifiedSearch';
import AccountingUndistributedSearch from './searchComponents/accountingUndistributedSearch';
import AccountingUntreatedSearch from './searchComponents/accountingUntreatedSearch';
import GrabOrdersAlreadyRobbedSearch from './searchComponents/grabOrdersAlreadyRobbedSearch';
import Statistic from './statistic';
// 未指定
import NotSpecifiedTable from './tabelComponents/notSpecifiedTable';
// 未分配
import UndistributedTable from './tabelComponents/undistributedTable';
// 未处理
import UntreatedTable from './tabelComponents/untreatedTable';
// 已抢-未处理
import GrabOrdersAlreadyRobbedTable from './tabelComponents/grabOrdersAlreadyRobbedTable';

function Index() {
  const { token } = theme.useToken();
  const { taskPoolMonitoring } = useStores();
  const { activeKey, showRedistributionModel, showAllocatedToIndividualsModal, showOneClickDispatchingModal } =
    taskPoolMonitoring;

  useEffect(() => {
    if(activeKey) {
      taskPoolMonitoring.getTableList();
    }
  }, [activeKey]);

  useEffect(() => {
    taskPoolMonitoring.getCertificationPackageFunc();
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
          title: '任务池监控',
          style: {
            backgroundColor: token.colorBgContainer,
          },
        }}
      >
        <Statistic />
        {['review_notSpecified', 'accounting_notSpecified', 'grabOrders_wait'].includes(activeKey) ? (
          <AccountingNotSpecifiedSearch />
        ) : ['accounting_undistributed', 'review_undistributed'].includes(activeKey) ? (
          <AccountingUndistributedSearch />
        ) : ['accounting_untreated', 'review_untreated'].includes(activeKey) ? (
          <AccountingUntreatedSearch />
        ) : (
          <GrabOrdersAlreadyRobbedSearch />
        )}
        {['review_notSpecified', 'accounting_notSpecified', 'grabOrders_wait'].includes(activeKey) ? (
          <NotSpecifiedTable />
        ) : ['accounting_undistributed', 'review_undistributed'].includes(activeKey) ? (
          <UndistributedTable />
        ) : ['accounting_untreated', 'review_untreated'].includes(activeKey) ? (
          <UntreatedTable />
        ) : (
          <GrabOrdersAlreadyRobbedTable />
        )}
      </PageContainer>
      {showRedistributionModel && <RedistributionModel />}
      {showAllocatedToIndividualsModal && <AllocatedToIndividualsModal />}
      {showOneClickDispatchingModal && <OneClickDispatchingModal />}
    </div>
  );
}

export default observer(Index);
