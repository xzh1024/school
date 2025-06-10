// 付款计划
import { getClaimPayPlanByClaimId } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import React from 'react';

export default function Index(props) {
  const { claimId = 51780795, claimBase } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const [dict, setDict] = React.useState([]);

  React.useEffect(() => {
    getList({
      claimId,
      expCategoryId: claimBase.expCategoryCode,
      item2Code: claimBase.item2Code,
    });
  }, []);

  const getList = data => {
    setLoading(true);
    getClaimPayPlanByClaimId(data)
      .then(res => {
        setDict(res.data.paymentModeDict);
        setDataSource(res.data.claimPayPlans);
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
      title: '付款类型',
      width: 140,
      dataIndex: 'paymentType',
      render: (value) => {
        return dict.find(item => item.dictCode === value)?.dictName || '';
      }
    },
    {
      title: '账期自然日',
      width: 140,
      dataIndex: 'naturalDay',
    },
    {
      title: '到期日',
      width: 140,
      dataIndex: 'dueDate',
    },
    {
      title: '付款金额',
      width: 140,
      dataIndex: 'payAmount',
    },
    {
      title: '是否自动付款',
      width: 140,
      dataIndex: 'isPay',
      render: value => {
        return value === 'Y' ? '是' : '否';
      },
    },
    {
      title: '描述',
      width: 140,
      dataIndex: 'remark',
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
