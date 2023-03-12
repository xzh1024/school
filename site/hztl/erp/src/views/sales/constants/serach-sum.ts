import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_SALES_SEARCH_LIST: TableSettingConfig<any> = {
  name: "salesSearchSumList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "companyName",
      label: "公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "billDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "billType",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billTypeName",
      label: "单据类型",
      width: CELL_WIDTH.type
    },
    {
      prop: "cooperatorName",
      label: "客户",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "qty",
      label: "销售量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "taxedAmount",
      label: "销售额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "freight",
      label: "运费",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type
    },
    {
      prop: "billAmount",
      label: "开单金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "amountIn",
      label: "应收金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "benefitAmount",
      label: "结算优惠",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "realAmountIn",
      label: "实收金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "unsettleAmount",
      label: "未结金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedPurchaseAmount",
      label: "含税成本额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "priceUpRate",
      label: "加价率",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "statusName",
      label: "单据状态",
      width: CELL_WIDTH.status
    },
    {
      prop: "financialAuditByName",
      label: "财务审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "stockoutStatusName",
      label: "出库状态",
      width: CELL_WIDTH.status
    },
    {
      prop: "stockoutQty",
      label: "已出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "returnQty",
      label: "已退货数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "stockoutDate",
      label: "出库日期",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "printCount",
      label: "打印次数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "remark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "receiverInfo",
      label: "收货信息",
      width: CELL_WIDTH.receiverInfo
    },
    {
      prop: "createdAt",
      label: "创建时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "financialAuditRemark",
      label: "财务审核备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "untaxedGrossProfit",
      label: "未税毛利",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedGrossProfitRate",
      label: "未税毛利率",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true
    },
    {
      prop: "taxedGrossProfit",
      label: "含税毛利",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedGrossProfitRate",
      label: "含税毛利率",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true
    },
    {
      prop: "pickMethod",
      label: "提货方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "transportMethod",
      label: "运输方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "packMethod",
      label: "包装方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "plateNumber",
      label: "车牌号",
      width: CELL_WIDTH.code,
      isHide: true
    },
    {
      prop: "financialAuditAt",
      label: "财务确认日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "settleDate",
      label: "结清日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "submitAt",
      label: "提交时间",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "taxRate",
      label: "税率",
      width: CELL_WIDTH.taxRate,
      type: "number",
      isHide: true
    },
    {
      prop: "taxAmount",
      label: "税额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      prop: "untaxedAmount",
      label: "未税额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPurchaseAmount",
      label: "未税进货总额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    }
  ]
};
