import { getCutList } from '@/api/historyData';
import Table from '@c/proTable';
import { Spin } from 'antd';
import React from 'react';

export default function Index(props) {

  const { claimId = 292618 } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getList(claimId);
  }, []);

  const getList = (data) => {
    setLoading(true);
    getCutList(data).then(res => {
      const dictMap = {};
      (res.data.deductTypeList || []).forEach(item => {
        dictMap[item.dictCode] = item.dictName;
      });

      setDataSource((res.data.claimDeductLines || []).map(item => ({
        ...item,
        deductName: dictMap[item.deductType],
      })));
    }).finally(() => {
      setLoading(false);
    });
  };
  
  const columns = [
    {
      title: '扣款类型',
      dataIndex: 'deductName',
    },
    {
      title: '扣款日期',
      dataIndex: 'deductDate',
    },
    {
      title: '扣款金额',
      dataIndex: 'deductAmount',
    },
    {
      title: '描述',
      width: 160,
      dataIndex: 'deductDesc',
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
