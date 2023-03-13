import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const FRANCHISERS_INFO_LIST: TableSettingConfig<any> = {
  name: "FranchisersInfoList",
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
      prop: "name",
      label: "加盟店名称",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "zeroStockPartQty",
      label: "零库存配件数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "lastPurchaseTime",
      label: "上次进货时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "authedPartQty",
      label: "已授权配件数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "authedBrandQty",
      label: "已授权品牌数",
      width: CELL_WIDTH.qty,
      type: "number"
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
      prop: "invoicePhone",
      label: "公司电话",
      width: CELL_WIDTH.phone
    },
    {
      prop: "createDate",
      label: "加盟日期",
      width: CELL_WIDTH.date,
      type: "date"
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
    }
  ]
};
