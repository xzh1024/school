import { CbdApiProjectFormalContractBackSavePostRequest } from '@/api';

export type BackSaveItem =
  Required<CbdApiProjectFormalContractBackSavePostRequest>['backSaveList'][number];
export type BackPaymentItem = Required<BackSaveItem>['backPayment'][number];

export enum Dict {
  itemType = '202212270010',
  intoTaxIncluded = '202212270009'
}

export class BackPayment {
  // { number } 手续费率
  rate = null as unknown as number;
  // { number } 支付方式
  method = null as unknown as number;
}
export class BackSave {
  // { Array<object> } 返款方式 ,BackPayment
  backPayment = [];
  // { number } 转入预付款费用项目
  intoTaxIncluded = null as unknown as number;
  // { number } 转预付款比例
  proportion = null as unknown as number;
  // { number } 是否收取手续费0、否1、是
  serviceCharge = 0;
  // { number } 是否按比例转预付款0、否1、是
  advancePayment = 0;
  // { number } 账单生成日
  billGenDay = null as unknown as number;
  // { number } 返款调整
  back = null as unknown as number;
  // { number } 返款调整单位21、月2、自然日3、工作日
  backUnitTwo = 2;
  // { number } 返款调整单位11、延后2、提前
  backUnitOne = 1;
  // { number } 账期
  period = null as unknown as number;
  // { number } 账期单位1、月2、日
  periodUnit = 1;
  // { number } 费用项目
  itemType = null as unknown as number;
}
export class BackSaveReq
  implements CbdApiProjectFormalContractBackSavePostRequest
{
  // { number } 合同id
  contractId = -1;
  // { Array<object> } 返款信息 ,MisContractBackSave
  backSaveList = [];
}
