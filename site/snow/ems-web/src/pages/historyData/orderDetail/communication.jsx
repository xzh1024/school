import { communicationHistory } from '@api/historyData';
import { Spin, Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export default function Index(props) {
  const [loading, setLoading] = useState(false);
  const [communication, setCommunication] = useState([]);
  const { claimId = '999430' } = props;

  const getCommunication = () => {
    setLoading(true);
    communicationHistory(claimId).then(res => {
      console.log(res, 272727);
      setCommunication(res.data);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getCommunication(claimId);
  }, []);

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (value, record, index) => index + 1,
    },
    {
      title: '发表人',
      width: 200,
      align: 'center',
      dataIndex: 'publisherName',
    },
    {
      title: '类型',
      width: 120,
      align: 'center',
      dataIndex: 'type',
    },
    {
      title: '目标人',
      width: 200,
      align: 'center',
      dataIndex: 'targetName',
    },
    {
      title: '发表时间',
      dataIndex: 'publisherTime',
      render: (value) => {
        return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
    {
      title: '意见内容',
      dataIndex: 'opinion',
    },
  ];

  return <Spin spinning={loading}>
    <Table columns={columns} dataSource={communication} rowKey={(record) => JSON.stringify(record)} pagination={false}></Table>
  </Spin>;
}
