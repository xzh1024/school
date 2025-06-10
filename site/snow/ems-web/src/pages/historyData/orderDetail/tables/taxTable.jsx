import { getTaxLine } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

export default function Index(props) {

  const { claimId = 51761782 } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getList(claimId);
  }, []);

  const getList = (data) => {
    setLoading(true);
    getTaxLine(data).then(res => {
      let vatTypeData = res.data.vatTypeData;
      let vatTypeMap = {};
      vatTypeData.forEach(item => {
        vatTypeMap[item.dictCode] = item.dictName;
      });
      setDataSource(res.data.claimTaxLines.map(item => ({
        ...item,
        vatType: vatTypeMap[item.vatType]
      })));
    }).finally(() => {
      setLoading(false);
    });
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      align: 'center',
      render: (value, record, index) => index + 1,
    },
    {
      title: '业务小类',
      width: 140,
      dataIndex: 'expSubCategoryName',
    },
    {
      title: '税率',
      width: 140,
      dataIndex: 'vat',
    },
    {
      title: '税率类型',
      width: 140,
      dataIndex: 'vatType',
    },
    {
      title: '税款',
      width: 140,
      dataIndex: 'taxAmount',
    },
    {
      title: '发票代码',
      width: 200,
      dataIndex: 'invoiceCode',
    },
    {
      title: '发票号码',
      width: 200,
      dataIndex: 'invoiceNo',
    },
    {
      title: '开票时间',
      width: 180,
      dataIndex: 'invoiceDate',
      render: (text) => text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '',
    },
    {
      title: '摘要',
      dataIndex: 'summary',
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
