const dataTypes = {
  "Purchase/Normal": {
    name: "订货计划单",
    type: "orderPlan"
  },
  "Purchase/Receive": {
    name: "采购到货单",
    type: "orderArrival"
  },
  "Purchase/Return": {
    name: "采购退货单",
    type: "orderReturn"
  },
  "Purchase/DispatchArrival": {
    name: "急件到货单",
    type: "dispatchArrival"
  },
  "Sales/Normal": {
    name: "客户订单",
    type: "customerOrder"
  },
  "Sales/Out": {
    name: "销售单",
    type: "saleOut"
  },
  "Sales/Return": {
    name: "销售退货单",
    type: "saleReturn"
  },
  "Store/Take": {
    name: "盘点单",
    type: "storeTake"
  },
  "Store/Move": {
    name: "移仓单",
    type: "storeMove"
  },
  "Store/RegisterIn": {
    name: "入库单",
    type: "storeRegisterIn"
  },
  "Store/RegisterOut": {
    name: "出库单",
    type: "storeRegisterOut"
  },
  "PaymentStatements/Detail": {
    name: "应收应付对账单",
    type: "stetementList"
  },
  "CollectionStatements/Detail": {
    name: "代收对账单",
    type: "collectionStetementList"
  },
  "Transfer/Apply": {
    name: "调拨申请单",
    type: "transferApply"
  },
  "Transfer/Out": {
    name: "调拨出库单",
    type: "transferOut"
  },
  "Transfer/OutReturn": {
    name: "调拨出库退货单",
    type: "transferOutReturn"
  },
  "Transfer/Storage": {
    name: "调拨入库单",
    type: "transferStorage"
  },
  "Transfer/StorageReturn": {
    name: "调拨入库退货单",
    type: "transferStorageReturn"
  },
  "statements-db/print": {
    name: "调拨对账单",
    type: "transferList"
  },
  "repair/insurance": {
    name: "保险申请单",
    type: "insurance"
  },
  "repair/pick": {
    name: "领料单",
    type: "pick"
  },
  "repair/returnPart": {
    name: "退料单",
    type: "returnPart"
  },
  "repair/billConfirm": {
    name: "维修报价单",
    type: "billConfirm"
  },
  "repair/billSettle": {
    name: "维修结算确认单",
    type: "billSettle"
  },
  "Label/Part": {
    name: "配件标签",
    type: "partLabel"
  },
  "Label/Part/Late": {
    name: "配件标签",
    type: "partLabelLate"
  },
  "Part/Late": {
    name: "配件标签",
    type: "partLabelLate"
  },
  "ShippingLabel/KD": {
    name: "发货单",
    type: "shippingLabel",
    params: "KD" // 调拨出库开单
  },
  "ShippingLabel/Logistics": {
    name: "发货单",
    type: "shippingLabel",
    params: "Logistics" // 物流登记单
  },
  "ShippingLabel/RT": {
    name: "发货单",
    type: "shippingLabel",
    params: "RT" // 调拨入库退货单
  },
  "ShippingLabel/CT": {
    name: "发货单",
    type: "shippingLabel",
    params: "CT" // 采购退货单
  },
  "ShippingLabel/XS": {
    name: "发货单",
    type: "shippingLabel",
    params: "XS" // 销售单
  }
};

export default function() {
  // const matches = location.pathname.match(/^\/Print\/(.+)\/(\d+)$/);
  // 适应电装路由加前缀的情况
  const matches = location.pathname.split("/");
  const type = matches[matches.length - 3] + "/" + matches[matches.length - 2];
  const data = dataTypes[type];
  data.id = parseInt(matches[matches.length - 1]);
  return data;
}
