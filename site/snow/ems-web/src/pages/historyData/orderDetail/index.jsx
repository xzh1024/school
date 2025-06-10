import { RollbackOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import ProSkeleton from '@ant-design/pro-skeleton';
import { getClaimDetail, imageUrl } from '@api/historyData';
import SvgIcon from '@c/svgIcon';
import { getValueByPath } from '@u/tools';
import { Badge, Button, Descriptions, Tabs, theme, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';
import Circularize from './circularize';
import CommunicationTable from './communication';
import PayTable from './payTable';
import PriceDrawer from './priceDrawer';
import Process from './process';
import DetailTable from './table';
import TravelOrderInfo from './travelOrderInfo';

const BASE_INFO = {
  claimNo: '报账单号',
  applyEmpName: '申请人',
  applyDeptName: '申请部门',
  applyCompName: '申请人公司',
  applyJobName: '申请人职务',
  applyEmail: '申请人邮箱',
  applyPhone: '申请人电话',
  applyDate: '申请日期',
};

const REAL_REIMBURSEMENT_INFO = {
  sjApplyEmpName: '实际报销人',
  sjApplyDeptName: '报销人部门',
  sjApplyOrgName: '报销人公司',
  sjApplyJobName: '报销人职务',
  sjApplyEmail: '报销人邮箱',
  sjApplyPhone: '报销人电话',
};

let IMAGE_LOADING = false;

const CLAIM_INFO = {
  'claimBase.ouName': {
    title: '归属公司',
  },
  'claimBase.item2Name': {
    title: '业务类别',
  },

  'claimBase.attachNum': {
    title: '附件张数',
  },
  'claimBase.vendorName': {
    title: '员工/供应商名称',
  },
  'claimBase.glDate': {
    title: '总账期间',
  },
  visitorAvailable: {
    title: '当前可用次数',
  },
  extend6: {
    title: '推送润出行订票',
    render: value => {
      return value === 'Y' ? '是' : '否';
    },
  },
  visitorStandard: {
    title: '月标准次数',
  },
  visitorType: {
    title: '本人/非本人',
  },
  visitorName: {
    title: '出行人',
  },
  'claimBase.accountItemName': {
    title: '银行子目',
  },
  'claimBase.contractName': {
    title: '合同名称',
  },
  'claimBase.contractNo': {
    title: '合同编号',
  },
  'claimBase.extend77': {
    title: '现金流标签',
  },
  'claimBase.paymentMode': {
    title: '预计付款方式',
    render: (value, { paymentModeDataDictList }) => {
      const res = paymentModeDataDictList.find(item => item.dictCode === value);
      return res ? res.dictName : '';
    },
  },
  'claimBase.currency': {
    title: '币种',
    render: value => {
      return value === 'CNY' ? '人民币' : value;
    },
  },
  'acquiringBase.hasPhysicalBills': {
    title: '有无实物邮寄',
    render: value => {
      return value ? '有' : '无';
    },
  },
  'claimBase.extend74': {
    title: '研发项目',
  },
  'claimBase.remark': {
    title: '报账事由',
  },
};

function Index() {
  const { token } = theme.useToken();
  const [baseInfo, setBaseInfo] = useState([]);
  const [claimInfo, setClaimInfo] = useState([]);
  const [baseInfoLoading, setBaseInfoLoading] = useState(false);
  const [realReimbursementInfo, setRealReimbursementInfo] = useState([]);

  const { globalStore, historyData } = useStores();
  const { claimUrlParams, currentRecord, msgCount } = historyData;
  const [loading, setLoading] = useState(false);
  const [claimBaseData, setClaimBaseData] = useState({});

  // 是否待报
  const [isDaibao, setIsDaobao] = useState(false);

  const getBaseDetail = data => {
    setBaseInfoLoading(true);
    getClaimDetail(data)
      .then(res => {
        const claimBase = res.data.claimBase || {};
        const baseInfos = [];
        const claimInfos = [];
        const realReimbursementInfos = [];
        const paymentModeDataDictList = res.data.paymentModeDataDictList || [];
        Object.keys(claimBase).forEach(key => {
          if (BASE_INFO[key]) {
            baseInfos.push({
              key,
              label: BASE_INFO[key],
              children: key === 'applyDate' ? dayjs(claimBase[key]).format('YYYY-MM-DD HH:mm:ss') : claimBase[key],
            });
          }

          if (REAL_REIMBURSEMENT_INFO[key]) {
            realReimbursementInfos.push({
              key,
              label: REAL_REIMBURSEMENT_INFO[key],
              children: claimBase[key],
            });
          }
        });

        // 报账信息
        Object.keys(CLAIM_INFO).forEach(key => {
          const item = CLAIM_INFO[key];
          const value = getValueByPath(res.data, key);
          claimInfos.push({
            key,
            label: item.title,
            span: item.span || 1,
            children: item.render
              ? item.render(value, {
                  paymentModeDataDictList,
                })
              : value,
          });
        });

        setIsDaobao(String(claimBase.isDaibao) === '1');
        setClaimBaseData(claimBase);
        setBaseInfo(baseInfos);
        setClaimInfo(claimInfos);
        setRealReimbursementInfo(realReimbursementInfos);
      })
      .finally(() => {
        setBaseInfoLoading(false);
      });
  };

  useEffect(() => {
    getBaseDetail({
      expCategoryId: claimUrlParams.expCategoryId,
      processTemplateCode: claimUrlParams.processTemplateCode,
      processTemplateVersion: claimUrlParams.processTemplateVersion,
      isNewFrontEnd: claimUrlParams.isNewFrontEnd,
      loginFrom: 'formView',
      SSOUserName: claimUrlParams.SSOUserName,
      openMode: claimUrlParams.openMode,
      bizId: claimUrlParams.bizId,
      orgId: currentRecord.orgId,
      positionId: currentRecord.positionId,
    });

    historyData.getMsgCount(claimUrlParams.bizId);
  }, []);

  const tabs = [
    {
      key: '1',
      label: '审批历史',
      children: <Process {...currentRecord} {...claimUrlParams} />,
    },
    {
      key: '2',
      label: '沟通历史',
      children: <CommunicationTable {...currentRecord} {...claimUrlParams} />,
    },
    {
      key: '3',
      label: '传阅历史',
      children: <Circularize {...currentRecord} {...claimUrlParams} />,
    },
  ];

  const openImage = () => {
    if (IMAGE_LOADING) return;
    IMAGE_LOADING = true;
    console.log(claimUrlParams, 123, currentRecord);
    // btnType=view&SSOUserName=LINZEMIN5&claimId=54740642&orgId=3574336&positionId=34080&stateType=10&openMode=4&randomTimeStamp=1728996404811
    imageUrl({
      btnType: 'view',
      SSOUserName: claimUrlParams.SSOUserName,
      claimId: claimUrlParams.bizId,
      orgId: currentRecord.orgId,
      positionId: currentRecord.positionId,
      stateType: 10,
      openMode: 4
    })
      .then(res => {
        console.log(res, 312312);
        if (res.data.imageToken) {
          sessionStorage.setItem('imageToken', res.data.imageToken);
          sessionStorage.setItem('claimId', claimUrlParams.bizId);
          sessionStorage.setItem('claimNo', res.data.claimNo);
        }
        window.open(res.data.url, '_blank');
      })
      .finally(() => {
        IMAGE_LOADING = false;
      });
  };

  const title = (
    <div className="flex items-center">
      <Tooltip title={'返回'} className="mr-2 cursor-pointer">
        <RollbackOutlined onClick={() => window.history.go(-1)} className="text-main-blue-5" />
      </Tooltip>
      <span>报账单详情</span>
    </div>
  );

  const openWarningPage = () => {
    let url =
      process.env.REACT_APP_MAIN_HOST +
      `/claim-order-detail/warning-message?claimId=${claimUrlParams.bizId}&SSOUserName=${claimUrlParams.SSOUserName}&ouCode=${currentRecord.orgId}`;
    window.open(url, '_blank');
  };

  const extra = msgCount => {
    return (
      <div className='flex items-center'>
        <Button size="small" className="mr-4" type="primary" onClick={openImage}>
          电子影像
        </Button>
        <Badge
          size="small"
          count={msgCount}
          overflowCount={99}
          showZero
          className="cursor-pointer"
          onClick={openWarningPage}
        >
          <SvgIcon name="ring" className="w-6"></SvgIcon>
        </Badge>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: token.colorBgLayout,
      }}
    >
      <PageContainer
        fixedHeader
        style={{
          backgroundColor: token.colorBgLayout,
        }}
        header={{
          title: title,
          extra: extra(msgCount),
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        {loading ? (
          <div
            style={{
              padding: 24,
            }}
          >
            <ProSkeleton type="list" pageHeader={false} />
          </div>
        ) : (
          <>
            <ProCard ghost className="min-h-40 mt-4 w-full">
              <ProCard bordered style={{ background: '#fff', width: '100%' }}>
                <Tabs defaultActiveKey="1" items={tabs}></Tabs>
              </ProCard>
            </ProCard>

            <ProCard
              ghost
              className="min-h-40 mt-4 w-full"
              direction="column"
              style={{ background: '#fff', height: '100%' }}
            >
              <ProCard loading={baseInfoLoading} title="基本信息">
                <Descriptions bordered items={baseInfo} className="w-full" size="small" />
              </ProCard>
              {isDaibao && (
                <ProCard loading={baseInfoLoading} title="实际报销人信息">
                  <Descriptions bordered items={realReimbursementInfo} className="w-full" size="small" />
                </ProCard>
              )}
              <ProCard loading={baseInfoLoading} title="报账信息">
                <Descriptions bordered items={claimInfo} className="w-full" size="small" />
              </ProCard>
            </ProCard>

            <ProCard
              className="min-h-40 mt-4 w-full"
              title={claimUrlParams.isPaymentApply ? '付款申请明细' : '明细信息'}
            >
              {claimUrlParams.isPaymentApply ? <PayTable></PayTable> : <DetailTable claimBase={claimBaseData} />}
            </ProCard>
            {['6532', '979530'].includes(claimUrlParams.expCategoryId) && (
              <ProCard className="min-h-40 mt-4 w-full" title="订单信息">
                <TravelOrderInfo claimBase={claimBaseData}></TravelOrderInfo>
              </ProCard>
            )}

            <PriceDrawer />
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default observer(Index);
