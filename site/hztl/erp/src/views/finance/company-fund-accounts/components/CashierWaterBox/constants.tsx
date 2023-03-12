import eventBus from "@/event";
import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { ManulData } from "@/constants/finance/manul";
import { ManulParams } from "@/api/finance/manual";

export interface SearchFormData
  extends Partial<
    Pick<
      ManulParams,
      | "dateType"
      | "billNo"
      | "cooperatorId"
      | "paymentTypes"
      | "statuses"
      | "businessType"
      | "description"
    >
  > {
  timeRange: string[];
}

export interface SearchParams
  extends Partial<
    Pick<
      ManulParams,
      | "dateType"
      | "billNo"
      | "cooperatorId"
      | "paymentTypes"
      | "statuses"
      | "businessType"
      | "description"
    >
  > {
  fromDate?: string;
  toDate?: string;
}

export interface TotalInfo {
  amountIn: string;
  amountOut: string;
}

export const DATE_TYPES = ["登记日期", "收付款日期", "票据日期", "复核日期"];

export const PAYMENT_TYPE = ["收入", "支出"];

export const REVIEW_STATUS = {
  0: "未复核",
  1: "已复核"
};

export const BUSINESS_TYPE = [
  "LR",
  "XS",
  "XT",
  "CG",
  "JJ",
  "CT",
  "DS",
  "DZ",
  "SS",
  "SA",
  "RS",
  "RA",
  "DD",
  "YJ",
  "FEE",
  "KZ",
  "YS",
  "YF",
  "TS",
  "TF",
  "ZZ"
].map(item => ({
  id: item,
  name: BILL_TYPE[item]
}));

export interface CompanyFundAccount {
  companyId?: number;
  companyName?: string;
  fundAccountId?: number;
  fundAccountName?: string;
}

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const FUND_ACCOUNTS_CASHIER_WATER_BOX_TABLE: TableSettingConfig<ManulData> = {
  name: "fundAccountsCashierWaterBoxTable",
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
      label: "结算日期",
      prop: "logDate",
      width: CELL_WIDTH.time,
      type: "time"
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
