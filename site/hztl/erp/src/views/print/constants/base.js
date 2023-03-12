export const INVOICE_TYPE_EMUN = {
  purchase: "采购",
  orderPlan: "订货计划单",
  orderArrival: "采购到货单",
  orderReturn: "采购退货单",
  dispatchArrival: "急件到货单",
  sale: "销售",
  customerOrder: "客户订单",
  saleOut: "销售单",
  saleReturn: "销售退货单",
  store: "仓储",
  storeTake: "盘点单",
  storeMove: "移仓单",
  storeRegisterOut: "出库单",
  storeRegisterIn: "入库单",
  finance: "出纳",
  stetementList: "应收应付对账单",
  collectionStetementList: "代收对账单",
  transferList: "调拨对账单",
  transfer: "调拨",
  transferApply: "调拨申请单",
  transferOut: "调拨出库单",
  transferOutReturn: "调拨出库退货单",
  transferStorage: "调拨入库单",
  transferStorageReturn: "调拨入库退货单",
  label: "标签",
  partLabel: "配件标签",
  partLabelLate: "配件标签",
  order: "汽修工单",
  insurance: "保险申请单",
  pick: "维修领料单",
  returnPart: "退料单",
  billConfirm: "维修报价单",
  billSettle: "维修结算确认单",
  shippingLabel: "发货单"
};

export const PRINT_KEY_LIST = Object.keys(INVOICE_TYPE_EMUN).map(key => key);

export const BASE_INVOICE_TREE = [
  {
    key: "purchase",
    disabled: true,
    children: [
      {
        key: "orderPlan"
      },
      {
        key: "orderArrival"
      },
      {
        key: "orderReturn"
      },
      {
        key: "dispatchArrival"
      }
    ]
  },
  {
    key: "sale",
    disabled: true,
    children: [
      {
        key: "customerOrder"
      },
      {
        key: "saleOut"
      },
      {
        key: "saleReturn"
      }
    ]
  },
  {
    key: "store",
    disabled: true,
    children: [
      {
        key: "storeTake"
      },
      {
        key: "storeMove"
      },
      {
        key: "storeRegisterOut"
      },
      {
        key: "storeRegisterIn"
      }
    ]
  },
  {
    key: "finance",
    disabled: true,
    children: [
      {
        key: "stetementList"
      },
      {
        key: "collectionStetementList"
      },
      {
        key: "transferList"
      }
    ]
  },
  {
    key: "transfer",
    disabled: true,
    children: [
      {
        key: "transferApply"
      },
      {
        key: "transferOut"
      },
      {
        key: "transferOutReturn"
      },
      {
        key: "transferStorage"
      },
      {
        key: "transferStorageReturn"
      }
    ]
  },
  {
    key: "label",
    disabled: true,
    children: [
      {
        key: "partLabel"
      },
      {
        key: "shippingLabel"
      }
    ]
  }
];
export const YX_INVOICE_TREE = [
  {
    key: "order",
    children: [
      {
        key: "insurance"
      },
      {
        key: "pick"
      },
      {
        key: "returnPart"
      },
      {
        key: "billConfirm"
      },
      {
        key: "billSettle"
      }
    ]
  }
];
