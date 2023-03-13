import { CELL_WIDTH } from "../cell-width";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const TABLE_STAFFS_LIST_TABLE = {
  name: "staffsTable",
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
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 80,
      cantExport: true
    },
    { prop: "staffNumber", label: "编号", width: CELL_WIDTH.number },
    { prop: "realName", label: "真实姓名", width: CELL_WIDTH.personName },
    { prop: "staffName", label: "显示姓名", width: CELL_WIDTH.personName },
    { prop: "phone", label: "电话号码", width: CELL_WIDTH.phone },
    {
      prop: "status",
      label: "状态",
      width: 80,
      formatter: (value: number) => {
        return value === 1 ? "在职" : "已离职";
      }
    },
    { prop: "joinedDay", label: "入职日期", width: CELL_WIDTH.date },
    {
      prop: "gender",
      label: "性别",
      width: 80,
      formatter: (value: number) => {
        if (value) {
          return value === 1 ? "男" : "女";
        } else {
          return "";
        }
      }
    },
    { prop: "birthday", label: "出生日期", width: CELL_WIDTH.date },
    { prop: "diploma", label: "学历", width: CELL_WIDTH.date },
    { prop: "certType", label: "证件类型", width: 100 },
    { prop: "certNumber", label: "证件号码", width: CELL_WIDTH.no }
  ]
};

export const TABLE_STAFFS_ONLINE_LIST = {
  name: "onlineStaffsTable",
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
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 80,
      cantExport: true
    },
    {
      prop: "companyName",
      label: "分公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "staffName",
      label: "员工姓名",
      width: CELL_WIDTH.personName
    },
    {
      prop: "phone",
      label: "手机号",
      width: CELL_WIDTH.phone
    },
    {
      prop: "loginTime",
      label: "最近登录时间",
      width: CELL_WIDTH.time
    },
    {
      prop: "roles",
      label: "角色",
      width: CELL_WIDTH.role
    },
    {
      prop: "departmentName",
      label: "部门",
      width: CELL_WIDTH.dept
    }
  ]
};
