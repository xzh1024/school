/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";
import { CELL_WIDTH } from "@/constants";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

//维度字段列表
export const REPORT_PURCHASE_LIST_CHILDREN = {
  name: "reportPurchaseListChildren",
  columns: [
    {
      prop: "date",
      label: "日期",
      width: CELL_WIDTH.date,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "companyName",
      label: "分公司",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "cooperatorArea",
      label: "供应商区域",
      width: CELL_WIDTH.no,
      type: "cooperatorArea",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "cooperatorNameStr",
      label: "供应商名称",
      width: CELL_WIDTH.personName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "settlementType",
      label: "支付方式",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "businessMan",
      label: "业务员",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "createdByMan",
      label: "制单人",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "financialAuditByMan",
      label: "财务审核人",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billType",
      label: "单据类型",
      width: CELL_WIDTH.status,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "status",
      label: "单据状态",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.statusStr;
      }
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.no,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCode",
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partName",
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partBrand",
      label: "配件品牌",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCategory",
      label: "配件分类",
      width: CELL_WIDTH.categoryName,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.partCategory;
      }
    },
    {
      prop: "partVehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partProductionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "purchaseNo",
      label: "原采购单号",
      width: CELL_WIDTH.no,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};

//父列表指标字段
export const REPORT_PURCHASE_LIST_SEARCH = {
  name: "reportPurchaseListSearch",
  columns: [
    {
      prop: "billCount",
      label: "单据数",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCount",
      label: "配件种类数",
      width: 150,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "purchaseQty",
      label: "采购数量",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "amountIn",
      label: "进货金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "amountInRatio",
      label: "占进货金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "untaxedAmount",
      label: "未税金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "untaxedAmountRatio",
      label: "占未税金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "taxAmount",
      label: "税额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "dueAmount",
      label: "应结金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "benefitAmount",
      label: "优惠金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "paidAmount",
      label: "实付金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "settledAmount",
      label: "已结金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "unSettledAmount",
      label: "未结金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "returnedQty",
      label: "已退货数量",
      width: 110,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "returnedAmount",
      label: "已退货金额",
      width: 110,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "returnedRatio",
      label: "退货率",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    }
  ]
};

//子列表维度字段
export const REPORT_PURCHASE_LIST_CHILD = {
  name: "reportPurchaseListChild",
  columns: [
    {
      prop: "billCount",
      label: "单据数",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCount",
      label: "配件种类数",
      width: 150,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "purchaseQty",
      label: "采购数量",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "amountIn",
      label: "进货金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "amountInRatio",
      label: "占进货金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "untaxedAmount",
      label: "未税金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "untaxedAmountRatio",
      label: "占未税金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "taxAmount",
      label: "税额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    // {
    //   prop: "dueAmount",
    //   label: "应结金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "benefitAmount",
    //   label: "优惠金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "paidAmount",
    //   label: "实付金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "settledAmount",
    //   label: "已结金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "unSettledAmount",
    //   label: "未结金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    {
      prop: "returnedQty",
      label: "已退货数量",
      width: 110,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "returnedAmount",
      label: "已退货金额",
      width: 110,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "returnedRatio",
      label: "退货率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    }
  ]
};
