import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../../store';
import ApportionmentDetail from './tables/apportionmentDetail';
import AssetCards from './tables/assetCard';
import AssetsDetail from './tables/assetsDetail';
import AssetsDisposalDetail from './tables/assetsDisposalDetail';
import Attach from './tables/attachmentsTable';
import ClaimTable from './tables/claimTable';
import ConstructionDetail from './tables/constructionDetail';
import ConstructionProcess from './tables/constructionProcess';
import CutTable from './tables/cutTable';
import HistoryDocuments from './tables/historyDocuments';
import ImprovementDetail from './tables/improvementDetail';
import Invoice from './tables/invoiceTable';
import Irregularity from './tables/irregularityTable';
import PayList from './tables/payList';
import PaymentSchedule from './tables/paymentSchedule';
import Tax from './tables/taxTable';
import TradeObject from './tables/tradeObjectDetail';
import TransferDetail from './tables/transferDetail';
import UnamortizedDetail from './tables/unamortizedDetail';
import SettlementDetail from './tables/settlementDetail';

function Index({ claimBase }) {
  const { historyData } = useStores();
  const { claimUrlParams, currentRecord } = historyData;

  const getTabs = (claimUrlParams, currentRecord) => {
    const data = [
      {
        key: '1',
        label: '报账明细',
        sort: 1,
        children: <ClaimTable claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '2',
        label: '税金明细',
        sort: 2,
        children: <Tax claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '12',
        label: '资产明细',
        sort: 2,
        children: <AssetsDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '121',
        label: '资产调整卡片',
        sort: 2,
        children: <AssetCards claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '122',
        label: '在建工程调整',
        sort: 2,
        children: <ConstructionDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '3',
        label: '发票明细',
        sort: 3,
        children: <Invoice claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '4',
        label: '不合规票据明细',
        sort: 4,
        children: <Irregularity claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '41',
        label: '待摊明细',
        sort: 4,
        children: <UnamortizedDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '42',
        label: '分摊明细',
        sort: 4,
        children: <ApportionmentDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '43',
        label: '固定资产改良转出明细',
        sort: 4,
        children: <ImprovementDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '44',
        label: '资产处置明细',
        sort: 4,
        children: <AssetsDisposalDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '46',
        label: '交易对象明细',
        sort: 4,
        children: <TradeObject claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '45',
        label: '调拨明细',
        sort: 4,
        children: <TransferDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '10',
        label: '付款清单',
        sort: 5,
        children: <PayList claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '5',
        label: '扣款明细',
        sort: 6,
        children: <CutTable claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '51',
        label: '付款计划',
        sort: 6,
        children: <PaymentSchedule claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '9',
        label: '附件列表',
        sort: 7,
        children: <Attach claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '91',
        label: '结算明细',
        sort: 7,
        children: <SettlementDetail claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '11',
        label: '历史单据列表',
        sort: 8,
        children: <HistoryDocuments claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
      {
        key: '13',
        label: '在建工程明细',
        sort: 3,
        children: <ConstructionProcess claimId={currentRecord.claimId} {...claimUrlParams} claimBase={claimBase} />,
      },
    ];

    return data.sort((a, b) => a.sort - b.sort);
  };

  return (
    <Tabs defaultActiveKey="1" items={getTabs(claimUrlParams, currentRecord)} className="order-detail-table"></Tabs>
  );
}

export default observer(Index);
