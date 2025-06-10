// 付款计划
import { getAjaxSelectCSL } from '@/api/historyData';
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
    getAjaxSelectCSL(data)
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
      title: '分摊金额',
      width: 140,
      dataIndex: 'shareAmount',
    },
    {
      title: '摊入类别',
      width: 140,
      dataIndex: 'shareTypeName',
    },
    {
      title: '项目编号及名称',
      width: 140,
      dataIndex: 'itemName',
    },
    {
      title: '计入在建工程类别',
      width: 140,
      dataIndex: 'constructionTypeName',
    },
    {
      title: '资产编号',
      width: 140,
      dataIndex: 'assetNo',
    },
    {
      title: '资产名称',
      width: 140,
      dataIndex: 'assetName',
    },
    {
      title: '资产类别',
      width: 140,
      dataIndex: 'assetType',
    },
    {
      title: '资产原值',
      width: 140,
      dataIndex: 'originalValueOfAssets',
    },
    {
      title: '变动后金额',
      width: 140,
      dataIndex: 'amountAfterChange',
    },
    {
      title: '是否勾选折旧勾',
      width: 140,
      dataIndex: 'depreciateFlag',
    },

  ];

  const sum = (data = []) => {
    let sum = new BigNumber(0);
    dataSource.forEach(item => {
      sum = sum.plus(item.shareAmount);
    });
    return sum.toString();
  };

  return (
    <Spin spinning={loading}>
      <Table
        toolsLeft={
          <div>
            分摊金额合计：<b className='font-bold'>{sum(dataSource)}</b>
          </div>
        }
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
