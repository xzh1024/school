import { observer } from 'mobx-react';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { Image } from 'antd';
import IconPicture from 'public/images/ai/icon_picture.png';

let uuids = uuid();

// 移动通讯费
function Index(props) {
  const { errorBillList } = props;

  return (
    <div className="">
      <div className="text-base font-normal leading-6 text-[#0B0D0F]">
        以下发票识别或校验异常，雪宝不能帮你报销哦，可使用传统方式报销
      </div>
      <div className="gap-[10px]">
        {errorBillList.map((billItem, index) => (
          <div key={index} className="error-bill-item bg-[#FCF5F3] rounded-[6px] p-2 w-[450px] mt-2">
            <div className="flex items-center text-sm font-semibold leading-[22px] text-[#333333] mb-2">
              <div className="flex-1 break-all">
                {billItem.billNumber || (billItem.resource && billItem.resource.realName)}
              </div>
              {billItem.billUrl && billItem.billUrl.split('.').pop().toLocaleLowerCase() !== 'pdf' ? (
                <Image
                  key={index}
                  src={IconPicture}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    marginLeft: '8px',
                    marginBottom: '3px',
                  }}
                  preview={{
                    src: billItem.billUrl,
                    mask: null,
                  }}
                />
              ) : (
                ''
              )}
            </div>
            {billItem.billRepeatFlag ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">重复发票</div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">是</div>
              </div>
            ) : (
              ''
            )}
            {billItem.billTypeFlag !== '1' ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">发票类型</div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">未识别</div>
              </div>
            ) : (
              ''
            )}
            {billItem.totalAmountFlag !== '1' ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">金额</div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">未识别</div>
              </div>
            ) : (
              ''
            )}
            {billItem.accountPeriodFlag !== '1' ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">帐期</div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">未识别</div>
              </div>
            ) : (
              ''
            )}
            {billItem.standardFlag ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">标准</div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">未获取</div>
              </div>
            ) : (
              ''
            )}
            {billItem.sameMonthCheck ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">同月校验</div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">是</div>
              </div>
            ) : (
              ''
            )}
            {billItem.notOneself ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">
                  发票抬头校验
                </div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">非本人报销</div>
              </div>
            ) : (
              ''
            )}
            {billItem.abnormalWord ? (
              <div className="mb-2 relative overflow-hidden">
                <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">包含异常词</div>
                <div className="text-right pl-[100px] flex-none text-[#ED5E5A] text-sm leading-[22px]">
                  {billItem.abnormalWord}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(Index);
