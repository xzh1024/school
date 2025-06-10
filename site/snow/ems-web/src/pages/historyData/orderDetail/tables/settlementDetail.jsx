// ppm结算详情
import { getSettlementDetail } from '@/api/historyData';
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
    getSettlementDetail(data)
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
      title: '结算单号',
      width: 140,
      dataIndex: 'statementNo',
    },
    {
      title: '订单编号',
      width: 140,
      dataIndex: 'orderNo',
    },
    {
      title: '订单头ID',
      width: 140,
      dataIndex: 'poHeaderId',
    },
    {
      title: '订单行ID',
      width: 140,
      dataIndex: 'poLineId',
    },
    {
      title: '订单发运行ID',
      width: 140,
      dataIndex: 'poLineLocationId',
    },
    {
      title: '入库单号',
      width: 140,
      dataIndex: 'warehouseinNo',
    },
    {
      title: '入库行号',
      width: 140,
      dataIndex: 'warehouseinLineNo',
    },
    {
      title: '物料编码',
      width: 140,
      dataIndex: 'detailCode',
    },
    {
      title: '物料名称',
      width: 140,
      dataIndex: 'detailName',
    },
    {
      title: '单位',
      width: 140,
      dataIndex: 'units',
    },
    {
      title: '价格',
      width: 140,
      dataIndex: 'unitPrice',
    },
    {
      title: '数量',
      width: 140,
      dataIndex: 'quantity',
    },
    {
      title: '金额',
      width: 140,
      dataIndex: 'amount',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        hideTools
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
