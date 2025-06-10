import { getAmount, getBalanceList, getRelevantList } from '@/api/historyData/index';
import Table from '@c/proTable';
import { Table as AntdTable, Button, Descriptions, Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../../store';

const FILED_MAP = {
  applyAmount: {
    label: '报账金额',
    span: 4,
    key: 'applyAmount',
  },
  priceAmount: {
    key: 'priceAmount',
    label: '报账金额--价款',
    span: 2,
  },
  taxAmount: {
    key: 'taxAmount',
    label: '报账金额--税款',
    span: 2,
  },
  currentWriteOffAmount: {
    key: 'currentWriteOffAmount',
    label: '核销金额',
    span: 2,
  },
  deductAmount: {
    key: 'deductAmount',
    label: '扣款金额',
    span: 2,
  },
  payAmount: {
    key: 'payAmount',
    label: '待付金额',
    span: 2,
  },
  thisTimePayAmount: {
    key: 'thisTimePayAmount',
    label: '待付金额--本次付款',
    span: 2,
  },
};

function Index(props) {
  const { historyData } = useStores();
  const { claimUrlParams, currentRecord } = historyData;
  const [isShow, setIsShow] = React.useState(false);
  const [showOtherOrders, setShowOtherOrders] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [relevantData, setRelevantData] = React.useState([]);
  const [balanceData, setBalanceData] = React.useState([]);

  const handleViewRelevant = () => {
    setLoading(true);
    getRelevantList(currentRecord.claimId)
      .then(res => {
        console.log(res, 7777);
        setRelevantData(res.data);
        setShowOtherOrders(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleViewBalance = () => {
    setLoading(true);
    getBalanceList({ claimId: currentRecord.claimId })
      .then(res => {
        console.log(res, 7777);
        setBalanceData(res.data);
        setShowBalance(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const defaultItems = [
    {
      key: 'viewBtn',
      label: '相关单据查看',
      children: (
        <Button type="link" onClick={handleViewRelevant}>
          查看
        </Button>
      ),
      span: 2,
    },
    {
      key: 'viewBtn1',
      label: '余额单据查看',
      children: (
        <div>
          <Button type="link" onClick={handleViewBalance}>
            查看
          </Button>
        </div>
      ),
      span: 2,
    },
  ];

  const getData = () => {
    setLoading(true);
    getAmount({
      expCategoryId: claimUrlParams.expCategoryId,
      claimId: currentRecord.claimId,
      openMode: claimUrlParams.openMode,
      refreshAmountFlag: false,
      orgId: currentRecord.orgId,
      readOnly: true,
      conversionRate: 1,
      positionId: currentRecord.positionId,
    })
      .then(res => {
        const resData = res.data;
        const datas = [];
        Object.keys(FILED_MAP).forEach(key => {
          const item = FILED_MAP[key];
          datas.push({
            ...item,
            children: resData[key] || 0,
          });
        });
        setData([...datas, ...defaultItems]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOpen = () => {
    if (!data && !isShow) {
      getData();
    }
    setIsShow(!isShow);
  };

  const expandedRowRender = record => {
    const data = record.writeOffClaimBaseVoList;
    return (
      <AntdTable
        columns={[
          {
            title: '报账单号',
            dataIndex: 'claimNo',
          },
          {
            title: '借款金额',
            dataIndex: 'reimburseAmount',
          },
          {
            title: '单据余额',
            dataIndex: 'accountBalance',
          },
          {
            title: '报账日期',
            dataIndex: 'loanApplyDate',
            render: (text, record) => {
              return text ? dayjs(text).format('YYYY-MM-DD') : text;
            },
          },
          {
            title: '归属公司',
            dataIndex: 'ouName',
          },
          {
            title: '项目',
            dataIndex: 'extend91',
          },
          {
            title: '报账事由',
            dataIndex: 'remark',
          },
        ]}
        dataSource={data}
        pagination={false}
        rowKey={record => JSON.stringify(record)}
      ></AntdTable>
    );
  };

  return (
    <>
      <div
        className={
          isShow
            ? 'fixed right-0 top-1/4 z-50 transition-all duration-500'
            : 'fixed right-[-280px] top-1/4 z-50 transition-all duration-500'
        }
      >
        <div
          className="p-2 text-white rounded-l-md text-sm bg-main-blue cursor-pointer float-left inline-block"
          style={{ writingMode: 'vertical-lr' }}
          onClick={handleOpen}
        >
          报账及付款金额
        </div>
        <div className="px-4 py-2 bg-white dark:bg-main-bg-dark w-[360px] min-h-[114px] float-left inline-block shadow">
          <Spin spinning={loading}>
            <Descriptions
              labelStyle={{
                alignItems: 'center',
              }}
              title="报账及付款金额"
              items={data}
              column={4}
            />
          </Spin>
        </div>
      </div>
      {showOtherOrders && (
        <Modal width={900} title="相关单据" open footer={null} onCancel={() => setShowOtherOrders(false)}>
          <Table
            columns={[
              {
                title: '单据类型',
                dataIndex: 'name',
              },
              {
                title: '单号',
                dataIndex: 'code',
              },
            ]}
            dataSource={relevantData}
            toolsLeft={null}
            scroll={{
              x: 'max-content',
            }}
            hideTools
            pagination={false}
          />
        </Modal>
      )}

      {showBalance && (
        <Modal width={1200} title="余额单据" open footer={null} onCancel={() => setShowBalance(false)}>
          <Table
            columns={[
              {
                title: '供应商编码',
                dataIndex: 'vendorCode',
              },
              {
                title: '员工/供应商名称',
                dataIndex: 'vendorName',
              },
              {
                title: '类型',
                dataIndex: 'tpCode',
              },
              {
                title: '余额',
                dataIndex: 'employeeBalance',
              },
            ]}
            dataSource={balanceData}
            toolsLeft={null}
            scroll={{
              x: 'max-content',
            }}
            expandable={{
              expandedRowRender,
            }}
            hideTools
            pagination={false}
          />
        </Modal>
      )}
    </>
  );
}

export default observer(Index);
