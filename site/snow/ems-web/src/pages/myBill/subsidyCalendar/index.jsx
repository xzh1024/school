import { CalendarOutlined, TableOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';
import Calendar from './calendar';
import Search from './search';
import Table from './table';

export default function Index() {
  const { token } = theme.useToken();
  const { subsidyCalendar } = useStores();
  const [activeKey, setActiveKey] = React.useState('table');
  const [isUniquePage, setIsUniquePage] = useState(false);
  useEffect(() => {
    setIsUniquePage(window.location.href.includes('/unique/'));
  }, []);

  const tabs = [
    {
      key: 'table',
      tab: (
        <span>
          <TableOutlined />
          表格
        </span>
      ),
    },
    {
      key: 'calendar',
      tab: (
        <span>
          <CalendarOutlined />
          日历
        </span>
      ),
    },
  ];

  const handleChangeTab = key => {
    setActiveKey(key);
    subsidyCalendar.resetStore();
  };

  return (
    <div
      className={isUniquePage ? 'snow-beer-monitoring-container unique-page' : 'snow-beer-monitoring-container'}
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
          title: '差补日历',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
        tabActiveKey={activeKey}
        onTabChange={handleChangeTab}
        tabList={tabs}
      >
        <div >
          {activeKey === 'table' && (
            <>
              <Search />
              <Table />
            </>
          )}
          {activeKey === 'calendar' && (
            <>
              <Calendar />
            </>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
