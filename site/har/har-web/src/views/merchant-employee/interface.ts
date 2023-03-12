import { CbdApiProjectMerchantEmployeeAddOrUpdatePostRequest } from '@/api';

export class EmployeeListReq {
  // { string } 项目id
  projectId = '';
  // { string } 商户id
  merchantId = '';
  // { string } 店铺id
  storeId = '';
  // { string } 品牌id
  brandId = '';
  // { string } 帐号状态（0-正常，1-停用）
  status = '';
  // { string } 账号
  accountName = '';
  constructor(projectId = '') {
    this.projectId = projectId;
  }
}

export class EmployeeListResp {
  // { string } 身份
  identityName = '';
  // { string } 品牌，逗号分割
  brandNames = '';
  // { string } 店铺，逗号分割
  storeNames = '';
  // { string } 商户名称
  merchantName = '';
  // { number } 帐号状态（0-正常，1-停用）
  status = 0;
  // { string } 账号
  accountName = '';
  // { string } 项目名
  projectName = '';
  // { number } 账号id
  id = null;
}

export class EmployeeAddOrUpdateReq
  implements CbdApiProjectMerchantEmployeeAddOrUpdatePostRequest
{
  // { number } id编辑时用
  id = undefined;
  // { number } 项目id
  projectId = null as unknown as number;
  // { string } 账号
  accountName = '';
  // { number } 身份0:法人;1:店长;2:收银员;3:导购;
  identity = null as unknown as number;
  // { number } 商户
  merchantId = null as unknown as number;
  // { Array<number> } 店铺，法人时可多选，其他单选 ,Long
  storeIds = '' as unknown as number[];
  stores = [] as Recordable[];
  // 品牌
  brandIds = [] as number[];
  // { number } 收银机id
  cashierIds = [] as number[];
  // { string } 联系人
  linkman = '';
  // { string } 联系电话
  linkTel = '';
  // { string } 有效日期yyyy-MM-dd
  expireDate = '';
  // { string } 备注
  remark = '';
  // { number } 帐号状态（0-正常，1-停用）
  status = 0;
}
