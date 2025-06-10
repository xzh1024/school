import { Table } from 'antd';
import React from 'react';

export default function Index() {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (value, record, index) => index + 1,
    },
    {
      title: '审批人',
      dataIndex: 'index',
    },
    {
      title: '目标人',
      dataIndex: 'index',
    },
    {
      title: '发起时间',
      dataIndex: 'index',
    },
    {
      title: '查阅时间',
      dataIndex: 'index',
    },
  ];

  return <Table columns={columns} dataSource={[]}></Table>;
}
