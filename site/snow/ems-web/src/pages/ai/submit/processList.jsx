import { openClaim } from '@api/index';
import SvgIcon from '@c/svgIcon';
import React from 'react';
import Loading from './loading';

export default function Index(props) {
  const { list = [], answer = {}, slot, isHistory } = props;

  const renderBillError = answer => {
    const data = JSON.parse(answer);
    return (data.errorList || []).map((errItem, errIndex) => (
      <div key={errIndex}>
        {errItem.billNumber}
        发票重复，重复单号
        {errItem.claimNo}
      </div>
    ));
  };

  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  const renderPeriodError = answer => {
    const data = JSON.parse(answer);
    return (data.errorList || []).map((errItem, errIndex) => (
      <div key={errIndex}>
        {errItem.accountPeriod}
        账期已被占用，占用单号
        {errItem.claimNo}
        ，发票
        {errItem.billNumberList.join('、')}
        已自动剔除。
      </div>
    ));
  };

  const phoneBillSuccess = datas => {
    return (
      <div className="">
        <div>
          报账完成！雪宝已为您生成报账单：
          <span className="text-[#2c68ff] cursor-pointer" onClick={() => jumpToClaim(datas.claimId)}>
            {datas.reimburseNumber}
          </span>
          ，您可以点击报账单号在“我的报账单-已提交”中查看详情。
        </div>
        {datas.accountPeriodList ? (
          <div className="rounded-xl mt-3 p-4 gap-2 border border-solid border-[#d3d9e6] max-w-[431px]">
            <div className="mb-4 relative overflow-hidden">
              <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">报账账期</div>
              <div className="text-right pl-[100px] flex-none text-[#333333] text-sm leading-[22px]">
                {datas.accountPeriodList.join('、')}
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[150px] left-0">
                实报金额合计（CNY）
              </div>
              <div className="text-right pl-[100px] flex-none text-[#333333] text-sm leading-[22px]">
                {datas.amountTotal}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  return (
    <>
      {list.map((content, index) => {
        return content.answerContentType === 'templateType_billRepeat' ? (
          renderBillError(content.answer || '')
        ) : content.answerContentType === 'templateType_periodRepeat' ? (
          renderPeriodError(content.answer || '')
        ) : (
          <div className="flex items-center" key={index}>
            <div>{content.answer}</div>
            {content.showSuccess && <SvgIcon name="process-success" className="ml-3"></SvgIcon>}
            {content.showError && <SvgIcon name="process-error" className="ml-3"></SvgIcon>}
            {content.loading && !isHistory && (
              <div className={content ? 'ml-2' : ''}>
                <Loading />
              </div>
            )}
          </div>
        );
      })}
      {answer?.phoneBillSuccess && phoneBillSuccess(answer.phoneBillSuccess)}
      {slot ? <div>{slot}</div> : ''}
    </>
  );
}
