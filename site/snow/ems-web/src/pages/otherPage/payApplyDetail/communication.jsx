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
      title: '发表人',
      dataIndex: 'index',
    },
    {
      title: '类型',
      dataIndex: 'index',
    },
    {
      title: '目标人',
      dataIndex: 'index',
    },
    {
      title: '发表时间',
      dataIndex: 'index',
    },
    {
      title: '意见内容',
      dataIndex: 'index',
    },
  ];

  return <Table columns={columns} dataSource={[]}></Table>;
}
