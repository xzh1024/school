import { BILL_TYPE } from "@/constants";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
import { formateTime } from "@/utils/date";
// import { dateFormatToSecond } from "@/utils/date";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// 待收票
export const TICKET_WAITING_COLUMNS = [
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
    prop: "billDate",
    label: "业务日期",
    width: CELL_WIDTH.date,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "billType",
    label: "业务类型",
    width: CELL_WIDTH.date,
    formatter: value => BILL_TYPE[value]
  },
  {
    prop: "billNo",
    label: "业务单号",
    type: "billNo",
    billTypeField: "billType",
    width: CELL_WIDTH.creditCode,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "companyName",
    label: "分公司",
    width: CELL_WIDTH.name
  },
  {
    prop: "cooperatorName",
    label: "往来单位",
    width: CELL_WIDTH.name
  },
  {
    prop: "businessAmount",
    label: "入库金额",
    width: CELL_WIDTH.date,
    align: "right",
    render: value => {
      if (value >= 0) {
        return <span class="main-color">{value}</span>;
      } else {
        return <span class="error-color">{value}</span>;
      }
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "toInvoiceAmount",
    label: "应收票金额",
    width: CELL_WIDTH.code,
    align: "right",
    render: value => {
      if (value >= 0) {
        return <span class="main-color">{value}</span>;
      } else {
        return <span class="error-color">{value}</span>;
      }
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "invoicedAmount",
    label: "已收票金额",
    width: CELL_WIDTH.code,
    align: "right",
    render: value => {
      if (value >= 0) {
        return <span class="main-color">{value}</span>;
      } else {
        return <span class="error-color">{value}</span>;
      }
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "unInvoiceAmount",
    label: "未收票金额",
    width: CELL_WIDTH.code,
    align: "right",
    render: value => {
      if (value >= 0) {
        return <span class="main-color">{value}</span>;
      } else {
        return <span class="error-color">{value}</span>;
      }
    },
    attrs: {
      sortable: "custom"
    }
  },
  // {
  //   prop: "status",
  //   label: "收票状态",
  //   width: CELL_WIDTH.date,
  //   attrs: {
  //     sortable: "custom"
  //   }
  // },
  {
    prop: "invoiceType",
    label: "发票类型",
    width: CELL_WIDTH.code,
    formatter: (_, row) => {
      if (!row) return "";
      return row.invoiceType
        ? row.invoiceType + `(${Number(row.taxRate * 100)}%)`
        : "-";
    }
  },
  {
    prop: "taxAmount",
    label: "税额",
    align: "right",
    width: CELL_WIDTH.date,
    render: value => {
      if (value >= 0) {
        return <span class="main-color">{value}</span>;
      } else {
        return <span class="error-color">{value}</span>;
      }
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "financialAt",
    label: "财务审核时间",
    width: CELL_WIDTH.name,
    formatter: (_, row) => {
      if (!row) return "";
      return row.financialAt ? formateTime(row.financialAt) : "-";
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "businessManName",
    label: "业务员",
    width: CELL_WIDTH.date
  },
  {
    prop: "createdByName",
    label: "制单人",
    width: CELL_WIDTH.date
  },
  {
    prop: "financialByName",
    label: "财务审核人",
    width: CELL_WIDTH.code
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      if (!row) return "";
      return row.Remark ? row.Remark : "-";
    }
  }
];

// 收票单
export const TICKET_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "invoiceDate",
    label: "收票日期",
    width: CELL_WIDTH.date,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "companyName",
    label: "收票分公司",
    width: CELL_WIDTH.name
  },
  {
    prop: "cooperatorName",
    label: "往来单位",
    width: CELL_WIDTH.name
  },
  {
    prop: "invoiceNo",
    label: "发票号码",
    width: CELL_WIDTH.name,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "invoiceType",
    label: "发票类型",
    width: CELL_WIDTH.code,
    formatter: (_, row) => {
      if (!row) return "";
      return row.invoiceType
        ? row.invoiceType + `(${Number(row.taxRate * 100)}%)`
        : "-";
    }
  },
  {
    prop: "amount",
    label: "收票金额",
    align: "right",
    width: CELL_WIDTH.date,
    render: value => {
      if (value >= 0) {
        return <span class="main-color">{value}</span>;
      } else {
        return <span class="error-color">{value}</span>;
      }
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "taxAmount",
    label: "税额",
    align: "right",
    width: CELL_WIDTH.date,
    render: value => {
      if (value >= 0) {
        return <span class="main-color">{value}</span>;
      } else {
        return <span class="error-color">{value}</span>;
      }
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      if (value == "invalid") {
        return <span class="error-color">作废</span>;
      } else {
        return <span>有效</span>;
      }
    }
  },
  {
    prop: "createdName",
    label: "收票人",
    width: CELL_WIDTH.date
  },
  {
    prop: "invalidName",
    label: "作废人",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      if (!row) return "";
      return row.invalidName ? row.invalidName : "-";
    }
  },
  {
    prop: "invalidDate",
    label: "作废时间",
    width: CELL_WIDTH.name,
    formatter: (_, row) => {
      if (!row) return "";
      return row.invalidDate ? formateTime(row.invalidDate) : "-";
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
