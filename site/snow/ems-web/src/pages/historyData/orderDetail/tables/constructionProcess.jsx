// 在建工程明细
import { getConstructionProcessList } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import React from 'react';

export default function Index(props) {
  const { claimId = 51780795, claimBase } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getList({
      claimId,
    });
  }, []);

  const getList = data => {
    setLoading(true);
    getConstructionProcessList(data)
      .then(res => {
        setDataSource(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: '序号',
      width: 80,
      dataIndex: 'index',
      render: (value, record, index) => index + 1,
    },
    {
      title: '项目编号及名称',
      width: 140,
      dataIndex: 'itemName',
    },
    {
      title: '项目余额',
      width: 140,
      dataIndex: 'projectBalanceAmount',
    },
    {
      title: '业务小类',
      width: 140,
      dataIndex: 'item3Name',
    },
    {
      title: '成本中心',
      width: 140,
      dataIndex: 'costCenterName',
    },
    {
      title: '金额',
      width: 140,
      dataIndex: 'constructAmount',
    },
    {
      title: '在建工程类别',
      width: 140,
      dataIndex: 'constructTypeName',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 'max-content',
        }}
        cardProps={{
          style: { padding: 0 },
        }}
        pagination={false}
        hideTools
      ></Table>
    </Spin>
  );
}
