import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// export const ORDER_STATUS = {
//   recepting: "接待中",
//   repairing: "施工中",
//   toFinancialConfirm: "待结算确认",
//   toFinancial: "待收款交车",
//   completed: "已完成"
// };
// export const ITEM_STATUS = {
//   toDispatch: "待派工",
//   toStart: "待开工",
//   repairing: "施工中",
//   reworking: "返工中",
//   completed: "已完工"
// };

export const ORDER_COLUMNS = [
  {
    prop: "billNo",
    label: "洗车单号",
    width: CELL_WIDTH.no
  },
  {
    prop: "type",
    label: "类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "createdAt",
    label: "开单时间",
    width: CELL_WIDTH.categoryName,
    type: "time"
  },
  {
    prop: "sourceBillNo",
    label: "工单号",
    width: CELL_WIDTH.no
  },
  {
    prop: "contactsName",
    label: "送洗人",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsPhone",
    label: "送洗人电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "laundry_time",
    label: "开始洗车时间",
    width: CELL_WIDTH.categoryName
  },
  {
    prop: "customerName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerPhone",
    label: "客户电话",
    width: CELL_WIDTH.date
  }
];

export const EMPLOYEES_COLUMNS = [
  {
    prop: "multiple",
    label: "选择",
    type: "multiple",
    width: CELL_WIDTH.multiple,
    cantExport: true
  },
  {
    prop: "staffName",
    label: "姓名",
    width: CELL_WIDTH.companyNo,
    formatter(_, row) {
      const { staffName, washingCount } = row;
      return `${staffName ? staffName : ""} ${
        washingCount == 0 ? "（空闲）" : ""
      }`;
    }
  },
  {
    prop: "levelName",
    label: "级别",
    width: CELL_WIDTH.companyNo
  },
  {
    prop: "washingCount",
    label: "在洗车辆",
    width: CELL_WIDTH.companyNo
  }
];

export const CHECK_EMPLOYEES_COLUMNS = [
  {
    label: "姓名",
    formatter(_, row) {
      const { staffName, levelName } = row;
      return `${staffName ? staffName : ""} ${
        levelName ? "(" + levelName + ")" : ""
      }`;
    }
  },
  {
    prop: "proportion",
    label: "提成占比",
    width: CELL_WIDTH.date
  }
];

export const WASH_RULES = {
  plateNumber: {
    required: true,
    message: "请选择车辆",
    trigger: "change"
  },
  receptionMan: {
    required: true,
    message: "请选择接待顾问",
    trigger: "change"
  },
  receptionTime: {
    required: true,
    message: "请选择接待时间",
    trigger: "change"
  },
  amount: {
    required: true,
    message: "请输入洗车金额"
  }
};
