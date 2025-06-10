// 合同备案单历史单据列表
import { getHistoryList } from '@/api/historyData';
import { DownOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { Button, Dropdown, Spin } from 'antd';
import React from 'react';

export default function Index(props) {
  const { claimId = 51780795, claimBase } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    if (claimBase.refHeadId) {
      getList({
        refHeadId: claimBase.refHeadId,
        pageIndex: 1,
        pageSize: 999,
      });
    }
  }, []);

  const getList = data => {
    setLoading(true);
    getHistoryList(data)
      .then(res => {
        setDataSource(res.data.records);
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
      title: '报账单号',
      width: 140,
      dataIndex: 'claimNo',
    },
    {
      title: '合同编号',
      width: 140,
      dataIndex: 'contractNo',
    },
    {
      title: '合同名称',
      width: 140,
      dataIndex: 'contractName',
    },
    {
      title: '合同金额',
      width: 140,
      dataIndex: 'contractAmount',
    },
    {
      title: '合同开始日期',
      width: 140,
      dataIndex: 'contractStartDate',
    },
    {
      title: '合同结束日期',
      width: 140,
      dataIndex: 'contractEndDate',
    },
    {
      title: '备注',
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
