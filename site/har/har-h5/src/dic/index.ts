import IconBuy from "@/static/card/record/icon-buy.png";
import IconUse from "@/static/card/record/icon-use.png";
import IconRecharge from "@/static/card/record/icon-recharge.png";
import IconConsume from "@/static/card/record/icon-consume.png";
import IconCardRefund from "@/static/card/record/icon-card-refund.png";

export interface feeType {
  label: string;
  value: number | string;
  logo?: string;
  color?: string;
  mark?: string;
}
export const fee_classify: feeType[] = [
  {
    label: "全部",
    value: "",
    logo: "",
    color: ""
  },
  {
    label: "消费",
    value: 3,
    logo: IconUse,
    color: "#fa4e40",
    mark: "-"
  },
  {
    label: "购卡",
    value: 1,
    logo: IconBuy,
    color: "#549502",
    mark: "+"
  },
  {
    label: "充值",
    value: 2,
    logo: IconRecharge,
    color: "#549502",
    mark: "+"
  },
  {
    label: "退款",
    value: 4,
    logo: IconConsume,
    color: "#549502",
    mark: "+"
  },
  {
    label: "退卡",
    value: 5,
    logo: IconCardRefund,
    color: "#fa4e40",
    mark: ""
  }
];

export const card_status = [
  {
    label: "使用中",
    value: 1
  },
  {
    label: "已冻结",
    value: 2
  },
  {
    label: "已退卡",
    value: 3
  }
];

export interface DicKeyMap {
  [key: number]: string;
}

export const scene_status = {
  1: "购卡",
  2: "充值",
  3: "消费",
  4: "退款",
  5: "退卡",
  6: "冻结"
} as DicKeyMap;

export const active_target = {
  1: "全部用户"
} as DicKeyMap;

export const activeType = {
  1: "满减",
  2: "满赠",
  3: "满折"
} as DicKeyMap;

export const storeApplyType = {
  1: "全部店铺",
  2: "指定店铺可用",
  3: "指店铺地不可用"
} as DicKeyMap;
