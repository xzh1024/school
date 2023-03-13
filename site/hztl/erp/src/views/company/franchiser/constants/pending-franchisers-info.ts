import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const FRANCHISERS_PENDING_INFO_LIST: TableSettingConfig<any> = {
  name: "FranchisersPendingListList",
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
      width: 60,
      cantExport: true
    },
    {
      prop: "status",
      label: "类型",
      width: CELL_WIDTH.type,
      formatter: val => {
        if (val === 0) {
          return "加盟申请";
        } else if (val === 3) {
          return "退出申请";
        } else {
          return "";
        }
      }
    },
    {
      prop: "name",
      label: "加盟店名称",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "areaNames",
      label: "所属区域",
      width: CELL_WIDTH.address,
      type: "area"
    },
    {
      prop: "address",
      label: "详细地址",
      width: CELL_WIDTH.address
    },
    {
      prop: "contactName",
      label: "主联系人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "contactPhone",
      label: "主联系人电话",
      width: CELL_WIDTH.phone
    },
    {
      prop: "createDate",
      label: "申请日期",
      width: CELL_WIDTH.date,
      type: "date"
    }
  ]
};
