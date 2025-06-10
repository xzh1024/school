import { getIrregularityInvoice } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import React from 'react';

export default function Index(props) {

  const { claimId = 51773730 } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getList(claimId);
  }, []);

  const getList = (data) => {
    setLoading(true);
    getIrregularityInvoice(data).then(res => {
      setDataSource(res.data);
    }).finally(() => {
      setLoading(false);
    });
  };
  const columns = [
    {
      title: '归属部门',
      dataIndex: 'index',
    },
    {
      title: '业务小类',
      dataIndex: 'expSubCategoryName',
    },
    {
      title: '业务性质',
      dataIndex: 'businessPropertyName',
    },
    {
      title: '不合规票据票面金额',
      width: 160,
      dataIndex: 'amount',
    },
    {
      title: '不合规票据报销金',
      width: 160,
      dataIndex: 'invoiceAmount',
    },
    {
      title: '比例(%)',
      width: 140,
      dataIndex: 'percent',
    },
    {
      title: '说明',
      width: 140,
      dataIndex: 'remark',
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
      pagination={false}
      hideTools
    ></Table>
    </Spin>
  );
}
