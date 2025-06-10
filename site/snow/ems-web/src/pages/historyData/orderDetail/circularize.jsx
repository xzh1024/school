import { circularizeHistory } from '@api/historyData';
import { Spin, Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export default function Index(props) {
  const [loading, setLoading] = useState(false);
  const [circularize, setCircularize] = useState([]);
  const { claimId = '51779809' } = props;

  const getCircularize = () => {
    setLoading(true);
    circularizeHistory(claimId).then(res => {
      console.log(res, 272727);
      setCircularize(res.data);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getCircularize(claimId);
  }, []);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 140,
      align: 'center',
      render: (value, record, index) => index + 1,
    },
    {
      title: '审批人',
      dataIndex: 'senderName',
    },
    {
      title: '目标人',
      dataIndex: 'handlerName',
    },
    {
      title: '发起时间',
      dataIndex: 'startTime',
      render: (value) => {
        return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
    {
      title: '查阅时间',
      dataIndex: 'endTime',
      render: (value) => {
        return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
  ];

  return <Spin spinning={loading}>
    <Table columns={columns} dataSource={circularize} rowKey={(record) => JSON.stringify(record)} pagination={false}></Table>
  </Spin>;
}
