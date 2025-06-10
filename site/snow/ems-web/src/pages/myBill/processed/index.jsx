import useStores from '@/store';
import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import ApprovedTable from './approvedTable';
import FeedbackTable from './feedbackTable';
import ReadTable from './readTable';
import Search from './search';
export default function Index() {
  const [activeKey, setActiveKey] = useState('1');
  const { billsProcessed } = useStores();

  const handleChangeTab = key => {
    setActiveKey(key);
    billsProcessed.resetStore();
  };

  useEffect(() => {
    return () => {
      billsProcessed.resetStore();
    };
  }, []);

  return (
    <div className="page-container">
      <PageContainer
        fixedHeader
        header={{
          title: '我的已处理',
        }}
        tabActiveKey={activeKey}
        onTabChange={handleChangeTab}
        tabList={[
          {
            key: '1',
            tab: '已审批',
          },
          {
            key: '2',
            tab: '已阅',
          },
          {
            key: '3',
            tab: '已反馈',
          },
        ]}
      >
        <Search activeKey={activeKey}></Search>
        {activeKey === '1' && <ApprovedTable></ApprovedTable>}
        {activeKey === '2' && <ReadTable></ReadTable>}
        {activeKey === '3' && <FeedbackTable></FeedbackTable>}
      </PageContainer>
    </div>
  );
}
