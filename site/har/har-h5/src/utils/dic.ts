export const useStatusList = [
  {
    value: 0,
    label: "去使用"
  },
  {
    value: 1,
    label: "已使用"
  },
  {
    value: 2,
    label: "已过期"
  }
];

// 活动列表分类
export const activityCategory = [
  { type: "全部", value: 0 },
  { type: "未开始", value: 1 },
  { type: "报名中", value: 2 },
  { type: "已结束", value: 3 }
];
// 商品列表订单状态
export const orderListStatus = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "待付款",
    value: 0
  },
  {
    label: "待使用",
    value: 1
  },
  {
    label: "已完成",
    value: 11
  },
  {
    label: "退款/售后",
    value: 2
  }
];
export const orderAllListStatus = [
  {
    label: "已取消",
    value: -1
  },
  {
    label: "待付款",
    value: 0
  },
  {
    label: "待使用",
    value: 1
  },
  {
    label: "退款中",
    value: 2
  },
  {
    label: "已退款",
    value: 3
  },
  {
    label: "已发货",
    value: 10
  },
  {
    label: "已完成",
    value: 11
  }
];

// 购买商品产生的卡券的使用状态
export const couponStatusHash = {
  0: "未使用",
  1: "已使用",
  2: "已过期",
  3: "已作废"
};

// 优惠券类型
export const couponTypeList = [
  {
    label: "满减券",
    value: 1
  },
  {
    label: "折扣券",
    value: 2
  },
  {
    label: "礼品券",
    value: 3
  },
  {
    label: "积分现金券",
    value: 4
  }
];

// 店铺场馆类型字典

export const storePlaceTypeList = [
  {
    label: "次卡",
    value: 1
  },
  {
    label: "时段",
    value: 2
  },
  {
    label: "包场",
    value: 3
  }
];

// 首页 分类
export const homeTypeList = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "智能排序",
    value: 0
  },
  {
    label: "热度最高",
    value: 1
  },
  {
    label: "销量优先",
    value: 2
  },
  {
    label: "最新开张",
    value: 3
  }
];

//首页 活动
export const homeActivityList = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "热度最高",
    value: 1
  },
  {
    label: "最新发布",
    value: 2
  },
  {
    label: "我的收藏",
    value: 3
  },
  {
    label: "我已报名",
    value: 4
  }
];
