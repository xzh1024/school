/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";

import { CELL_WIDTH } from "../cell-width";
import {
  PAY_BUSINESS_TYPES,
  CHARGE_BUSINESS_TYPES,
  COLLECT_BUSINESS_TYPES,
  TRANSFER_BUSINESS_TYPES
} from "../../settle";

const settleStatuses = ["待结算", "部分结算", "收款驳回"];

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const FINANCE_SETTLE_CENTER_NOWPAY = {
  name: "financeSettleCenterNowpay",
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
      prop: "billType",
      label: "来源类型",
      width: 120,
      render: (value: string, row: any) => {
        return (
          <span>
            {PAY_BUSINESS_TYPES[value]}
            {row.isUnsettle ? <span class="icon-back-settle">反</span> : null}
            {row.billStatus == 2 ? (
              <span class="icon-back-settle">驳</span>
            ) : null}
          </span>
        );
      }
    },
    {
      prop: "billNo",
      label: "来源单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "billType",
      billIdField: "billId"
    },
    {
      prop: "cooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "tradingManName",
      label: "交易对象",
      width: CELL_WIDTH.personName
    },
    {
      prop: "amount",
      label: "待收款",
      width: CELL_WIDTH.money,
      align: "right",
      type: "number",
      classNames: "number-font"
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      type: "invoiceType"
    },
    // {
    //   prop: "settlementDate",
    //   label: "结算日期",
    //   width: CELL_WIDTH.date,
    //   type: "date"
    // },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "fundAccountName",
      label: "账户",
      width: CELL_WIDTH.fundAccountName
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "companyId",
      label: "来源公司",
      width: CELL_WIDTH.companyName,
      type: "companyName"
    },
    {
      prop: "businessManName",
      label: "经办人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billStatus",
      label: "单据状态",
      width: CELL_WIDTH.type,
      formatter: (value: number) => settleStatuses[value]
    },
    {
      prop: "confirmedByName",
      label: "确认人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "confirmedAt",
      label: "确认时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "businessRemark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    }
  ]
};

export const FINANCE_SETTLE_CENTER_CHARGE = {
  name: "financeSettleCenterCharge",
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
      prop: "billType",
      label: "来源类型",
      width: 120,
      render: (value: string, row: any) => {
        return (
          <span>
            {CHARGE_BUSINESS_TYPES[value]}
            {row.isUnsettle ? <span class="icon-back-settle">反</span> : null}
            {row.billStatus == 2 ? (
              <span class="icon-back-settle">驳</span>
            ) : null}
          </span>
        );
      }
    },
    {
      prop: "billNo",
      label: "来源单号",
      type: "billNo",
      billTypeField: "billType",
      width: CELL_WIDTH.no
    },
    {
      prop: "cooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "amount",
      label: "应结金额",
      width: CELL_WIDTH.money,
      align: "right",
      type: "number"
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      type: "invoiceType"
    },
    // {
    //   prop: "settlementDate",
    //   label: "结算日期",
    //   width: CELL_WIDTH.date,
    //   type: "date"
    // },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "companyId",
      label: "来源公司",
      width: CELL_WIDTH.companyName,
      type: "companyName"
    },
    {
      prop: "businessManName",
      label: "经办人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billStatus",
      label: "单据状态",
      width: CELL_WIDTH.type,
      formatter: (value: number) => settleStatuses[value]
    },
    {
      prop: "confirmedByName",
      label: "确认人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "confirmedAt",
      label: "确认时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "businessRemark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    }
  ]
};

export const FINANCE_SETTLE_CENTER_COLLECT = {
  name: "financeSettleCenterCollect",
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
      prop: "billType",
      label: "来源类型",
      width: 120,
      render: (value: string, row: any) => {
        return (
          <span>
            {COLLECT_BUSINESS_TYPES[value]}
            {row.isUnsettle ? <span class="icon-back-settle">反</span> : null}
            {row.billStatus == 2 ? (
              <span class="icon-back-settle">驳</span>
            ) : null}
          </span>
        );
      }
    },
    {
      prop: "billNo",
      label: "来源单号",
      type: "billNo",
      billTypeField: "billType",
      width: CELL_WIDTH.no
    },
    {
      prop: "cooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "logisticsCompanyName",
      label: "物流公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "freightNo",
      label: "运单号",
      width: CELL_WIDTH.no,
      type: "freightNo"
    },
    {
      prop: "amount",
      label: "应结金额",
      width: CELL_WIDTH.money,
      align: "right",
      type: "number"
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      type: "invoiceType"
    },
    // {
    //   prop: "settlementDate",
    //   label: "结算日期",
    //   width: CELL_WIDTH.date,
    //   type: "date"
    // },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "companyId",
      label: "来源公司",
      width: CELL_WIDTH.companyName,
      type: "companyName"
    },
    {
      prop: "businessManName",
      label: "经办人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billStatus",
      label: "单据状态",
      width: CELL_WIDTH.type,
      formatter: (value: number) => settleStatuses[value]
    },
    {
      prop: "confirmedByName",
      label: "确认人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "confirmedAt",
      label: "确认时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "businessRemark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    }
  ]
};

export const FINANCE_SETTLE_CENTER_TRANSFER = {
  name: "financeSettleCenterTransfer",
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
      prop: "billType",
      label: "来源类型",
      width: 120,
      render: (value: string, row: any) => {
        return (
          <span>
            {TRANSFER_BUSINESS_TYPES[value]}
            {row.isUnsettle ? <span class="icon-back-settle">反</span> : null}
            {row.billStatus == 2 ? (
              <span class="icon-back-settle">驳</span>
            ) : null}
          </span>
        );
      }
    },
    {
      prop: "billNo",
      label: "来源单号",
      type: "billNo",
      billTypeField: "billType",
      width: CELL_WIDTH.no
    },
    {
      prop: "cooperatorName",
      label: "往来分公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "amount",
      label: "应结金额",
      width: CELL_WIDTH.money,
      align: "right",
      type: "number"
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      type: "invoiceType"
    },
    // {
    //   prop: "settlementDate",
    //   label: "结算日期",
    //   width: CELL_WIDTH.date,
    //   type: "date"
    // },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "companyId",
      label: "来源公司",
      width: CELL_WIDTH.companyName,
      type: "companyName"
    },
    {
      prop: "businessManName",
      label: "经办人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billStatus",
      label: "单据状态",
      width: CELL_WIDTH.type,
      formatter: (value: number) => settleStatuses[value]
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "businessRemark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    }
  ]
};

export const FINANCE_SETTLE_CENTER_DETAIL = {
  name: "financeSettleCenterDetail",
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
      label: "配件编码",
      prop: "code",
      width: CELL_WIDTH.code
    },
    {
      label: "配件名称",
      prop: "name",
      width: CELL_WIDTH.name
    },
    {
      label: "车型",
      prop: "vehModel",
      width: CELL_WIDTH.vehModel
    },
    {
      label: "配件品牌",
      prop: "brand",
      width: CELL_WIDTH.brand
    },
    {
      label: "产地",
      prop: "productionPlace",
      width: CELL_WIDTH.productionPlace
    },
    {
      label: "数量",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "单位",
      prop: "unit",
      width: CELL_WIDTH.unit
    },
    {
      label: "单价",
      prop: "price",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      label: "金额",
      prop: "amount",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      label: "英文名称",
      prop: "enName",
      width: CELL_WIDTH.name
    },
    {
      label: "规格",
      prop: "model",
      width: CELL_WIDTH.model
    },
    {
      label: "部位码",
      prop: "posCode",
      width: CELL_WIDTH.code
    },
    {
      label: "生产码",
      prop: "productionCode",
      width: CELL_WIDTH.code
    },
    {
      label: "库存上限",
      prop: "qtyMax",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "库存下限",
      prop: "qtyMin",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "销售状态",
      prop: "salesStatus",
      width: CELL_WIDTH.type,
      formatter: (value: number) =>
        ((value >> 4) & 1) === 1 ? "可销售" : "不可销售"
    }
  ]
};
