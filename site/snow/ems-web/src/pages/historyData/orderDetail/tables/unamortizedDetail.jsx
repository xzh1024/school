// 付款计划
import { getAjaxSelectCAL } from '@/api/historyData';
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
    getAjaxSelectCAL(data)
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
      title: '业务小类',
      width: 140,
      dataIndex: 'item3Name',
    },
    {
      title: '待摊支出类别',
      width: 140,
      dataIndex: 'amortizedTypeName',
    },
    {
      title: '待分摊金额',
      width: 140,
      dataIndex: 'amortizedAmount',
    },
  ];

  const sum = (data = []) => {
    let sum = new BigNumber(0);
    dataSource.forEach(item => {
      sum = sum.plus(item.amortizedAmount);
    });
    return sum.toString();
  };

  return (
    <Spin spinning={loading}>
      <Table
        toolsLeft={
          <div>
            待分摊金额合计：<b className='font-bold'>{sum(dataSource)}</b>
          </div>
        }
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 'max-content',
        }}
        cardProps={{
          style: { padding: 0 },
        }}
        pagination={false}
      ></Table>
    </Spin>
  );
}
