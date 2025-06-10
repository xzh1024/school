import { getPayList } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import React from 'react';

export default function Index(props) {
  const { claimId = 292828 } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getList(claimId);
  }, []);

  const getList = data => {
    setLoading(true);
    getPayList(data)
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
      dataIndex: 'index',
      width: 120,
      align: 'center',
      render: (value, record, index) => index + 1,
    },
    {
      title: '员工/供应商',
      dataIndex: 'vendorName',
    },
    {
      title: '户名',
      dataIndex: 'vendorAccountName',
    },
    {
      title: '银行账号',
      dataIndex: 'vendorAccountNo',
      render: value => {
        return value ? value.slice(0, 4) + '****' + value.slice(value.length - 4) : '';
      },
    },
    {
      title: '开户行',
      dataIndex: 'vendorBankName',
    },
    {
      title: '支付金额',
      dataIndex: 'payAmount',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={dataSource}
        toolsLeft={null}
        scroll={{
          x: 'max-content',
        }}
        hideTools
        pagination={false}
      ></Table>
    </Spin>
  );
}
