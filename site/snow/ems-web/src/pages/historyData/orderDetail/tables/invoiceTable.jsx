import { getInvoiceLine } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

export default function Index(props) {

  const { claimId = 51780795 } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getList(claimId);
  }, []);

  const getList = (data) => {
    setLoading(true);
    getInvoiceLine(data).then(res => {
      setDataSource(res.data.consumerInvoiceLines);
    }).finally(() => {
      setLoading(false);
    });
  };
  const columns = [
    {
      title: '发票ID',
      width: 120,
      dataIndex: 'invoiceId',
    },
    {
      title: '发票类型',
      width: 140,
      dataIndex: 'invoiceTypeName',
    },
    {
      title: '查验状态',
      width: 140,
      dataIndex: 'invoiceStatusName',
    },
    {
      title: '连号支撑材料',
      width: 140,
      dataIndex: 'consecutiveFlagName',
    },
    {
      title: '发票代码',
      width: 140,
      dataIndex: 'invoiceCode',
    },
    {
      title: '发票号码',
      width: 140,
      dataIndex: 'invoiceNum',
    },
    {
      title: '开票总额',
      width: 140,
      dataIndex: 'sumAmount',
    },
    {
      title: '开票日期',
      width: 140,
      dataIndex: 'invoiceDate',
      render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '购方名称',
      width: 140,
      dataIndex: 'purchaserName',
    },
    {
      title: '购方识别码',
      width: 140,
      dataIndex: 'purchaserTaxNo',
    },
    {
      title: '发票备注栏',
      width: 140,
      dataIndex: 'invoiceRemark',
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
