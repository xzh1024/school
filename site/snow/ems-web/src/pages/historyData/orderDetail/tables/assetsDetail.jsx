// 资产明细
import { getAssetsDetail } from '@/api/historyData';
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
    getAssetsDetail(data)
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
      title: '资产明细',
      width: 140,
      dataIndex: 'assetName',
    },
    {
      title: '标签号',
      width: 140,
      dataIndex: 'assetTagNumber',
    },
    {
      title: '序列号',
      width: 140,
      dataIndex: 'serialNumber',
    },
    {
      title: '规格型号',
      width: 140,
      dataIndex: 'modelNumber',
    },
    {
      title: '数量',
      width: 140,
      dataIndex: 'quantity',
    },
    {
      title: '资产原值',
      width: 140,
      dataIndex: 'assetOriginalValue',
    },
    {
      title: '资产类别编码',
      width: 140,
      dataIndex: 'assetType',
    },
    {
      title: '资产类别',
      width: 140,
      dataIndex: 'assetsCategoryDesc',
    },
    {
      title: '既定折旧年限（月）',
      width: 140,
      dataIndex: 'establishedDepreciationLife',
    },
    {
      title: '实际折旧年限（月）',
      width: 140,
      dataIndex: 'actualDepreciationPeriod',
    },
    {
      title: '成本中心编码',
      width: 140,
      dataIndex: 'costCenterCode',
    },
    {
      title: '成本中心',
      width: 140,
      dataIndex: 'costCenterName',
    },
    {
      title: '折旧科目',
      width: 140,
      dataIndex: 'depreciationAccount',
    },
    {
      title: '存放地点',
      width: 140,
      dataIndex: 'storageLocation',
    },
    {
      title: '投入使用日期',
      width: 140,
      dataIndex: 'dateOfUse',
    },
    {
      title: '资产备注信息',
      width: 140,
      dataIndex: 'assetRemark',
    },
    {
      title: '资产用途',
      width: 140,
      dataIndex: 'isWelfareName',
    },
    {
      title: '是否计税',
      width: 140,
      dataIndex: 'taxOrNot',
      render: value => (value === 'N' ? '否' : '是'),
    },
    {
      title: '计税面积(㎡)',
      width: 140,
      dataIndex: 'taxableArea',
    },
    {
      title: '计税分组',
      width: 140,
      dataIndex: 'codeOfAssociatedIntangibleAssets',
    },
    {
      title: '享受减免计税设备',
      width: 140,
      dataIndex: 'isEnvironmentDevice',
      render: value => {
        return value === '0' ? '否' : '是';
      },
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
