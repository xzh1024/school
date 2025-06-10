import { getPaymentDetail, getPaymentList } from '@api/historyData';
import Table from '@c/proTable';
import { Button, Descriptions, Modal, Spin } from 'antd';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../store';

const ITEM_DETAIL = {
  paymentModeName: {
    title: '付款方式',
  },
  ouName: {
    title: '实际付款公司',
  },
  accountName: {
    title: '银行账户名称',
  },
  accountNo: {
    title: '银行账号',
  },
  configFileCodeName: {
    title: '单据处理配置文件',
  },
  payTpName: {
    title: '付款单据',
  },
  tpCodeName: {
    title: '单据类型',
  },
  settleTypeName: {
    title: '结算方式',
  },
  remittanceSpeedName: {
    title: '汇款速度',
  },
  transfersTypeName: {
    title: '转账类型',
  },
  fundPlan: {
    title: '资金计划',
    span: 2,
  },
  summary: {
    title: '摘要',
    span: 3,
  },
  purpose: {
    title: '用途',
    span: 3,
  },
};

function Index() {
  const { historyData } = useStores();
  const { claimUrlParams } = historyData;
  const { expCategoryId, bizId } = claimUrlParams;

  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [descriptionData, setDescriptionData] = React.useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    setLoading(true);
    getPaymentList({
      expCategoryId: expCategoryId,
      claimId: bizId,
    })
      .then(res => {
        console.log(res, 12333);
        setDataSource(res.data.payRequestLineList);
      })
      .finally(() => setLoading(false));
  };

  const getPayDetail = (record, payWay) => {
    const payInfo = record.payInfoList.find(item => item.payWay === payWay);
    const data = {
      payRequestLineId: record.payRequestLineId,
      payRequestClaimId: record.payRequestClaimId,
      payRequestLinePayInfo: {
        payRequestLinePayInfoId: payInfo?.payRequestLinePayInfoId,
      },
    };

    setLoading(true);
    getPaymentDetail(data)
      .then(res => {
        const infoData = res.data.payRequestLinePayInfo || {};
        const data = [];

        Object.keys(ITEM_DETAIL).forEach(key => {
          const item = ITEM_DETAIL[key];
          const value = infoData[key];
          data.push({
            key,
            label: item.title,
            span: item.span || 1,
            children: item.render ? item.render(value, infoData) : value,
          });
        });

        console.log(data, 1333333);

        setDescriptionData(data);
        setShowModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 120,
      align: 'center',
      fixed: 'left',
      render: (value, record, index) => index + 1,
    },
    {
      title: '发票供应商',
      fixed: 'left',
      dataIndex: 'vendorName',
    },
    {
      title: '供应商地点',
      dataIndex: 'vendorSiteValidate',
      render: (value, record) => {
        return record.vendorIsValidate === 0 ? record.vendorSiteValidate : record.vendorSite;
      },
    },
    {
      title: '收款方户名',
      dataIndex: 'vendorAccountNameDisplay',
    },
    {
      title: '收款方账号',
      dataIndex: 'vendorIsValidate',
      render: (value, record) => {
        return record.vendorIsValidate === 0 ? record.vendorAccountNoValidate : record.vendorAccountNo;
      },
    },
    {
      title: '是否委托付款',
      dataIndex: 'openEntrustEdit',
      render: (value, record) => {
        return value ? '否' : '是';
      },
    },

    {
      title: '发票编号',
      dataIndex: 'invoiceNo',
    },
    {
      title: '请款类型',
      dataIndex: 'displayRequestPaymentType',
    },
    {
      title: '付款类型',
      dataIndex: 'displayPayType',
    },
    {
      title: '原始到期日',
      dataIndex: 'dueToDateBak',
      render: value => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      title: '到期日',
      dataIndex: 'dueToDate',
      render: value => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      title: '发票入账日期',
      dataIndex: 'invoiceDate',
      render: value => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      title: '到期金额',
      dataIndex: 'dueDateBalance',
    },
    {
      title: '发票摘要',
      dataIndex: 'orderRemark',
    },
    {
      title: '经办人',
      dataIndex: 'operateName',
    },
    {
      title: '申请付款金额',
      dataIndex: 'applyAmount',
    },
    {
      title: '汇票金额',
      dataIndex: 'payInfoList',
      render: value => {
        let sum = new BigNumber(0);
        (value || []).forEach(item => {
          if (item.payWay === '3') {
            sum = sum.plus(item.amount);
          }
        });
        return sum.toString();
      },
    },
    {
      title: '转账金额',
      dataIndex: 'payInfoList',
      render: value => {
        let sum = new BigNumber(0);
        (value || []).forEach(item => {
          if (item.payWay === '1') {
            sum = sum.plus(item.amount);
          }
        });
        return sum.toString();
      },
    },
    {
      title: '其他金额',
      dataIndex: 'payInfoList',
      render: value => {
        let sum = new BigNumber(0);
        (value || []).forEach(item => {
          if (item.payWay === '5') {
            sum = sum.plus(item.amount);
          }
        });
        return sum.toString();
      },
    },
    {
      title: '合同名称',
      dataIndex: 'contractName',
    },
    {
      title: '合同编码',
      dataIndex: 'contractNo',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
    },

    {
      title: '项目编码',
      dataIndex: 'projectCode',
    },
    {
      title: '币种',
      dataIndex: 'currencyName',
    },
    {
      title: '备注',
      dataIndex: 'transPayRemark',
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      dataIndex: 'payAmount',
      render: (value, record) => {
        return (
          <>
            <Button type="link" onClick={() => getPayDetail(record, '3')}>
              票据付款信息
            </Button>
            <Button type="link" onClick={() => getPayDetail(record, '1')}>
              转账付款信息
            </Button>
            <Button type="link" onClick={() => getPayDetail(record, '5')}>
              其他付款信息
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="order-detail-table">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{
            x: 'max-content',
          }}
          hideTools
        ></Table>
      </div>
      {showModal && (
        <Modal open title="付款信息" footer={null} width={'80%'} onCancel={() => setShowModal(false)}>
          <Descriptions bordered items={descriptionData} size="small"></Descriptions>
        </Modal>
      )}
    </Spin>
  );
}

export default observer(Index);
