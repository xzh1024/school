import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_PURCHASE_SEARCH_LIST: TableSettingConfig<any> = {
  name: "purchaseSearchList",
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
      information: {
        billDetailKey: "id"
      },
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
      label: "供应商",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "qty",
      label: "总数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "stockinQty",
      label: "已入库数量",
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
      prop: "taxedAmount",
      label: "进货总额",
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
      prop: "untaxedAmount",
      label: "未税额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
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
      prop: "amountIn",
      label: "应结金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "benefitAmount",
      label: "优惠金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "settleAmount",
      label: "实付金额",
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
      prop: "freight",
      label: "运费",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "receiverInfo",
      label: "收货信息",
      width: CELL_WIDTH.receiverInfo
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type,
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
      isHide: true
    },
    {
      prop: "packMethod",
      label: "包装方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "statusName",
      label: "单据状态",
      width: CELL_WIDTH.status,
      isHide: true
    },
    {
      prop: "financialAuditByName",
      label: "财务审核人",
      width: CELL_WIDTH.personName,
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
      prop: "stockinStatusName",
      label: "入库状态",
      width: CELL_WIDTH.status,
      isHide: true
    },
    {
      prop: "stockinDate",
      label: "入库日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "printCount",
      label: "打印次数",
      width: CELL_WIDTH.qty,
      type: "number",
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
      prop: "createdAt",
      label: "创建时间",
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
      prop: "settleRemark",
      label: "结算备注",
      width: CELL_WIDTH.remark,
      isHide: true
    }
  ]
};
