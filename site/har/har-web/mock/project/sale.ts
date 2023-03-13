import { create, resData, mockList } from '../utils';

export default create([
  //审批数据
  {
    url: '/cbd-api-project/sale/goods/list',
    method: 'GET',
    response: resData({
      total: 10,
      rows: [
        {
          // { number } 货品ID
          goodsId: -1,
          // { string } 货品名称
          goodsName: 'MOCK货品',
          // { number } 货品组别ID
          groupId: 1,
          // { string } 货品组别名称
          groupName: '一级组',
          // { string } 合同号
          contractCode: 'XSWWERWERWER',
          // { string } 品牌id
          brandId: '1',
          // { string } 品牌名
          brandName: '肆同包子'
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/sale/list',
    method: 'GET',
    response: resData({
      total: 10,
      rows: [
        {
          // { number } 记录ID
          recordId: -1,
          // { string } 销售单据号
          saleNo: 'XWWERWER',
          // { string } 项目名称
          projectName: '肆同包子',
          // { string } 合同号
          contractCode: 'XXDFASWERW',
          // { string } 商户
          merchantName: '肆同包子',
          // { string } 店铺
          storeName: '肆同包子',
          // { string } 品牌
          brandName: '肆同包子旗舰店',
          // { number } 业务状态(1、草稿2、待确认3、已确认4、已作废5、已生成账单)
          businessStatus: 2,
          // { number } 审批状态(1、未提交2、审批中3、已驳回4、已撤销5、已通过)
          verifyStatus: 2,
          // { number } 来源
          sourceType: 1,
          // { number } 销售额
          saleAmount: 100000,
          // { string } 销售日期
          saleDate: '2020-04-05'
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/sale/info',
    method: 'GET',
    response: resData({
      // { number } 销售记录ID
      recordId: -1,
      // { number } 项目ID
      projectId: 1,
      // { string } 项目名称
      projectName: 'MOCK项目',
      // { number } 商户ID
      merchantId: -1,
      // { string } 商户名
      merchantName: '肆同包子',
      // { number } 店铺ID
      storeId: 1,
      // { string } 店铺名
      storeName: '肆同包子',
      // { number } 品牌ID
      brandId: 1,
      // { string } 品牌名
      brandName: '肆同包子旗舰店',
      // { string } 合同号
      contractCode: 'SDFASD',
      // { string } 销售日期(yyyy-MM-dd)
      saleDate: '2022-05-08',
      // { number } 销售笔数
      saleNum: 1,
      // { Array<object> } 附件地址集合 ,GetResourceFilesResp
      resourceList: [],
      // { Array<object> } 货品明细 ,SaleRecordGoodsDto
      goodsList: [
        {
          // { number } 数据主键
          id: 1,
          // { number } 货品ID
          goodsId: 1,
          // { string } 备注
          remark: '备注MOCK',
          // { number } 实付金额
          actualAmt: 100,
          // { number } 销售数量
          goodsNum: 1,
          // { number } 货品单价
          salePrice: 100,
          // { string } 货品组别名称
          groupName: 'MOCK组',
          // { number } 货品组别ID
          groupId: 1,
          // { string } 货品名称
          goodsName: '包子'
        }
      ],
      // { Array<object> } 支付明细 ,SaleRecordPaymentDto
      paymentList: [
        {
          // { string } 备注
          remark: '支付备注',
          // { number } 支付金额
          payAmt: 100,
          // { number } 支付方式ID
          payMethodId: 1,
          // { number } 数据主键
          id: 1,
          // { string } 支付方式名称
          payMethodName: '支付宝'
        }
      ]
    })
  }
]);
