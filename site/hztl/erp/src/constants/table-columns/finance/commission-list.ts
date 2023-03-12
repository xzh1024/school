import { CELL_WIDTH } from "../cell-width";
import { KeyStatusEmun } from "@/constants/interface";
import { TableSettingConfig } from "@/constants/interface";
const ORDER_TYPE: KeyStatusEmun = {
  XS: "配件销售",
  XT: "销售退货"
};
const STATUS_TYPE: KeyStatusEmun = {
  0: "不可结算",
  1: "可结算",
  2: "已结清"
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE__COMMISSION_LIST_TABLE: TableSettingConfig<any> = {
  name: "ListTable",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index
    },
    {
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      prop: "businessType",
      label: "业务类型",
      width: CELL_WIDTH.type,
      formatter: (value: string) => {
        return ORDER_TYPE[value] || "";
      }
    },
    {
      prop: "businessDate",
      label: "业务日期",
      type: "date",
      width: CELL_WIDTH.date
    },
    {
      prop: "businessBillNo",
      label: "业务单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "businessType",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "status",
      label: "佣金状态",
      width: CELL_WIDTH.status,
      formatter: (value: string) => {
        return STATUS_TYPE[value] || "";
      }
    },
    {
      prop: "companyName",
      label: "业务公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "customerName",
      label: "客户名称",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "commissionName",
      label: "中间人",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "amount",
      label: "应结佣金",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "commissionSettledAmount",
      label: "实付佣金",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "commissionDiscount",
      label: "佣金优惠金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "commissionUnSettleAmount",
      label: "佣金余额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "businessSettleDate",
      label: "业务结算日期",
      type: "date",
      width: CELL_WIDTH.date
    },
    {
      prop: "businessSettleBillNo",
      label: "结算单号",
      width: CELL_WIDTH.no
    },
    {
      prop: "commissionPhone",
      label: "中间联系人电话",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "commissionContactMan",
      label: "中间人主联系人",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "commissionContactPhone",
      label: "中间人主联系人电话",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "billRealAmount",
      label: "实售额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "billFalseAmount",
      label: "开单金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "businessRecAmount",
      label: "应收额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "businessSettledAmount",
      label: "实收金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "businessDiscount",
      label: "优惠金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "businessUnSettleAmount",
      label: "未结金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "businessRemark",
      label: "业务单据备注",
      width: CELL_WIDTH.remark
    }
  ]
};
