import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TableSettingConfig } from "@/constants/interface";
import { dateFormat } from "@/utils/date";
import {
  TransferBillPartItem,
  TransferEditBillHeader
} from "@/views/transfer/interface";

export const TYPE = "QD";

export const defaultFormData: DetailFormData = {
  companyId: undefined,
  relatedCompanyId: undefined,
  relatedCompanyName: "",
  businessManId: undefined,
  businessManName: "",
  billDate: dateFormat(new Date()),
  planDate: "",
  remark: ""
};

export const APPLY_DETAL_TABLE_TOTAL_FILES = [
  { file: "qty", type: "qty" },
  { file: "onTransQty", type: "qty" },
  { file: "canceledQty", type: "qty" },
  { file: "outQty", type: "qty" },
  { file: "waitOutQty", type: "qty" },
  { file: "waitDeliverQty", type: "qty" },
  { file: "outAmount", type: "money" },
  { file: "waitOutAmount", type: "money" }
];

export type DetailFormData = Partial<
  Pick<
    TransferEditBillHeader,
    | "companyId"
    | "relatedCompanyId"
    | "relatedCompanyName"
    | "businessManId"
    | "businessManName"
    | "planDate"
    | "billDate"
    | "remark"
    | "mode"
  >
>;

export interface ImportInfo
  extends Partial<
    Pick<
      DetailFormData,
      | "relatedCompanyId"
      | "relatedCompanyName"
      | "businessManId"
      | "businessManName"
      | "billDate"
    >
  > {
  options: any;
  hasSetting: boolean;
  offset: number;
}

export interface BoxSearchFormData {
  code?: string;
  name?: string;
  brand?: string;
  categoryName?: string;
  property?: string;
  productionPlace?: string;
  vehModel: string;
  lackStatus?: number[];
  onlyWaitAlloc?: boolean;
}

export const APPLY_DETAL_TABLE: TableSettingConfig<TransferBillPartItem> = {
  name: "transferApplyDetail",
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
      prop: ["part", "code"],
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "name"],
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "brand"],
      label: "配件品牌",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "productionPlace"],
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "model"],
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      prop: "categoryName",
      label: "配件分类",
      width: CELL_WIDTH.categoryName
    },
    {
      prop: ["part", "vehModel"],
      label: "车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "avaVehModel"],
      label: "适用车型",
      width: CELL_WIDTH.avaVehModels,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "qty",
      label: "申请数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outWarehouseName",
      label: "调出仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "onTransQty",
      label: "待转调拨出库数量",
      width: 120,
      type: "number"
    },
    {
      prop: "canceledQty",
      label: "取消数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outQty",
      label: "已出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitOutQty",
      label: "待出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitDeliverQty",
      label: "待交货数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outAmount",
      label: "已出库金额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "waitOutAmount",
      label: "待出库金额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "warehouseName",
      label: "到货仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "completedAt",
      label: "完成时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    }
  ]
};
export const APPLY_DETAL_TABLE_TRANSFERBOX: TableSettingConfig<TransferBillPartItem> = {
  name: "transferApplyDetail",
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
      prop: ["part", "code"],
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "name"],
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "brand"],
      label: "配件品牌",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "productionPlace"],
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "model"],
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      prop: "categoryName",
      label: "配件分类",
      width: CELL_WIDTH.categoryName
    },
    {
      prop: ["part", "vehModel"],
      label: "车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "avaVehModel"],
      label: "适用车型",
      width: CELL_WIDTH.avaVehModels,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "qty",
      label: "申请数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outWarehouseName",
      label: "调出仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "onTransQty",
      label: "待转调拨出库数量",
      width: 120,
      type: "number"
    },
    {
      prop: "canceledQty",
      label: "取消数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outQty",
      label: "已出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitOutQty",
      label: "待出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitDeliverQty",
      label: "待交货数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outAmount",
      label: "已出库金额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "waitOutAmount",
      label: "待出库金额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "warehouseName",
      label: "到货仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "completedAt",
      label: "完成时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    }
  ]
};
