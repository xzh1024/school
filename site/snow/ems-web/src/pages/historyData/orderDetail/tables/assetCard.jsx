// 资产卡片
import { getAssetCards } from '@/api/historyData';
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
    getAssetCards(data)
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
      align: 'center',
      dataIndex: 'index',
      render: (value, record, index) => index + 1,
    },
    {
      title: '资产编码',
      width: 140,
      dataIndex: 'assetNumber',
    },
    {
      title: '资产名称',
      width: 140,
      dataIndex: 'assetName',
    },
    {
      title: '调整前',
      children: [
        {
          title: '资产使用部门编码',
          width: 140,
          dataIndex: 'departmentCodeOld',
        },
        {
          title: '资产使用部门',
          width: 140,
          dataIndex: 'departmentNameOld',
        },
        {
          title: '费用承担部门编码',
          width: 140,
          dataIndex: 'expenseDepartmentCodeOld',
        },
        {
          title: '费用承担部门',
          width: 140,
          dataIndex: 'expenseDepartmentNameOld',
        },
        {
          title: '折旧费用科目',
          width: 140,
          dataIndex: 'depreciationAccountNameOld',
        },
        {
          title: '放置地点',
          width: 140,
          dataIndex: 'assetPlaceOld',
        },
        {
          title: '资产类别编码',
          width: 140,
          dataIndex: 'assetsCategoryCodeOld',
        },
        {
          title: '资产类别',
          width: 140,
          dataIndex: 'assetsCategoryNameOld',
        },
        {
          title: '使用状态',
          width: 140,
          dataIndex: 'useStatusOld',
        },
        {
          title: '残值类型',
          width: 140,
          dataIndex: 'salvageValueTypeOld',
        },
        {
          title: '残值百分比(%)',
          width: 140,
          dataIndex: 'salvageValuePercentageOld',
        },
        {
          title: '残值',
          width: 140,
          dataIndex: 'salvageValueOld',
        },
        {
          title: '资产备注信息',
          width: 140,
          dataIndex: 'assetRemarkOld',
        },
        {
          title: '计税面积',
          width: 140,
          dataIndex: 'landGroupOld',
        },
        {
          title: '享受减免计税设备',
          width: 140,
          dataIndex: 'isEnvironmentDeviceOld',
        },
      ],
    },
    {
      title: '调整后',
      children: [
        {
          title: '资产使用部门编码',
          width: 140,
          dataIndex: 'departmentCodeNew',
        },
        {
          title: '资产使用部门',
          width: 140,
          dataIndex: 'departmentNameNew',
        },
        {
          title: '费用承担部门编码',
          width: 140,
          dataIndex: 'expenseDepartmentCodeNew',
        },
        {
          title: '费用承担部门',
          width: 140,
          dataIndex: 'expenseDepartmentNameNew',
        },
        {
          title: '折旧费用科目',
          width: 140,
          dataIndex: 'depreciationAccountNameNew',
        },
        {
          title: '放置地点',
          width: 140,
          dataIndex: 'assetPlaceNew',
        },
        {
          title: '资产类别编码',
          width: 140,
          dataIndex: 'assetsCategoryCodeNew',
        },
        {
          title: '资产类别',
          width: 140,
          dataIndex: 'assetsCategoryNameNew',
        },
        {
          title: '使用状态',
          width: 140,
          dataIndex: 'useStatusNew',
        },
        {
          title: '残值类型',
          width: 140,
          dataIndex: 'salvageValueTypeNew',
        },
        {
          title: '残值百分比(%)',
          width: 140,
          dataIndex: 'salvageValuePercentageNew',
        },
        {
          title: '残值',
          width: 140,
          dataIndex: 'salvageValueNew',
        },
        {
          title: '资产备注信息',
          width: 140,
          dataIndex: 'assetRemarkNew',
        },
        {
          title: '计税面积',
          width: 140,
          dataIndex: 'taxableAreaNew',
        },
        {
          title: '计税分组',
          width: 140,
          dataIndex: 'landGroupNew',
        },
        {
          title: '享受减免计税设备',
          width: 140,
          dataIndex: 'isEnvironmentDeviceNew',
        },
        {
          title: '计划外折旧金额',
          width: 140,
          dataIndex: 'unplannedDepreciationAmount',
        },
        {
          title: '计划外折旧费用科目',
          width: 160,
          dataIndex: 'unplannedDepreciationAccountName',
        },
        {
          title: '资产用途',
          width: 140,
          dataIndex: 'isWelfare',
        },
      ],
    },
  ];

  const getSum = (data = [], key) => {
    let sum = new BigNumber(0);
    data.forEach(item => {
      sum = sum.plus(item[key] || 0);
    });
    return sum.toString();
  };

  const toolsLeft = (
    <div className="flex items-center">
      <div>
        最新原值合计：<span className="font-bold">{getSum(dataSource, 'fixedAssetsCost')}</span>
      </div>
      <div className="mx-3">
        实际累计折旧合计：<span className="font-bold">{getSum(dataSource, 'actDeprnReserve')}</span>
      </div>
      <div>
        账面价值合计：<span className="font-bold">{getSum(dataSource, 'bookValue')}</span>
      </div>
    </div>
  );

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
        toolsLeft={toolsLeft}
        hideTools
      ></Table>
    </Spin>
  );
}
