// 在建工程调整
import { getConstructAdjust } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
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
    getConstructAdjust(data)
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
      title: '调整方向',
      width: 140,
      dataIndex: 'adjustNodeCode',
    },
    {
      title: '金额',
      width: 140,
      dataIndex: 'amount',
    },
    {
      title: '调整前',
      children: [
        {
          title: '项目编号及名称',
          width: 140,
          dataIndex: 'itemNameOld',
        },
        {
          title: '项目余额',
          width: 140,
          dataIndex: 'projectBalanceOld',
        },
        {
          title: '在建工程类别',
          width: 140,
          dataIndex: 'constructTypeNameOld',
        },
      ],
    },
    {
      title: '调整后',
      children: [
        {
          title: '项目编号及名称',
          width: 140,
          dataIndex: 'itemNameNew',
        },
        {
          title: '项目余额',
          width: 140,
          dataIndex: 'projectBalanceNew',
        },
        {
          title: '在建工程类别',
          width: 140,
          dataIndex: 'constructTypeNameNew',
        },
      ],
    },
  ];

  const getSum = (data = [], key) => {
    let sum = new BigNumber(0);
    data.forEach(item => {
      sum = sum.plus(item[key] || 0);
    });
    return sum.toString();
  };

  const toolsLeft = (
    <div className="flex items-center">
      <div>
        金额合计：<span className="font-bold">{getSum(dataSource, 'amount')}</span>
      </div>
    </div>
  );

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
        toolsLeft={toolsLeft}
      ></Table>
    </Spin>
  );
}
