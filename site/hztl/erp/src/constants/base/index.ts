import { chain } from "lodash";

export * from "./base-data";
export interface DictionaryItem {
  builtin?: boolean;
  id?: number | string;
  code?: number;
  isDefault: boolean;
  mnemonic?: string;
  name: string;
  specialValue?: string;
  disable?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface DictionaryChildItem {
  key: string;
  name: string;
  editable?: boolean;
  specialName?: string;
  isHide?: boolean;
}

interface DictionaryEmunItem {
  key: string;
  name: string;
  children: DictionaryChildItem[];
}

export const baseDictionaryEmun: DictionaryEmunItem[] = [
  {
    key: "common",
    name: "常用字典",
    children: [
      {
        name: "计量单位",
        key: "unit",
        editable: true
      }
    ]
  },
  {
    key: "goods",
    name: "商品类",
    children: [
      {
        name: "配件品牌",
        key: "partBrand",
        editable: true
      },
      {
        name: "配件性质",
        key: "property",
        editable: true
      },
      {
        name: "配件分类",
        key: "category",
        editable: true
      },
      {
        name: "产地",
        key: "productionPlace",
        editable: true
      },
      {
        name: "配件类别",
        key: "partType",
        editable: false
      },
      {
        name: "车型",
        key: "vehModel",
        editable: true
      }
    ]
  },
  {
    key: "bills",
    name: "单据类",
    children: [
      {
        name: "提货方式",
        key: "deliveryType",
        editable: true
      },
      {
        name: "发票类型",
        key: "invoiceType",
        editable: true,
        specialName: "税率"
      },
      {
        name: "退货原因",
        key: "returnReason",
        editable: true
      },
      {
        name: "货币种类",
        key: "currency",
        editable: true,
        specialName: "对人民币汇率",
        isHide: true
      },
      {
        name: "结算方式",
        key: "settlementType",
        editable: false
      },
      {
        name: "现付支付方式",
        key: "paymentType",
        editable: true
      }
    ]
  },
  {
    key: "logistics",
    name: "物流类",
    children: [
      {
        name: "运输方式",
        key: "transportType",
        editable: true
      },
      {
        name: "包装方式",
        key: "packingWay",
        editable: true
      },
      {
        name: "运费付款方",
        key: "freightPayer",
        editable: false
      }
    ]
  },
  {
    key: "customer",
    name: "客户类",
    children: [
      {
        name: "客户性质",
        key: "customerType",
        editable: true
      },
      {
        name: "欠款类型",
        key: "debtType",
        editable: true
      },
      {
        name: "用户类型",
        key: "companyType",
        editable: false,
        isHide: true
      }
    ]
  }
];
export const yxDictionaryEmun: DictionaryEmunItem[] = [
  {
    key: "repair",
    name: "维修类",
    children: [
      {
        name: "项目类型",
        key: "repairProjectCategory",
        editable: true
      },
      {
        name: "业务类型",
        key: "repairBusinessCategory",
        editable: true
      },
      {
        name: "车辆级别",
        key: "vehicleLevel",
        editable: true
      },
      {
        name: "车辆类型",
        key: "vehicleType",
        editable: true
      },
      {
        name: "技师级别",
        key: "technicianLevel",
        specialName: "级别提成权重",
        editable: true
      },
      {
        name: "技师工种",
        key: "technicianCategory",
        editable: true
      }
    ]
  }
];
export const dictionaryEmun: DictionaryEmunItem[] = [
  ...baseDictionaryEmun,
  ...yxDictionaryEmun
];
export const dictionaryList = chain(dictionaryEmun)
  .map(item => item.children)
  .flatten()
  .value();

export const dictionaryKeys = dictionaryList
  .map(item => item.key)
  .filter(key => key != "vehModel")
  .concat([
    "enhancedSettlementType", // 支付方式
    "priceType", // 价格类型
    "credentials", // 证件类型
    "insureCertType", // 保险认证分类
    "education", // 学历
    "profession", // 职业
    "nation" // 民族
  ]);
