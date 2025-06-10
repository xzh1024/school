import { getClaimBaseLine, getDrinkList, getTravelList, getVisitInfosList } from '@/api/historyData';
import Table from '@c/proTable';
import { Button, Modal, Spin } from 'antd';
import columnsByFormId from './claimBaseLineColumns';

import React from 'react';
import dayjs from 'dayjs';


const DRINK_TABLE_COLUMNS = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'index',
    render: (value, record, index) => index + 1,
  },
  {
    title: '酒水类型',
    width: 120,
    dataIndex: 'type',
  },
  {
    title: '单价',
    width: 120,
    dataIndex: 'unitPrice',
  },
  {
    title: '数量',
    width: 120,
    dataIndex: 'quantity',
  },
  {
    title: '金额',
    width: 120,
    dataIndex: 'amount',
  },
  {
    title: '领用日期',
    width: 120,
    dataIndex: 'applyDate',
    render: (value) => dayjs(value).format('YYYY-MM-DD')
  },
  {
    title: '备注',
    width: 120,
    dataIndex: 'remark',
  },
];

export default function Index(props) {
  const { claimId = 51780795, expCategoryId = 2745, formId } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const [drinkModal, setDrinkModal] = React.useState(false);
  const [drinkData, setDrinkData] = React.useState([]);

  React.useEffect(() => {
    getList({
      claimId,
      expCategoryId,
    });
  }, []);

  const getList = data => {
    setLoading(true);
    let func = getClaimBaseLine;

    switch (expCategoryId) {
      case '6532':
        func = getTravelList;
        break;
      case '979530':
        func = getVisitInfosList;
        break;
      default:
        func = getClaimBaseLine;
    }

    func(data)
      .then(res => {
        setDataSource(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 查看领酒明细
  const toggleDrink = record => {
    const data = {
      claimId: record.claimId,
      baseLineId: record.baseLineId,
    };
    setLoading(true);
    getDrinkList(data)
      .then(res => {
        console.log(data, 333333);
        setDrinkData(res.data);
        setDrinkModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getColumns = formId => {
    const columns = columnsByFormId(formId);
    // 非食堂领用酒操作
    if (expCategoryId === '2668') {
      columns.forEach(item => {
        if (item.dataIndex === 'applyDrinkFlag') {
          item.render = (value, record) => {
            return value === 'Y' ? (
              <Button type="link" onClick={() => toggleDrink(record)}>
                查看明细
              </Button>
            ) : null;
          };
        }
      });
    }

    return columns;
  };



  return (
    <Spin spinning={loading}>
      <Table
        columns={getColumns(formId)}
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
      {drinkModal && (
        <Modal open title="领酒明细" footer={null} width={'60%'} onCancel={() => setDrinkModal(false)}>
          <Table
            columns={DRINK_TABLE_COLUMNS}
            dataSource={drinkData}
            scroll={{
              x: 'max-content',
            }}
            cardProps={{
              style: { padding: 0 },
            }}
            pagination={false}
            hideTools
          ></Table>
        </Modal>
      )}
    </Spin>
  );
}
