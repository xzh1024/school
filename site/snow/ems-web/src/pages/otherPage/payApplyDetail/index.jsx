import { PageContainer, ProCard } from '@ant-design/pro-components';
import ProSkeleton from '@ant-design/pro-skeleton';
import { Descriptions, Tabs, theme } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Circularize from './circularize';
import CommunicationTable from './communication';
import PayTable from './payTable';
import Process from './process';

const items = [
  {
    key: '1',
    label: '报账单号',
    children: 'FKSQ2024031211752',
  },
  {
    key: '2',
    label: '申请人',
    children: '王小军',
  },
  {
    key: '3',
    label: '申请部门',
    children: '华润啤酒IT交付中心财务领域组',
  },
  {
    key: '4',
    label: '申请人公司',
    children: '华润雪花啤酒(中国)有限公司成都分公司',
  },
  {
    key: '5',
    label: '申请人职务',
    children: '技术开发',
  },
  {
    key: '6',
    label: '申请人邮箱',
    children: 'ZHOUHAO185@crb.cn',
  },
  {
    key: '7',
    label: '申请人电话',
    children: '13332233221',
  },
  {
    key: '8',
    label: '申请日期',
    children: '2024-03-12',
  },
];

const items1 = [
  {
    key: '1',
    label: '归属公司',
    children: '华润雪花啤酒(中国)有限公司成都分公司',
  },
  {
    key: '2',
    label: '业务类别',
    children: '付款申请',
    span: 2,
  },
  {
    key: '3',
    label: '附件张数',
    children: '2',
  },
  {
    key: '4',
    label: '币种',
    children: '人民币',
    span: 2,
  },
  {
    key: '5',
    label: '报账事由',
    children: '后台任务自动创建付款申请单（立即付款类型）',
    span: 3,
  },
];

function Index() {
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const tabs = [
    {
      key: '1',
      label: '审批历史',
      children: <Process />,
    },
    {
      key: '2',
      label: '沟通历史',
      children: <CommunicationTable />,
    },
    {
      key: '3',
      label: '传阅历史',
      children: <Circularize />,
    },
  ];

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
          title: '付款申请详情',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        {loading ? (
          <div
            style={{
              padding: 24,
            }}
          >
            <ProSkeleton type="list" pageHeader={false} />
          </div>
        ) : (
          <>
            <ProCard ghost gutter={16} className="min-h-40 mt-4 w-full">
              <ProCard bordered style={{ background: '#fff', width: '100%' }}>
                <Tabs defaultActiveKey="1" items={tabs}></Tabs>
              </ProCard>
            </ProCard>

            <ProCard ghost gutter={16} className="min-h-40 mt-4 w-full">
              <ProCard bordered style={{ background: '#fff', height: '100%' }}>
                <Descriptions title="基本信息" bordered items={items} className="w-full" size="small" />
              </ProCard>
              <ProCard bordered style={{ background: '#fff', height: '100%' }}>
                <Descriptions title="报账信息" bordered items={items1} className="w-full" size="small" />
              </ProCard>
            </ProCard>

            <ProCard ghost gutter={16} className="min-h-40 mt-4 w-full">
              <ProCard ghost>
                <PayTable />
              </ProCard>
            </ProCard>
            <ProCard ghost gutter={16} className="min-h-40 mt-4 w-full">
              <ProCard bordered style={{ background: '#fff', height: '100%' }}>
                <Descriptions title="电子影像" bordered items={items} className="w-full" size="small" />
              </ProCard>
              <ProCard bordered style={{ background: '#fff', height: '100%' }}>
                <Descriptions title="附件" bordered items={items1} className="w-full" size="small" />
              </ProCard>
            </ProCard>
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default observer(Index);
