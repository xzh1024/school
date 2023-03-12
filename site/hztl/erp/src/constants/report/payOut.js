import { CELL_WIDTH } from "../table-columns/cell-width";
import { PAY_TYPE } from "./dailyManage";
import { formateTime } from "@/utils/date";

export const TABLE_COLUMN_PAY_OUT_SUMMARY = {
  name: "payInSummary",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "settlementType",
      label: "往来账类型",
      width: CELL_WIDTH.personName,
      formatter: value => {
        return PAY_TYPE[value];
      }
    },
    {
      prop: "billCount",
      label: "单据数",
      width: CELL_WIDTH.personName
    },
    {
      prop: "amount",
      label: "登记金额",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "thisPeriodSettleAmount",
      label: "本期实付金额",
      width: CELL_WIDTH.role
    },
    {
      prop: "thisPeriodDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "settleAmount",
      label: "累计实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "discountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    }
  ]
};

export const TABLE_COLUMN_PAY_OUT_DETAIL = (dateType, code) => {
  const dateTypeObj = {
    Create: "开单日期",
    Business: "业务日期",
    Financial: "财务日期"
  };
  const dateTypePropObj = {
    Create: "createdAt",
    Business: "businessDate",
    Financial: "confirmDate"
  };
  const cooperatortype = {
    0: "往来单位",
    1: "物流公司",
    2: "分公司"
  };
  return [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.personName
    },
    {
      prop: dateTypePropObj[dateType],
      label: dateTypeObj[dateType],
      width: CELL_WIDTH.personName,
      type: "time"
    },
    {
      prop: "cooperatorName",
      label: cooperatortype[code],
      width: CELL_WIDTH.personName
    },
    {
      prop: "amount",
      label: "登记金额",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "thisPeriodSettleAmount",
      label: "本期付款金额",
      width: CELL_WIDTH.role
    },
    {
      prop: "thisPeriodDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "settleAmount",
      label: "累计实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "discountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "createdByName",
      label: "登记人",
      width: CELL_WIDTH.dept
    },
    {
      prop: "",
      label: "登记时间",
      width: CELL_WIDTH.dept,
      formatter: (_, row) => {
        const newDate = formateTime(row.createdAt);
        return newDate;
      }
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.dept
    }
  ];
};
