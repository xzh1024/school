import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { ManulData } from "@/constants/finance/manul";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const PAYMENT_TYPE = ["收入", "支出"];

export const FINANCE_MANUAL_BILL_DETAIL: TableSettingConfig<ManulData> = {
  name: "financeManualBillDetail",
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
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 70,
      cantExport: true
    },
    {
      label: "收/付款日期",
      prop: "paymentDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "往来单位",
      prop: "cooperatorName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "交易对象",
      prop: "tradingManName",
      width: CELL_WIDTH.personName
    },
    {
      label: "类型",
      prop: "paymentTypeName",
      width: CELL_WIDTH.type
    },
    {
      label: "收款金额",
      prop: "amountIn",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => Number(value) || "--"
    },
    {
      label: "付款金额",
      prop: "amountOut",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => Number(value) || "--"
    },
    {
      label: "状态",
      prop: "statusName",
      width: CELL_WIDTH.type,
      render: value => (
        <div
          class={`audit-status ${
            value === "已复核" ? "bill-audit" : "bill-unaudit"
          }`}
        >
          <i class="status-dot"></i> {value}
        </div>
      )
    },
    {
      label: "资金账户",
      prop: "fundAccountName",
      width: CELL_WIDTH.fundAccountName
    },
    {
      label: "收支类目",
      prop: "fundCategoryName",
      width: CELL_WIDTH.fundCategoryName
    },
    {
      label: "摘要",
      prop: "description",
      width: CELL_WIDTH.remark
    },
    {
      label: "结算单号",
      prop: "logNo",
      width: CELL_WIDTH.no
    },
    {
      label: "业务单结算日期",
      prop: "logDate",
      width: CELL_WIDTH.time
    },
    {
      label: "业务单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "sourceBillType"
    },
    {
      label: "业务类型",
      prop: "sourceBillType",
      width: CELL_WIDTH.type,
      formatter: value => BILL_TYPE[value]
    },
    {
      label: "经办人",
      prop: "handledByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "登记人",
      prop: "createdByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "复核人",
      prop: "reviewByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "复核时间",
      prop: "reviewDate",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "票据号码",
      prop: "checkNumber",
      width: CELL_WIDTH.no
    },
    {
      label: "票据日期",
      prop: "checkDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "发生公司",
      prop: "companyName",
      width: CELL_WIDTH.companyName
    },

    {
      label: "记账公司",
      prop: "byCompanyName",
      width: CELL_WIDTH.companyName
    },

    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
