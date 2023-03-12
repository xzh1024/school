import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const STATUS_OPTIONS = [
  {
    id: "未提醒",
    name: "未提醒"
  },
  {
    id: "已微信提醒",
    name: "已微信提醒"
  },
  {
    id: "已提醒",
    name: "已提醒"
  }
];

export const MAINTENANCE_COLUMNS = [
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
    prop: "sourceBillNo",
    label: "工单号",
    width: CELL_WIDTH.name
  },
  {
    prop: "status",
    label: "提醒状态",
    width: CELL_WIDTH.name
  },
  {
    prop: "customerName",
    label: "客户名称",
    width: CELL_WIDTH.no
  },
  {
    prop: "phone",
    label: "联系电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleTypeName",
    label: "车型",
    width: CELL_WIDTH.date
  },
  {
    prop: "companyName",
    label: "建档分公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "lastMaintainCompanyName",
    label: "工单业务分公司",
    width: CELL_WIDTH.name
  },
  {
    prop: "receptionManName",
    label: "接待顾问",
    width: CELL_WIDTH.date
  },
  {
    prop: "lastMaintainMileage",
    label: "进厂里程",
    width: CELL_WIDTH.date,
    render: value => {
      return value > 0 ? value + "km" : "";
    }
  },
  {
    prop: "endDate",
    label: "下次保养日期",
    width: CELL_WIDTH.date
  },
  {
    prop: "nextMaintainMileage",
    label: "下次保养里程",
    width: CELL_WIDTH.date,
    render: value => {
      return value ? value + "km" : "";
    }
  },
  {
    prop: "leftDays",
    label: "距离下次保养天数",
    width: CELL_WIDTH.name
  }
];

export const RENEWAL_COLUMNS = [
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
    prop: "status",
    label: "提醒状态",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "phone",
    label: "联系电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleTypeName",
    label: "车型",
    width: CELL_WIDTH.date
  },
  {
    prop: "companyName",
    label: "建档分公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "insuranceCompanyName",
    label: "保险公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "endDate",
    label: "保险到期日期",
    width: CELL_WIDTH.date
  },
  {
    prop: "leftDays",
    label: "距离脱保天数",
    width: CELL_WIDTH.date
  }
];

export const YEAR_CAREFUL_COLUMNS = [
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
    prop: "status",
    label: "提醒状态",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "phone",
    label: "联系电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleTypeName",
    label: "车型",
    width: CELL_WIDTH.date
  },
  {
    prop: "companyName",
    label: "建档分公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "endDate",
    label: "年审到期日",
    width: CELL_WIDTH.date
  },
  {
    prop: "leftDays",
    label: "距离下次年审天数",
    width: CELL_WIDTH.date
  }
];
