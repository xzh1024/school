import { CbdApiProjectSaleAddPostRequest } from '@/api';

export class MessageManageListReq {
  // { string } 项目id
  projectId = '';
  // { string } 消息标题
  title = '';
  // { string } 重要程度0：普通；1：重要；2：紧急
  messageLevel = '';
  // { string } 是否置顶1：是；0：否；
  onTop = '';
  // { string } 消息类型1：公告；2：通知；3：内部通知
  category = '';
  // { string } 接收对象类型0指定；1全部
  targetType = '';
  // { string } 状态;0草稿；1待发布；2已发布；3已撤回；4已下架;
  status = '';
  // { string } 发布时间yyyy-MM-ddHH:mm:ss
  publishStartTime = '';
  // { string } 截止时间yyyy-MM-ddHH:mm:ss
  publishEndTime = '';
}

export class MessageManageAddOrUpdateMessageReq {
  // { number } 消息id，更新时使用
  id = null;
  // { number } 项目id
  projectId = null;
  // { number } 消息类型1：公告；2：通知；3：内部通知
  category = null;
  // { string } 发布时间yyyy-MM-ddHH:mm:ss
  publishStartTime = '';
  // { string } 截止时间yyyy-MM-ddHH:mm:ss
  publishEndTime = '';
  // { number } 重要程度0：普通；1：重要；2：紧急
  messageLevel = 0;
  // { number } 是否置顶1：是；0：否；
  onTop = 1;
  // { number } 接收对象类型0指定；1全部(内部通知时可不填)
  targetType = 1;
  // { Array<number> } 店铺id集合(内部通知时可不填) ,Long
  storeIds = [];
  // { string } 消息标题
  title = '';
  // { string } 消息正文
  content = '';
  // { Array<string> } 附件,oss文件id ,String
  attachments = [];
  // { boolean } 是否发布true是false否
  publishFlag = false;
}

export class GoodsListReq {
  // { string } 项目ID(必须)
  projectId = '';
  // { string } 商户ID(必须)
  merchantId = '';
  // { string } 店铺ID(必须)
  storeId = '';
  brandId = [] as number[];
  brandName = '';
  // { string } 销售日期
  saleDate = '';
  // { string } 当前记录起始索引（默认为1）
  pageNum = 1;
  pageSize = 10000;
  goodsList = [] as number[];
}

export class SaleAddReq implements CbdApiProjectSaleAddPostRequest {
  // { number } 销售记录ID
  recordId = null as unknown as number;
  // { number } 项目ID
  projectId = '' as unknown as number;
  // { string } 项目名称
  projectName = '';
  // { number } 商户ID
  merchantId = '' as unknown as number;
  // { string } 商户名
  merchantName = '';
  // { number } 店铺ID
  storeId = '' as unknown as number;
  // { string } 店铺名
  storeName = '';
  // { number } 品牌ID
  brandId = '' as unknown as number;
  // { string } 品牌名
  brandName = '';
  // { string } 合同号
  contractCode = '';
  // { string } 销售日期(yyyy-MM-dd)
  saleDate = '';
  // { number } 销售笔数
  saleNum = 1;
  // { Array<string> } 附件 ,String
  annexList = [];
  // { Array<string> } 附件 ,String
  resourceList = [] as Recordable[];
  // { Array<object> } 货品明细 ,SaleRecordGoodsDto
  goodsList = [];
  // { Array<object> } 支付明细 ,SaleRecordPaymentDto
  paymentList = [];
}

export class GoodsRow {
  // { string } 备注
  remark = '';
  // { number } 实付金额
  actualAmt = null;
  // { number } 销售数量
  goodsNum = 1;
  // { number } 货品单价
  salePrice = null;
  // { string } 货品组别名称
  groupName = '';
  // { number } 货品组别ID
  groupId = null;
  // { string } 货品名称
  goodsName = '';
  // { number } 货品ID
  goodsId = null;
  // { number } 数据主键
  id = null;
}

export class PaymentRow {
  // { string } 备注
  remark = '';
  // { number } 数据主键
  id = null;
  // { number } 支付方式ID
  payMethodId = null;
  // { string } 支付方式名称
  payMethodName = '';
  // { number } 支付金额
  payAmt = null;
}

export class SaleConfirmReq {
  approvalType: number = '' as unknown as number;
  userCode = '';
  // { Array<number> } 销售记录IDs ,Long
  recordIds = [];
  // { string } 审批内容
  comment = '';
}
