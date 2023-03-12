import { PURCHASE_ORDER_STATUS } from "@/constants/states/purchase";
import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_PURCHASE_BILLING_LIST: TableSettingConfig<any> = {
  name: "purchaseBillingList",
  columns: [
    {
      label: "序号",
      prop: "index",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      label: "业务日期",
      prop: "billDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "单据号",
      prop: "billNo",
      width: CELL_WIDTH.no
    },
    {
      label: "单据状态",
      prop: "status",
      width: CELL_WIDTH.status,
      formatter: (value: number) => {
        return PURCHASE_ORDER_STATUS[value];
      }
    },
    {
      label: "供应商",
      prop: "cooperatorName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "订货数量",
      prop: "bookQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "订货金额",
      prop: "taxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "定金",
      prop: "depositAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "待转采购数量",
      prop: "waitPurchaseQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "取消数量",
      prop: "terminatedQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "已入库数量",
      prop: "arrivaledQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "待入库数量",
      prop: "waitArrivalQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "本单在途数量",
      prop: "transitQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "待转采购金额",
      prop: "waitPurchaseAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "取消金额",
      prop: "terminatedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "已入库金额",
      prop: "arrivaledAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "待入库金额",
      prop: "waitArrivalAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "本单在途金额",
      prop: "transitAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "预计到货日期",
      prop: "arrivalDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "未税订货金额",
      prop: "untaxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxAmount",
      label: "税额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "税率",
      prop: "taxRate",
      width: CELL_WIDTH.taxRate,
      type: "percent"
    },
    {
      label: "发票类型",
      prop: "invoiceType",
      width: CELL_WIDTH.type
    },
    {
      label: "支付方式",
      prop: "enhancedSettlementType",
      width: CELL_WIDTH.type
    },
    {
      label: "对方单号",
      prop: "peerOrderNo",
      width: CELL_WIDTH.no
    },
    {
      label: "单据来源",
      prop: "sourceType",
      width: CELL_WIDTH.type
    },
    {
      label: "来源单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no
    },
    {
      label: "收货人",
      prop: "receiverName",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      label: "收货电话",
      prop: "receiverPhone",
      width: CELL_WIDTH.phone,
      isHide: true
    },
    {
      label: "收货区域",
      prop: "receiverAreaNames",
      width: CELL_WIDTH.address,
      type: "area",
      isHide: true
    },
    {
      label: "收货地址",
      prop: "receiverAddress",
      width: CELL_WIDTH.address,
      isHide: true
    },
    {
      label: "包装方式",
      prop: "packMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "提货方式",
      prop: "pickMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "运输方式",
      prop: "transportMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "运费付款方",
      prop: "freightPayer",
      width: CELL_WIDTH.freightPayer,
      isHide: true
    },
    {
      label: "物流公司",
      prop: "logisticsCompanyName",
      width: CELL_WIDTH.companyName,
      isHide: true
    },
    {
      label: "业务员",
      prop: "businessManName",
      width: CELL_WIDTH.personName
    },
    {
      label: "制单人",
      prop: "createdByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "制单时间",
      prop: "createdAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "提交人",
      prop: "submitByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "提交时间",
      prop: "submitAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "审核人",
      prop: "auditByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "审核时间",
      prop: "auditAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "完成时间",
      prop: "completedAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "打印次数",
      prop: "printCount",
      width: CELL_WIDTH.count
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark,
      isHide: true
    }
  ]
};
