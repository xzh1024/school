// 资产调拨
import { getAjaxSelectClaimAllocationLine } from '@/api/historyData';
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
    getAjaxSelectClaimAllocationLine(data)
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
      title: '调出方信息',
      children: [
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
          title: '资产类别编码',
          width: 140,
          dataIndex: 'assetCategory',
        },
        {
          title: '资产类别',
          width: 140,
          dataIndex: 'assetType',
        },
        {
          title: '最新数量',
          width: 140,
          dataIndex: 'quantity',
        },
        {
          title: '最新原值',
          width: 140,
          dataIndex: 'fixedAssetsCost',
        },
        {
          title: '既定累计折旧',
          width: 140,
          dataIndex: 'deprnReserve',
        },
        {
          title: '最新运行折旧期间',
          width: 140,
          dataIndex: 'deprnPeriod',
        },
        {
          title: '可回收成本',
          width: 140,
          dataIndex: 'recoverableCost',
        },
        {
          title: '剩余折旧月数',
          width: 140,
          dataIndex: 'remainingDepreciationMonths',
        },
        {
          title: '当期折旧额',
          width: 140,
          dataIndex: 'deprnToday',
        },
        {
          title: '实际累计折旧',
          width: 140,
          dataIndex: 'actDeprnReserve',
        },
        {
          title: '累计减值',
          width: 140,
          dataIndex: 'reduce',
        },
        {
          title: '账面价值',
          width: 140,
          dataIndex: 'bookValue',
        },
        {
          title: '调拨价值',
          width: 140,
          dataIndex: 'allocationvalue',
        },
        {
          title: '发票类型',
          width: 140,
          dataIndex: 'invoiceTypeName',
        },
        {
          title: '税率',
          width: 140,
          dataIndex: 'taxRate',
        },

        {
          title: '发票金额（含税）',
          width: 140,
          dataIndex: 'invoiceAmount',
        },
        {
          title: '是否简易计税',
          width: 140,
          dataIndex: 'isSimpleTax',
          render: value => {
            return value === 'Y' ? '是' : '否';
          },
        },
        {
          title: '投入使用日期',
          width: 140,
          dataIndex: 'datePlacedInService',
        },
      ],
    },
    {
      title: '调入方信息',
      children: [
        {
          title: '标签号',
          width: 140,
          dataIndex: 'tagNumber',
        },
        {
          title: '销售税金及附加等',
          width: 140,
          dataIndex: 'sellTaxAndOthAmt',
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
          dataIndex: 'depreciationAccountName',
        },
        {
          title: '存放地点',
          width: 140,
          dataIndex: 'attribute2',
        },
        {
          title: '资产用途',
          width: 140,
          dataIndex: 'isWelfare',
        },
        {
          title: '享受减免计税设备',
          width: 140,
          dataIndex: 'inIsEnvironmentDevice',
        },
        {
          title: '资产备注信息',
          width: 140,
          dataIndex: 'remark',
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
      ></Table>
    </Spin>
  );
}
