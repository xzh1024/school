import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { SupplierItem } from "../interface";

export const SYPPLIER_PART_SYPPLIER_LIST: TableSettingConfig<SupplierItem> = {
  name: "supplierPartSupplierList",
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
      prop: "number",
      label: "单位编码",
      width: CELL_WIDTH.number
    },
    {
      prop: "name",
      label: "往来单位名称",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "status",
      label: "供应商状态",
      width: CELL_WIDTH.status,
      formatter: val => {
        if (val === 0) {
          return "有效";
        }
        return "无效";
      }
    },
    {
      prop: "type",
      label: "供应商类型",
      width: CELL_WIDTH.type,
      formatter: val => {
        if (val === 0) {
          return "专供";
        }
        return "普通";
      }
    },
    {
      label: "供应商配件数",
      prop: "supportCount",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "签约配件数",
      prop: "signCount",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "主联系人",
      prop: "contactName",
      width: CELL_WIDTH.personName
    },
    {
      label: "主联系人电话",
      prop: "contactPhone",
      width: CELL_WIDTH.phone
    }
  ]
};
