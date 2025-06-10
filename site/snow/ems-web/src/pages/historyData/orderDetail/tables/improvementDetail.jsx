// 固定资产改良
import { getAjaxImprovedLinesByClaimId } from '@/api/historyData';
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
      expCategoryId: claimBase.expCategoryCode,
      item2Code: claimBase.item2Code,
    });
  }, []);

  const getList = data => {
    setLoading(true);
    getAjaxImprovedLinesByClaimId(data)
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
      title: '资产编号',
      width: 140,
      dataIndex: 'assetNumber',
    },
    {
      title: '资产名称',
      width: 140,
      dataIndex: 'assetName',
    },
    {
      title: '资产类别',
      width: 140,
      dataIndex: 'assetTypeName',
    },
    {
      title: '原值',
      width: 140,
      dataIndex: 'fixedAssetsCost',
    },
    {
      title: '账面价值',
      width: 140,
      dataIndex: 'retirementNbvRetired',
    },
    {
      title: '项目编码及名称',
      width: 140,
      dataIndex: 'projectName',
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
