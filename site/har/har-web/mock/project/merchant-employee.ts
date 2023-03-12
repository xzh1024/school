import { create, mockList1, resData } from '../utils';

export default create([
  {
    url: '/cbd-api-project/merchant/employee/list',
    method: 'GET',
    response: resData({
      total: 1,
      rows: [
        {
          // { string } 身份
          identityName: 'stbz',
          // { string } 品牌，逗号分割
          brandNames: '肆同包子租赁',
          // { string } 店铺，逗号分割
          storeNames: '肆同包子',
          // { string } 商户名称
          merchantName: '肆同包子旗舰店',
          // { number } 帐号状态（0-正常，1-停用）
          status: 0,
          // { string } 账号
          accountName: '4445563658',
          // { string } 项目名
          projectName: '肆同包子租赁',
          // { number } 账号id
          id: -1
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/merchant/employee/addOrUpdate',
    method: 'POST',
    response: resData(null)
  },
  {
    url: '/cbd-api-project/merchant/employee/info',
    method: 'GET',
    response: resData({
      // { number } 项目id
      projectId: 2,
      // { number } 身份0:法人;1:店长;2:收银员;3:导购;
      identity: 0,
      // { number } 商户
      merchantId: 2,
      // { Array<number> } 店铺，法人时可多选，其他单选 ,Long
      storeIds: [1, 2],
      // { number } 收银机id
      cashierId: -1,
      // { string } 联系人
      linkman: '张经理',
      // { string } 联系电话
      linkTel: '18611111111',
      // { string } 有效日期yyyy-MM-dd
      expireDate: '2025-07-06',
      // { string } 备注
      remark: '无',
      // { number } 账号id
      id: -1,
      // { string } 项目名
      projectName: '肆同包子租赁',
      // { string } 账号
      accountName: '45984561',
      // { number } 帐号状态（0-正常，1-停用）
      status: 0,
      // { string } 商户名称
      merchantName: '肆同包子',
      // { string } 店铺，逗号分割
      storeNames: '肆同包子',
      // { string } 品牌，逗号分割
      brandNames: '肆同包子',
      // { string } 身份
      identityName: '店员'
    })
  },
  {
    url: '/cbd-api-project/merchant/employee/remove',
    method: 'DELETE',
    response: resData(null)
  },
  {
    url: '/cbd-api-project/merchant/employee/resetPwd',
    method: 'PUT',
    response: resData(null)
  },
  // 项目下拉数据
  {
    url: '/cbd-api-project/common/project/selectList',
    method: 'GET',
    response: resData([
      { label: 'MOCK项目-A01', value: 1 },
      { label: 'MOCK项目-A02', value: 2 },
      { label: 'MOCK项目-A03', value: 3 },
      { label: 'MOCK项目-A04', value: 4 }
    ])
  },
  // 商户下拉数据
  {
    url: '/cbd-api-project/common/merchant/list',
    method: 'GET',
    response: resData([
      { label: 'MOCK商户-A01', value: 1 },
      { label: 'MOCK商户-A02', value: 2 },
      { label: 'MOCK商户-A03', value: 3 },
      { label: 'MOCK商户-A04', value: 4 }
    ])
  },
  // 店铺下拉数据
  {
    url: '/cbd-api-project/common/store/selectAll',
    method: 'GET',
    response: resData([
      { label: 'MOCK店铺-A01', value: 1 },
      { label: 'MOCK店铺-A02', value: 2 },
      { label: 'MOCK店铺-A03', value: 3 },
      { label: 'MOCK店铺-A04', value: 4 }
    ])
  },
  // 品牌下拉数据
  {
    url: '/cbd-api-project/common/merchant-brand/list',
    method: 'GET',
    response: resData([
      { label: 'MOCK品牌-A01', value: 1 },
      { label: 'MOCK品牌-A02', value: 2 },
      { label: 'MOCK品牌-A03', value: 3 },
      { label: 'MOCK品牌-A04', value: 4 }
    ])
  },
  // 收银机下拉数据
  {
    url: '/cbd-api-project/common-mis/cashierSelect',
    method: 'GET',
    response: resData([
      { label: '收银机-A01', value: 1 },
      { label: '收银机-A02', value: 2 },
      { label: '收银机-A03', value: 3 },
      { label: '收银机-A04', value: 4 }
    ])
  },
  // 合同号下拉数据
  {
    url: '/cbd-api-project/common-mis/contract/select',
    method: 'GET',
    response: resData([
      {
        id: 1,
        code: 'XXSHJSDFSD100',
        brandName: 'MOCK合同号-A01',
        doorPlates: ['铺位A1', '铺位A2'],
        leaseStartDate: '2022-01-01',
        leaseEndDate: '2022-01-20'
      },
      {
        id: 2,
        code: 'XXSHJSDFSD200',
        brandName: 'MOCK合同号-A02',
        doorPlates: ['铺位A1', '铺位A2'],
        leaseStartDate: '2022-02-01',
        leaseEndDate: '2022-02-20'
      },
      {
        id: 3,
        code: 'XXSHJSDFSD300',
        brandName: 'MOCK合同号-A02',
        doorPlates: ['铺位A1', '铺位A2'],
        leaseStartDate: '2022-03-01',
        leaseEndDate: '2022-03-20'
      }
    ])
  },
  // 导入预览
  {
    url: '/cbd-api-project/merchant/employee/importPreview/LTAI5tRcDrPApzh3Hm2YNiA5',
    method: 'GET',
    response: resData({
      // { Array<object> } 可导入列表 ,MerchantEmployeeImportModel
      importList: mockList1(
        {
          // { string } 行号
          index: '@increment(1)',
          // { string } 项目名称
          projectName: '@cname',
          // { string } 店铺
          storeName: '@cname',
          // { string } 账号
          accountName: '@integer(10, 52100)',
          // { string } 身份
          identityName: '@cname',
          // { string } 收银机
          cashierName: '@cname',
          // { string } 联系人
          linkman: '@cname',
          // { string } 联系电话
          linkTel: '18612341235',
          // { string } 状态
          statusDesc: '正常',
          // { string } 账号有效期
          expireDate: '2024-05-06'
        },
        20
      ),
      // { Array<object> } 不可导入列表 ,MerchantEmployeeImportErrorModel
      importErrorList: mockList1(
        {
          // { string } 行号
          index: '@increment(1)',
          // { string } 项目名称
          projectName: '@cname',
          // { string } 店铺
          storeName: '@cname',
          // { string } 账号
          accountName: '@integer(10, 52100)',
          // { string } 身份
          identityName: '@cname',
          // { string } 收银机
          cashierName: '@cname',
          // { string } 联系人
          linkman: '@cname',
          // { string } 联系电话
          linkTel: '18612341235',
          // { string } 状态
          statusDesc: '正常',
          // { string } 账号有效期
          expireDate: '2024-05-06',
          // { string } 失败原因
          failReason: '未知'
        },
        20
      )
    })
  },
  // 导出保存
  {
    url: '/cbd-api-project/merchant/employee/importSave/LTAI5tRcDrPApzh3Hm2YNiA5',
    method: 'GET',
    response: resData(null)
  }
]);
