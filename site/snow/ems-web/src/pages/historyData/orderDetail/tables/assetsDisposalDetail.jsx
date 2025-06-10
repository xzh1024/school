// 资产处置
import { getAjaxListClaimDisposaLineByClaimId } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
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
    getAjaxListClaimDisposaLineByClaimId(data)
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
      title: '购入日期',
      width: 140,
      dataIndex: 'datePlacedInService',
      render: value => {
        return dayjs(value).format('YYYY-MM-DD');
      },
    },
    {
      title: '减值',
      width: 140,
      dataIndex: 'reduce',
    },
    {
      title: '清理费用',
      width: 140,
      dataIndex: 'cleanCosts',
    },
    {
      title: '处置收入',
      width: 140,
      dataIndex: 'disposaRevenue',
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
      title: '不含税处置收入',
      width: 140,
      dataIndex: 'notaxDisposaRevenue',
    },
    {
      title: '税金',
      width: 140,
      dataIndex: 'taxAmount',
    },
    {
      title: '账面价值',
      width: 140,
      dataIndex: 'retirementNbvRetired',
    },
    {
      title: '处置损益',
      width: 140,
      dataIndex: 'disposaIncome',
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
        原值合计：<span className="font-bold">{getSum(dataSource, 'fixedAssetsCost')}</span>
      </div>
      <div className="mx-3">
        不含税处置收入合计：<span className="font-bold">{getSum(dataSource, 'notaxDisposaRevenue')}</span>
      </div>
      <div>
        税金合计：<span className="font-bold">{getSum(dataSource, 'taxAmount')}</span>
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
