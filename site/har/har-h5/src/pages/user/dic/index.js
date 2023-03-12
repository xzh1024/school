export const handleArr = [
  {
    name: "收藏",
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-collect.png",
    path: "/pages/user/sub/collect-list"
  },
  {
    name: "积分",
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-integral.png",
    path: "/pages/user/sub/integral-center"
  },
  {
    name: "优惠券",
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-coupon.png",
    path: "/pages/user/sub/coupon-list"
  },
  /*{
    name: "我的活动",
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-activity.png",
    path: "/pages/activity/list"
  },*/
  {
    name: "储值卡",
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-activity.png",
    path: "/pages/card/tabbar/home"
  },
  {
    name: "限期卡",
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-activity.png",
    path: "/pages/card/timeCard/index?cardType=1"
  },
  {
    name: "次卡",
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-activity.png",
    path: "/pages/card/timeCard/index?cardType=2"
  }
];

export const orderStatusArr = [
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-order1.png",
    name: "待付款",
    status: 0
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-order2.png",
    name: "待使用",
    status: 1
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-order3.png",
    name: "已完成",
    status: 11
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-order4.png",
    name: "退款/售后",
    status: 2
  }
];

export const myServeArr = [
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-msg.png",
    name: "消息中心",
    path: ""
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-park.png",
    name: "停车服务",
    path: ""
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-navigation.png",
    name: "导航服务",
    path: ""
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-integral-shop.png",
    name: "积分商城",
    path: ""
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-goods-address.png",
    name: "收获地址",
    path: ""
  }
];

export const sysServeArr = [
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-online-man.png",
    name: "在线客服",
    path: "",
    handleType: "phone"
  }
  /*
  @todo 暂时屏蔽
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-advise.png",
    name: "意见反馈",
    path: "",
  },
  {
    icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-serve-help.png",
    name: "帮助中心",
    path: "",
  }*/
];

export const iconQRCode =
  "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-qr-code.png";

export const iconRight =
  "https://har-cbd-cdn.huianrong.com/har-cbd/applet/use/icon-right.png";

export const activityStatusArr = [
  {
    name: "作废",
    value: -1,
    color: "#ddd"
  },
  {
    name: "等待预热",
    value: 1,
    color: "#ddd"
  },
  {
    name: "预热中",
    value: 2,
    color: "#FEA725"
  },
  {
    name: "等待报名",
    value: 3,
    color: "#ddd"
  },
  {
    name: "报名中",
    value: 4,
    color: "#FF5F00"
  },
  {
    name: "等待活动开始",
    value: 5,
    color: "#FFBB08"
  },
  {
    name: "活动中",
    value: 6,
    color: "#66D52F"
  },
  {
    name: "活动结束",
    value: 7,
    color: "#ddd"
  }
];
