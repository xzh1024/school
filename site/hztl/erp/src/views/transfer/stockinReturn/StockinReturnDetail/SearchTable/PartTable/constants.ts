import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { SearchPartItem } from "../../constants";

export const STOCKIN_RETURN_PART_TABLE: TableSettingConfig<SearchPartItem> = {
  name: "transferStockinReturnParts",
  columns: [
    {
      label: "序号",
      prop: "index",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      label: "操作",
      prop: "controls",
      type: "controls",
      width: 200,
      cantExport: true
    },
    {
      label: "配件编码",
      prop: "code",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "图号",
      prop: "customCodes",
      width: CELL_WIDTH.code,
      formatter: val => (val && val.length ? val[0] : ""),
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件名称",
      prop: "name",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件品牌",
      prop: "brand",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "调出分公司",
      prop: "relatedCompanyName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "调入单号",
      prop: "billNo",
      width: CELL_WIDTH.no
    },
    {
      label: "调入时间",
      prop: "purchaseDate",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "调拨入库数",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "已退数",
      prop: "returnedQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "可退数",
      prop: "returnableQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "退货单价",
      prop: "price",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "车型",
      prop: "vehModel",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "适用车型",
      prop: "avaVehModel",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "产地",
      prop: "productionPlace",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "规格",
      prop: "model",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.personName
    },
    {
      label: "提货方式",
      prop: "pickMethod",
      width: CELL_WIDTH.method
    }
  ]
};
