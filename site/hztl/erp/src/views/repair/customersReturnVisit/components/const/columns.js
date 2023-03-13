import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const RETURN_VISIT_COLUMNS = [
  {
    prop: "billNo",
    label: "回访单号",
    width: CELL_WIDTH.name,
    render: value => {
      return <span class="txt-color">{value}</span>;
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "createdAt",
    label: "回访单生成日期",
    width: CELL_WIDTH.name,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "sourceBillNo",
    label: "源工单号",
    width: CELL_WIDTH.no
  },
  {
    prop: "reviewManName",
    label: "回访人",
    width: CELL_WIDTH.no
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
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleGroup",
    label: "车型",
    width: CELL_WIDTH.date
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];

export const RETURN_VISIT_SEE_COLUMNS = [
  {
    prop: "billNo",
    label: "回访单号",
    width: CELL_WIDTH.name,
    render: value => {
      return <span class="txt-color">{value}</span>;
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "createdAt",
    label: "回访单生成日期",
    width: CELL_WIDTH.name,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "sourceBillNo",
    label: "源工单号",
    width: CELL_WIDTH.no
  },
  {
    prop: "reviewStatus",
    label: "无效回访",
    width: CELL_WIDTH.date
  },
  // {
  //   prop: "contactsPhone",
  //   label: "客户评分",
  //   width: CELL_WIDTH.date
  // },
  {
    prop: "firstProcessingTime",
    label: "首次处理时间",
    width: CELL_WIDTH.name
  },
  {
    prop: "updatedAt",
    label: "最后更新时间",
    width: CELL_WIDTH.name
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
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleGroup",
    label: "车型",
    width: CELL_WIDTH.date
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
