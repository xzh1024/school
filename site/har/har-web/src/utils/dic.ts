import BI from '@images/home/bi.png';
import CFR from '@images/home/cfr.png';
import CRM from '@images/home/crm.png';
import MIS from '@images/home/mis.png';
import PCS from '@images/home/pcs.png';
import PMS from '@images/home/pms.png';
import POS from '@images/home/pos.png';
import PS from '@images/home/ps.png';
import SS from '@images/home/ss.png';
import SVC from '@images/home/svc.png';
import type {
  CbdApiProjectProductAttributeBrandListGetResponse,
  CbdApiProjectCommonFormatSelectListGetResponse,
  CbdApiProjectCommonVenueClassifyGetResponse,
  CbdApiProjectProductAttributeClassifyListGetResponse,
  CbdApiProjectCommonProjectSelectListGetResponse,
  CbdApiProjectCommonStoreSelectGetResponse,
  CbdApiProjectCommonMembersLevelSelectGetResponse
} from '@/api';
export type BrandListItem =
  CbdApiProjectProductAttributeBrandListGetResponse[0];
export type GoodsClassifyItem =
  CbdApiProjectProductAttributeClassifyListGetResponse[0];
export type IndustryItem = CbdApiProjectCommonFormatSelectListGetResponse[0];
export type StadiumTypeItem = CbdApiProjectCommonVenueClassifyGetResponse[0];
export type ProjectSelectItem =
  CbdApiProjectCommonProjectSelectListGetResponse[0];
export type StoreSelectItem = CbdApiProjectCommonStoreSelectGetResponse[0];
export type MembersLevel = CbdApiProjectCommonMembersLevelSelectGetResponse[0];
export type SelectChangeValueType =
  | string
  | number
  | Record<string, any>
  | (string | number | Record<string, any>)[];

interface EnumHashType {
  readonly [index: number | string]: string;
}
export interface StatusListType {
  label: string;
  value: string | number;
}
export interface ListDataType {
  label: string;
  prop: string;
  isEnum?: boolean;
  deep?: boolean;
  source?: any;
  span?: number;
  hasUnit?: boolean;
  multiple?: boolean;
  multiKey?: string;
  unit?: string;
}
export const deptStatusList: StatusListType[] = [
  {
    label: '启用',
    value: '0'
  },
  {
    label: '停用',
    value: '1'
  }
];
// 用户管理，状态
export const userStatusList: StatusListType[] = [
  {
    label: '正常',
    value: '0'
  },
  {
    label: '停用',
    value: '1'
  }
];
// 用户性别
export const userSexList: StatusListType[] = [
  {
    label: '男',
    value: '0'
  },
  {
    label: '女',
    value: '1'
  },
  {
    label: '未知',
    value: '2'
  }
];
// 角色状态（0正常1停用）
export const roleStatusList = [
  {
    label: '正常',
    value: '0'
  },
  {
    label: '停用',
    value: '1'
  }
];
// 商品库存变动类型
export const stockChangeType: StatusListType[] = [
  {
    label: '订单冻结',
    value: 1
  },
  {
    label: '订单扣减',
    value: 2
  },
  {
    label: '订单回滚',
    value: 3
  },
  {
    label: '手动新增',
    value: 4
  },
  {
    label: '手动扣减',
    value: 5
  },
  {
    label: '订单退款',
    value: 6
  }
];
export const contractStatusList: StatusListType[] = [
  {
    label: '草稿',
    value: 1
  },
  {
    label: '审核中',
    value: 2
  },
  {
    label: '未生效',
    value: 3
  },
  {
    label: '生效中',
    value: 4
  },
  {
    label: '审核拒绝',
    value: 5
  },
  {
    label: '已到期',
    value: 6
  },
  {
    label: '已作废',
    value: 7
  }
];
export const contractStatusHash: EnumHashType = {
  1: '草稿',
  2: '审核中',
  3: '未生效',
  4: '生效中',
  5: '审核拒绝',
  6: '已到期',
  7: '已作废'
};
export const statusList: StatusListType[] = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 2
  }
];
export const houseStatusHash: EnumHashType = {
  0: '未出租',
  2: '已出租',
  1: '合同审核中',
  3: '正常',
  4: '已欠费'
};
export const houseStatusList: StatusListType[] = [
  {
    label: '未出租',
    value: 0
  },
  {
    label: '合同审核中',
    value: 1
  },
  {
    label: '已出租',
    value: 2
  },
  {
    label: '正常',
    value: 3
  },
  {
    label: '已欠费',
    value: 4
  }
];
export const billStatusList: StatusListType[] = [
  {
    label: '待收款',
    value: 1
  },
  {
    label: '收款中',
    value: 5
  },
  {
    label: '部分收款',
    value: 2
  },
  {
    label: '已收款',
    value: 3
  },
  {
    label: '已欠费',
    value: 4
  },
  {
    label: '已作废',
    value: -1
  }
];
export const billStatusHash: EnumHashType = {
  1: '待收款',
  5: '收款中',
  2: '部分收款',
  3: '已收款',
  4: '已欠费',
  '-1': '已作废'
};
export const billAuditStatusHash: EnumHashType = {
  1: '待审核',
  2: '审核拒绝',
  4: '入账中',
  3: '已收款',
  '-1': '已作废'
};
export const chargeTypeHash: EnumHashType = {
  1: '初始缴费',
  2: '逾期扣减',
  3: '逾期补缴'
};
export const receiptStatusHash: EnumHashType = {
  1: '待审核',
  2: '审核拒绝',
  4: '入账中',
  3: '已收款',
  '-1': '已作废'
};
export const receiptStatusList: StatusListType[] = [
  {
    label: '待审核',
    value: 1
  },
  {
    label: '审核拒绝',
    value: 2
  },
  {
    label: '入账中',
    value: 4
  },
  {
    label: '已收款',
    value: 3
  },
  {
    label: '已作废',
    value: '-1'
  }
];
export const collectRentsWayHash: EnumHashType = {
  1: '固定租金',
  2: '保证金加分佣',
  3: '分佣'
};
export const paymentMethodHash: EnumHashType = {
  1: '线下支付',
  2: '线上支付'
};
export const paymentMethodList: StatusListType[] = [
  {
    label: '线下支付',
    value: 1
  },
  {
    label: '线上支付',
    value: 2
  }
];
export const costTypeHash: EnumHashType = {
  1: '保证金',
  2: '租金',
  3: '物业费',
  4: '其他费用'
};
export const costTypeList: any = [
  {
    costTypeName: '房租',
    costTypeId: 1
  },
  {
    costTypeName: '物业费',
    costTypeId: 2
  },
  {
    costTypeName: '停车费',
    costTypeId: 3
  }
];
export const payTypeList: StatusListType[] = [
  {
    label: '月付',
    value: 1
  },
  {
    label: '季付(3个月)',
    value: 3
  },
  {
    label: '半年付(6个月)',
    value: 6
  },
  {
    label: '年付(12个月)',
    value: 12
  }
];
export const listItemStyle: any = {
  color: '#4D4D4D',
  fontSize: '14px'
};
export const listLabelStyle: any = {
  color: '#86909c',
  fontSize: '14px'
};

export const programmeTypeList: Array<StatusListType> = [
  {
    value: 1,
    label: '固定金额'
  },
  {
    value: 2,
    label: '流水抽佣'
  },
  {
    value: 3,
    label: '保底金额+抽佣'
  }
];

export const ruleTypeList: Array<StatusListType> = [
  {
    value: 1,
    label: '每平米固定金额'
  },
  {
    value: 2,
    label: '固定金额'
  }
];

// 商品管理

export const goodsStatusList = [
  {
    label: '禁用',
    value: 0
  },
  {
    label: '启用',
    value: 1
  }
];

// shop status
export const shopStatusList: Array<StatusListType> = [
  {
    value: 0,
    label: '草稿'
  },
  {
    value: 1,
    label: '认证中'
  },
  {
    value: 2,
    label: '已认证'
  },
  {
    value: 3,
    label: '拒绝认证'
  }
];
export const shopStatusHash: EnumHashType = {
  0: '草稿',
  1: '认证中',
  2: '已认证',
  3: '拒绝认证'
};
export const shopGoodsStatus: Array<StatusListType> = [
  {
    value: 1,
    label: '销售中'
  },
  {
    value: 2,
    label: '已售罄'
  },
  {
    value: 3,
    label: '已下架'
  }
];
export const shopGoodsStatusHash: EnumHashType = {
  1: '销售中',
  2: '已售罄',
  3: '已下架'
};
export const shopInStockWay: Array<StatusListType> = [
  {
    value: 1,
    label: '手动入库'
  },
  {
    value: 2,
    label: '退货入库'
  },
  {
    value: 3,
    label: '首次入库'
  }
];
export const shopInStockWayHash: EnumHashType = {
  1: '手动入库',
  2: '退货入库',
  3: '首次入库'
};
export const shopOutStockWay: Array<StatusListType> = [
  {
    value: 1,
    label: '手动出库'
  },
  {
    value: 2,
    label: '销售出库'
  }
];
export const shopOutStockWayHash: EnumHashType = {
  1: '手动出库',
  2: '销售出库'
};
export const shopInStockStatus: Array<StatusListType> = [
  {
    value: 1,
    label: '待入库'
  },
  {
    value: 2,
    label: '入库完成'
  },
  {
    value: 3,
    label: '入库取消'
  }
];
export const shopInStockStatusHash: EnumHashType = {
  1: '待入库',
  2: '入库完成',
  3: '入库取消'
};
export const shopOutStockStatus: Array<StatusListType> = [
  {
    value: 1,
    label: '待出库冻结'
  },
  {
    value: 2,
    label: '出库完成'
  },
  {
    value: 3,
    label: '出库取消'
  },
  {
    value: 4,
    label: '退货'
  }
];
export const shopOutStockStatusHash: EnumHashType = {
  1: '待出库冻结',
  2: '出库完成',
  3: '出库取消',
  4: '退货'
};

// 账户进件管理  状态
export const accStatusList: Array<StatusListType> = [
  {
    label: '草稿',
    value: 1
  },
  {
    label: '待认证',
    value: 2
  },
  {
    label: '认证中',
    value: 3
  },
  {
    label: '待签协议',
    value: 4
  },
  {
    label: '认证拒绝',
    value: 5
  },
  {
    label: '已认证',
    value: 6
  }
];

// 账户进件管理 入账卡类型
export const cardTypeList: Array<StatusListType> = [
  {
    label: '对公',
    value: 1
  }
  /*  {
    label: '对私',
    value: 2
  }*/
];

// 场地管理
export const classifyStatusList: Array<StatusListType> = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 2
  }
];

export const classifyRuleList: Array<StatusListType> = [
  {
    label: '散客定价',
    value: 1
  },
  {
    label: '时段定价',
    value: 2
  },
  {
    label: '包场定价',
    value: 3
  }
];
export const weekList: Array<StatusListType> = [
  {
    label: '星期一',
    value: 1
  },
  {
    label: '星期二',
    value: 2
  },
  {
    label: '星期三',
    value: 3
  },
  {
    label: '星期四',
    value: 4
  },
  {
    label: '星期五',
    value: 5
  },
  {
    label: '星期六',
    value: 6
  },
  {
    label: '星期日',
    value: 7
  }
];

// 订单
// 订单
export const orderStatus: Array<StatusListType> = [
  {
    label: '待支付',
    value: '0'
  },
  {
    label: '部分付款',
    value: '4'
  },
  {
    label: '待使用',
    value: '1'
  },
  {
    label: '已完成',
    value: '11'
  },
  {
    label: '退款中',
    value: '2'
  },
  {
    label: '已退款',
    value: '3'
  },
  {
    label: '已取消',
    value: '-1'
  }
];
export const orderStatusHash: EnumHashType = {
  '-1': '已取消',
  0: '待支付',
  1: '待使用',
  2: '退款中',
  3: '已退款',
  4: '部分付款',
  11: '已完成'
};
// 商城装修 === 福利 === 选择优惠券
export const mallWelfareTypeHash: { [index: number]: string } = {
  1: '满减券',
  2: '折扣券',
  3: '礼品券',
  4: '积分现金券'
};
export const stadiumRuleTypeHash: { [index: number]: string } = {
  1: '散客',
  2: '时段',
  3: '包场'
};
// 营销 === 活动
export const activityStatus: Array<StatusListType> = [
  {
    label: '全部',
    value: ''
  },
  // {
  //   label: '等待预热',
  //   value: '1'
  // },
  {
    label: '预热中',
    value: '2'
  },
  {
    label: '未开始',
    value: '3'
  },
  {
    label: '报名中',
    value: '4'
  },
  // {
  //   label: '等待活动开始',
  //   value: '5'
  // },
  {
    label: '进行中',
    value: '6'
  },
  {
    label: '活动结束',
    value: '7'
  }
  // {
  //   label: '已作废',
  //   value: '-1'
  // }
];
export const activityStatusHash: EnumHashType = {
  '-1': '已作废',
  1: '等待预热',
  2: '预热中',
  3: '未开始',
  4: '报名中',
  5: '等待活动开始',
  6: '进行中',
  7: '活动结束'
};
export const activityPayTypeList: Array<StatusListType> = [
  {
    label: '现金',
    value: '1'
  },
  {
    label: '积分',
    value: '2'
  },
  {
    label: '免费',
    value: '3'
  }
];
export const activityPayTypeHash: EnumHashType = {
  1: '现金',
  2: '积分',
  3: '免费'
};
export const checkStatusHash: EnumHashType = {
  1: '未使用',
  2: '已使用',
  3: '已过期',
  4: '已作废'
};

// 会员===权益
export const rightsStatusHash: EnumHashType = {
  1: '未使用',
  2: '使用中'
};
export const serviceModeHash: EnumHashType = {
  1: '系统核销'
};
// 会员===权益=== 场地适用类型
export const spaceApplyTypeHash: EnumHashType = {
  1: '全部可用',
  2: '指定场地可用',
  3: '指定场地不可用',
  '-1': '全部不可用' // '-1' 仅作前端展示,给后端的时候处理成1<全部>
};
// 会员===权益=== 商品适用类型
export const pdtApplyTypeHash: EnumHashType = {
  1: '全部可用',
  2: '指定商品可用',
  3: '指定商品不可用',
  '-1': '全部不可用' // '-1' 仅作前端展示,传给后端的时候处理成1<全部>
};
// 优惠券
export const couponStatus: Array<StatusListType> = [
  {
    label: '进行中',
    value: '1'
  },
  {
    label: '已结束',
    value: '2'
  },
  {
    label: '已作废',
    value: '3'
  }
];
export const couponStatusHash: EnumHashType = {
  1: '进行中',
  2: '已结束',
  3: '已作废'
};
export const couponTypeList: Array<StatusListType> = [
  {
    label: '满减券',
    value: '1'
  },
  {
    label: '折扣券',
    value: '2'
  },
  {
    label: '礼品券',
    value: '3'
  },
  {
    label: '积分现金券',
    value: '4'
  }
];
export const couponTypeHash: EnumHashType = {
  1: '满减券',
  2: '折扣券',
  3: '礼品券',
  4: '积分现金券'
};
export const weekHash: EnumHashType = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期日'
};
// 收银机
export const cashMachineTypeHash: EnumHashType = {
  1: '手持',
  2: '台式'
};
export const cashMachineStateHash: EnumHashType = {
  1: '已匹配',
  2: '未匹配'
};

export const energyTypeData = [
  { label: '电', value: 1 },
  { label: '水', value: 2 }
];

export const energyFeeData = [{ label: '能耗费用', value: 1 }];

export const contractExpireHash: EnumHashType = {
  1: '小于7天',
  2: '小于15天大于7天',
  3: '小于30天大于15天',
  4: '小于半年大于30天'
};
interface PlatformImgType {
  value: string;
  imgUrl: string;
}
export const platformHomeImgList: PlatformImgType[] = [
  {
    value: 'mis',
    imgUrl: MIS
  },
  {
    value: 'bi',
    imgUrl: BI
  },
  {
    value: 'cfr',
    imgUrl: CFR
  },
  {
    value: 'pcs',
    imgUrl: PCS
  },
  {
    value: 'pms',
    imgUrl: PMS
  },
  {
    value: 'pos',
    imgUrl: POS
  },
  {
    value: 'ps',
    imgUrl: PS
  },
  {
    value: 'ss',
    imgUrl: SS
  },
  {
    value: 'svc',
    imgUrl: SVC
  },
  {
    value: 'crm',
    imgUrl: CRM
  }
];

// 铺位配置
export const shopLocationTypeList: Array<StatusListType> = [
  {
    label: '商铺',
    value: 1
  },
  {
    label: '广告位',
    value: 2
  },
  {
    label: '场地',
    value: 3
  },
  {
    label: '写字楼',
    value: 4
  }
];
export const leaseTypeList: Array<StatusListType> = [
  {
    label: '商铺',
    value: 1
  },
  {
    label: '场地',
    value: 2
  },
  {
    label: '写字楼',
    value: 3
  },
  {
    label: '广告位',
    value: 4
  }
];
export const calculationList: StatusListType[] = [
  { label: '固定金额', value: 1 },
  { label: '合同相关', value: 2 }
];
export const attractMerchantStatusList: StatusListType[] = [
  { label: '草稿', value: 0 },
  { label: '审批中', value: 1 },
  { label: '已通过', value: 2 },
  { label: '已驳回', value: 3 },
  { label: '已撤销', value: 4 },
  { label: '已作废', value: 5 }
];
export const channelTypeList: StatusListType[] = [
  { label: '个人', value: 1 },
  { label: '公司', value: 2 }
];
export const locationStatusList: Array<StatusListType> = [
  {
    label: '空置',
    value: 1
  },
  {
    label: '已预定',
    value: 2
  },
  {
    label: '已签约',
    value: 3
  }
];
export const locationAssetsStatusList: Array<StatusListType> = [
  {
    label: '未生效',
    value: 1
  },
  {
    label: '已生效',
    value: 2
  },
  {
    label: '已失效',
    value: 3
  }
];
export const negotiateStageList: Array<StatusListType> = [
  {
    label: '初始阶段',
    value: 1
  },
  {
    label: '意向合同谈判阶段',
    value: 2
  },
  {
    label: '正式合同谈判阶段',
    value: 3
  },
  {
    label: '已完成',
    value: 4
  },
  {
    label: '未完成',
    value: 5
  }
];
export const attractPlanStatusList: Array<StatusListType> = [
  {
    label: '草稿',
    value: 0
  },
  {
    label: '审批中',
    value: 1
  },
  {
    label: '已通过',
    value: 2
  },
  {
    label: '已驳回',
    value: 3
  },
  {
    label: '已撤销',
    value: 4
  },
  {
    label: '已作废',
    value: 5
  }
];
export const calculateTypeList: Array<StatusListType> = [
  {
    label: '固定金额',
    value: 1
  },
  {
    label: '合同挂钩',
    value: 2
  }
];
export const attractBusinessStatusList: Array<StatusListType> = [
  {
    label: '待确认',
    value: 1
  },
  {
    label: '已确认',
    value: 2
  },
  {
    label: '已作废',
    value: 3
  }
];
export const attractVerifyStatusList: Array<StatusListType> = [
  {
    label: '未提交',
    value: 1
  },
  {
    label: '审批中',
    value: 2
  },
  {
    label: '已通过',
    value: 3
  },
  {
    label: '已驳回',
    value: 4
  },
  {
    label: '已撤销',
    value: 5
  }
];
export const attractBillTypeList: Array<StatusListType> = [
  {
    label: '招商费',
    value: 1
  }
];

// 比例类型;
export const ratioLabelList: Array<StatusListType> = [
  { label: '第一月费用', value: 1 },
  { label: '前两月费用', value: 2 },
  { label: '前三月费用', value: 3 },
  { label: '每月费用', value: 4 }
];
export const tradeTypeList: Array<StatusListType> = [
  {
    label: '购卡',
    value: 1
  },
  {
    label: '充值',
    value: 2
  },
  {
    label: '消费',
    value: 3
  },
  {
    label: '退款',
    value: 4
  },
  {
    label: '退卡',
    value: 5
  }
];

export const valueCardStatusList: Array<StatusListType> = [
  { label: '使用中', value: 1 },
  { label: '已冻结', value: 2 },
  { label: '已退卡', value: 3 }
];
export const cardActivityStatusList: Array<StatusListType> = [
  { label: '未开始', value: 1 },
  { label: '进行中', value: 2 },
  { label: '已暂停', value: 3 },
  { label: '已完成', value: 4 }
];
export const cardActivitySceneList: Array<StatusListType> = [
  { label: '购卡', value: 'purchase' },
  { label: '充值', value: 'recharge' },
  { label: '消费', value: 'consume' }
];
export const cardActivityTypeList: Array<StatusListType> = [
  { label: '满减', value: 'decrement' },
  { label: '满赠', value: 'gift' },
  { label: '满折', value: 'discount' },
  { label: '消费打折', value: 'consume_discount' }
];
export const dateList: Array<{
  label: string;
  value: number;
}> = [
  {
    label: '日',
    value: 1
  },
  {
    label: '月',
    value: 2
  },
  {
    label: '年',
    value: 3
  }
];

export const payWayList: Readonly<Array<StatusListType>> = [
  { label: '现金', value: 1 },
  { label: '支付宝', value: 2 },
  { label: '微信', value: 3 }
];

export const freezeStatusList: Readonly<Array<StatusListType>> = [
  { label: '解冻', value: 1 },
  { label: '冻结', value: 2 }
];

export const topUpList: Readonly<Array<StatusListType>> = [
  { label: '充值', value: 1 }
];

//操作日志 类型查看option

export const logTypeList: Array<StatusListType> = [
  { label: '新增', value: 1 },
  { label: '修改', value: 2 },
  { label: '删除', value: 3 },
  { label: '查看', value: 4 }
];
// 账单
export const billSourceTypeList: Array<StatusListType> = [
  {
    label: '合同',
    value: 1
  },
  {
    label: '手工录入',
    value: 2
  }
];
export const billTypeList: Array<StatusListType> = [
  {
    label: '收款账单',
    value: 1
  },
  {
    label: '付款账单',
    value: 2
  }
];
export const billPaymentList: Array<StatusListType> = [
  {
    label: '草稿',
    value: 0
  },
  {
    label: '待确认',
    value: 1
  },
  {
    label: '未支付',
    value: 2
  },
  {
    label: '已作废',
    value: 3
  },
  {
    label: '部分支付',
    value: 4
  },
  {
    label: '已结清',
    value: 5
  }
];
export const changeTypeList: Array<StatusListType> = [
  {
    label: '调增',
    value: 1
  },
  {
    label: '调减',
    value: 2
  }
];
export const chargingMethodList: Array<StatusListType> = [
  {
    label: '固定费用',
    value: 1
  }
];
export const business_status: Array<StatusListType> = [
  {
    label: '草稿',
    value: 0
  },
  {
    label: '待确认',
    value: 1
  },
  {
    label: '未支付',
    value: 2
  },
  {
    label: '已作废',
    value: 3
  },
  {
    label: '部分支付',
    value: 4
  },
  {
    label: '已结清',
    value: 5
  }
];
export const examine_status: Array<StatusListType> = [
  {
    label: '未提交',
    value: 1
  },
  {
    label: '审批中',
    value: 2
  },
  {
    label: '已通过',
    value: 3
  },
  {
    label: '已驳回',
    value: 4
  },
  {
    label: '已撤销',
    value: 5
  }
];
export const pay_collect_status: Array<StatusListType> = [
  {
    label: '草稿',
    value: 0
  },
  {
    label: '待确认',
    value: 1
  },
  {
    label: '已确认',
    value: 2
  },
  {
    label: '已作废',
    value: 3
  }
];
//发票类型枚举
export const invoiceTypeOption: Array<StatusListType> = [
  { label: '普票', value: 1 },
  { label: '专票', value: 2 }
];

//纳税人类别枚举
export const taxpayerOption: Array<StatusListType> = [
  { label: '一般纳税人', value: 1 },
  { label: '小规模纳税人', value: 2 }
];

//经营方式枚举
export const manageOption: Array<StatusListType> = [
  { label: '自营', value: 1 },
  { label: '联营', value: 2 }
];

interface StatusNumberListType {
  label: string;
  value: number;
}
/**
 * @description 合同 费用项目
 *
 */
export const contractProjectList: Array<StatusNumberListType> = [
  { label: '固定费用', value: 1 },
  { label: '抽成费用', value: 2 }
];

/**
 * @description // 合同   费用计算方式
 */
export const contractCostCalcTypeList: Array<StatusNumberListType> = [
  { label: '日固定租金', value: 11 },
  { label: '月固定租金', value: 12 },
  { label: '日平米租金', value: 13 },
  { label: '月平米租金', value: 14 }
];
/**
 * @description //合同  不足月租金计算方式
 */
export const contractMothRentTypeList: Array<StatusNumberListType> = [
  { label: '按月', value: 1 },
  { label: '按年', value: 2 }
];

/**
 * @description //合同 账期日期
 */
export const contractPaymentDaysDate: Array<StatusNumberListType> = [
  { label: '日', value: 1 },
  { label: '月', value: 2 }
];

/***
 *  @description //合同 收款调整 日期
 */
export const contractPayAdjustDateList: Array<StatusNumberListType> = [
  { label: '月', value: 1 },
  { label: '自然日', value: 2 },
  { label: '工作日', value: 3 }
];

/***
 *  @description //合同 收款调整 时延
 */
export const contractPayAdjustDelayList: Array<StatusNumberListType> = [
  { label: '提前', value: 1 },
  { label: '延后', value: 2 }
];

export const contractLeaseTermList: Array<StatusNumberListType> = [
  { label: '按自然日/月/年顺延', value: 1 },
  { label: '按起始日顺延', value: 2 }
];

/***
 * @description 合同  递增方式
 */
export const contractIncreaseMethodList: Array<StatusNumberListType> = [
  { label: '元', value: 1 },
  { label: '%', value: 2 }
];

export const contractIncreaseTimeList: Array<StatusNumberListType> = [
  { label: '月', value: 1 },
  { label: '年', value: 2 }
];

export const contractIncreasePeriodTimeList: Array<StatusNumberListType> = [
  { label: '年', value: 1 },
  { label: '月', value: 2 }
];

/***
 * @description 合同  抽成类型
 *
 */
export const contractSchemeTypeList: Array<StatusNumberListType> = [
  { label: '非比较抽成', value: 1 },
  { label: '比较抽成', value: 2 },
  { label: '合并抽成', value: 3 }
];
/***
 * @description 合同  抽成方式
 *
 */
export const contractSchemeAlgMethodsList: Array<StatusNumberListType> = [
  { label: '固定抽成', value: 21 },
  { label: '销售额分段抽成', value: 22 },
  { label: '销售额分段递增抽成', value: 23 },
  { label: '货品组别分类抽成', value: 24 },
  { label: '货品组别分段抽成', value: 25 },
  { label: '货品组别分段递增抽成', value: 26 }
];

/***
 *
 * @description 合同 计租面积
 */
export const contractCalculateAreaList: Array<StatusNumberListType> = [
  { label: '使用面积', value: 1 },
  { label: '建筑面积', value: 2 }
];

/***
 *
 * @description 合同 是否含税
 */
export const contractHasTaxList: Array<StatusNumberListType> = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
];
/***
 *
 * @description 合同 是否含税
 */
export const contractChargeTypeList: Array<StatusNumberListType> = [
  { label: '固定租金', value: 1 },
  { label: '抽成租金', value: 2 }
];

/***
 *
 * @description 费用类型
 */
export const costTypeOptions: Array<StatusNumberListType> = [
  { label: '租金', value: 1 },
  { label: '物业费', value: 2 },
  { label: '意向金', value: 3 },
  { label: '保证金', value: 4 },
  { label: '滞纳金', value: 5 },
  { label: '能耗费用', value: 6 },
  { label: '临时费用', value: 7 },
  { label: '维修费用', value: 8 },
  { label: '预付款', value: 9 },
  { label: '返款费用', value: 10 }
];

/***
 *
 * @description 费用类型
 */
export const usageScenarioList: Array<StatusNumberListType> = [
  { label: '前台支付方式 ', value: 0 },
  { label: '账单支付方式 ', value: 1 }
];
/***
 *
 * @description 发票类型 单据类型 1 蓝字发票 2 红字发票
 */
export const invoiceTypeList: Array<StatusNumberListType> = [
  { label: '蓝字发票 ', value: 1 },
  { label: '红字发票 ', value: 2 }
];
/***
 *
 * @description 开票状态1开票0未开票
 */
export const invoiceStatList: Array<StatusNumberListType> = [
  { label: '未开票 ', value: 0 },
  { label: '已开票 ', value: 1 }
];
/***
 *
 * @description 状态1未开票2开票中3已开票4撤销中5已撤销
 */
export const invoiceStatList2: Array<StatusNumberListType> = [
  { label: '未开票 ', value: 1 },
  { label: '开票中 ', value: 2 },
  { label: '已开票 ', value: 3 },
  { label: '撤销中 ', value: 4 },
  { label: '已撤销 ', value: 5 },
  { label: '开票失败 ', value: 6 }
];
/***
 *
 * @description 审批状态
 */
export const examStatusList: Array<StatusNumberListType> = [
  { label: '审批不通过 ', value: 0 },
  { label: '审批中 ', value: 1 },
  { label: '审批通过 ', value: 2 },
  { label: '撤销 ', value: 3 },
  { label: '驳回 ', value: 4 }
];

// 设备类型
export const deviceTypeList: Array<StatusListType> = [
  { label: '水表', value: 1 },
  { label: '电表', value: 2 },
  { label: '燃气表', value: 3 }
];
// 是否智能设备
export const IntellectDeviceList: Array<StatusListType> = [
  { label: '是', value: 1 },
  { label: '否', value: 2 }
];
// 是否含税
export const rateTypeList: Array<StatusListType> = [
  { label: '含税', value: 1 },
  { label: '不含税', value: 2 }
];
// 账单状态
export const energyBillStatusList: Array<StatusListType> = [
  { label: '未生成账单', value: 1 },
  { label: '已生成账单', value: 2 }
];
export const weekDic: EnumHashType = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '天'
};
