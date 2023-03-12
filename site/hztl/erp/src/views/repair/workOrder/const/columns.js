import { CELL_WIDTH } from "@/constants/table-columns/cell-width";

export const ORDER_STATUS = {
  recepting: "接待中",
  repairing: "施工中",
  toFinancialConfirm: "待结算确认",
  toFinancial: "待收款交车",
  completed: "已完成"
};
export const ORDER_STEP_STATUS = {
  wash: "需要洗车",
  recovery: "客户需要回收旧件",
  needDispatch: "有服务项目需要派工",
  needStartAndComplete: "有服务项目需要需要开工、完工",
  customerOfferConfirmed: "客户已报价确认",
  customerSettleConfirmed: "客户已结算确认",
  uploadedHealth: "客户已上传健康档案"
};
export const ITEM_STATUS = {
  toDispatch: "待派工",
  toStart: "待开工",
  repairing: "施工中",
  reworking: "返工中",
  completed: "已完工",
  repairingNoOperate: "施工中"
};
export const FEE_PROPERTY = {
  self: "自费",
  free: "免费",
  guarantee: "保修",
  rework: "返修",
  insurance: "保险",
  paid: "已购"
};
export const FEE_PROPERTY_OPTIONS = [
  {
    name: "自费",
    id: "self"
  },
  {
    name: "免费",
    id: "free"
  },
  {
    name: "保修",
    id: "guarantee"
  },
  {
    name: "返修",
    id: "rework"
  },
  {
    name: "保险",
    id: "insurance"
  },
  {
    name: "已购",
    id: "paid",
    disabled: true
  }
];

export const ORDER_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    formatter: value => {
      return ORDER_STATUS[value] || "";
    },
    attrs: {
      filters:
        "[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
    }
  },
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionTime",
    label: "接待时间",
    width: CELL_WIDTH.date,
    type: "time"
  },
  {
    prop: "cooperatorPhone",
    label: "客户电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "billNo",
    label: "工单号",
    width: CELL_WIDTH.date
  }
];

export const PART_DETAIL_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "partCode",
    label: "配件编码",
    width: CELL_WIDTH.date
  },
  {
    prop: "partName",
    label: "配件名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "billNo",
    label: "领/退料单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "qty",
    label: "领/退料数",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessManName",
    label: "领/退料人",
    width: CELL_WIDTH.date
  },
  {
    prop: "technicianName",
    label: "维修工",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessTime",
    label: "领/退料时间",
    width: CELL_WIDTH.date,
    type: "time"
  },
  {
    prop: "createdByName",
    label: "库存人员",
    width: CELL_WIDTH.date
  },
  {
    prop: "remark",
    label: "备注"
  }
];
