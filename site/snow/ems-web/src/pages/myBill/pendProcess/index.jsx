import { getAuthority } from '@/api/myBill/pendProcess';
import useStores from '@/store';
import { PageContainer } from '@ant-design/pro-components';
import { Badge, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import SecondTable from './components/pendApproval/table'; //待审批-表格
import FirstTab from './components/pendApprovalAccount/search'; //待审批（会计）搜索头部
import FirstTable from './components/pendApprovalAccount/table'; //待审批（会计）表格
import FourthTable from './components/pendFeedback/table'; //待反馈-表格
import ThirdTable from './components/pendRead/table'; //待阅-表格
import CommonSearch from './components/search/search';

let dataSource = {};
let tabsList = [];

export default function Index() {
  const { token } = theme.useToken();
  const { pendProcess, pendApproval, pendFeedback, pendRead } = useStores();
  const [activeKey, setActiveKey] = useState('pendApproval');
  const [isUniquePage, setIsUniquePage] = useState(false);
  const [data, setData] = useState({});
  const [refreshTable, setRefreshTable] = useState(false);
  const [tabs, setTabs] = useState([
    {
      key: 'pendApproval',
    },
    {
      key: 'pendRead',
    },
    {
      key: 'pendFeedback',
    },
  ]);
  useEffect(() => {
    setIsUniquePage(window.location.href.includes('/unique/') > -1);
    init();

    let interval = setInterval(() => {
      getCounts(data);
    }, 5000);

    return () => {
      pendProcess.resetStore();
      clearInterval(interval);
    };
  }, []);

  // 轮询获取待办数量
  const getCounts = async () => {
    const res = await getAuthority();
    const countData = res.data.data;
    let count = 0;
    const {
      isShowToDoAccount, // 是否显示待审批（会计）
      findLoadToCommunicationListCount, //待反馈总数量
      findLoadToDoListCount, //待审批总数量
      findLoadToReadListCount, //待阅总数量
    } = countData;

    if (
      findLoadToCommunicationListCount !== dataSource.findLoadToCommunicationListCount ||
      findLoadToDoListCount !== dataSource.findLoadToDoListCount ||
      findLoadToReadListCount !== dataSource.findLoadToReadListCount
    ) {
      console.log(333112, tabsList);
      if (tabsList.length === 4) {
        count = 1;
      }

      const list = [...tabsList];
      list[count].tab = (
        <Badge count={findLoadToDoListCount} overflowCount={9999}>
          <div style={{ width: '60px' }}>待审批</div>
        </Badge>
      );
      list[count + 1].tab = (
        <Badge count={findLoadToReadListCount} overflowCount={9999}>
          <div style={{ width: '40px' }}>待阅</div>
        </Badge>
      );
      list[count + 2].tab = (
        <Badge count={findLoadToCommunicationListCount} overflowCount={9999}>
          <div style={{ width: '60px' }}>待反馈</div>
        </Badge>
      );

      setTabs(list);
      setData(countData);
      setRefreshTable(!refreshTable);
      tabsList = list;
      dataSource = countData;
    }
  };

  //初始化
  const init = async () => {
    const res = await getAuthority();
    const data = res.data.data;
    const {
      isShowToDoAccount, // 是否显示待审批（会计）
      findLoadToCommunicationListCount, //待反馈总数量
      findLoadToDoListCount, //待审批总数量
      findLoadToReadListCount, //待阅总数量
    } = data;

    const list = [...tabs];
    list[0].tab = (
      <Badge count={findLoadToDoListCount} overflowCount={9999}>
        <div style={{ width: '60px' }}>待审批</div>
      </Badge>
    );
    list[1].tab = (
      <Badge count={findLoadToReadListCount} overflowCount={9999}>
        <div style={{ width: '40px' }}>待阅</div>
      </Badge>
    );
    list[2].tab = (
      <Badge count={findLoadToCommunicationListCount} overflowCount={9999}>
        <div style={{ width: '60px' }}>待反馈</div>
      </Badge>
    );
    setTabs(list);
    tabsList = list;

    if (isShowToDoAccount && tabs.length === 3) {
      const list = [...tabs];
      list.unshift({
        key: 'pendApprovalAccount',
        tab: '待审批（会计）',
      });
      tabsList = list;
      setTabs(list);
      setActiveKey('pendApprovalAccount');
    }
    setData(data);
    dataSource = data;
  };

  const handleChangeTab = key => {
    setActiveKey(key);
    pendProcess.resetStore();
    pendApproval.resetStore();
    pendFeedback.resetStore();
    pendRead.resetStore();
  };

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
          title: '我的待处理',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
        tabActiveKey={activeKey}
        onTabChange={handleChangeTab}
        tabList={tabs}
      >
        <div>
          {activeKey === 'pendApprovalAccount' && (
            <>
              <FirstTab data={data} refreshTable={refreshTable} />
              <FirstTable data={data} refreshTable={refreshTable} />
            </>
          )}

          {activeKey === 'pendApproval' && (
            <>
              <CommonSearch type="pendApproval" refreshTable={refreshTable} />
              <SecondTable data={data} refreshTable={refreshTable} />
            </>
          )}

          {activeKey === 'pendRead' && (
            <>
              <CommonSearch type="pendRead" refreshTable={refreshTable} />
              <ThirdTable refreshTable={refreshTable} />
            </>
          )}

          {activeKey === 'pendFeedback' && (
            <>
              <CommonSearch type="pendFeedback" refreshTable={refreshTable} />
              <FourthTable data={data} refreshTable={refreshTable} />
            </>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
