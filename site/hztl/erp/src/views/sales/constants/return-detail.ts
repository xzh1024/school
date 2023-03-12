import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_SALES_RETURN_DETAIL: TableSettingConfig<any> = {
  name: "salesReturnDetail",
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
      width: 80,
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
      width: CELL_WIDTH.brand,
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
      label: "配件性质",
      prop: "property",
      width: CELL_WIDTH.property
    },
    {
      label: "规格",
      prop: "model",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      label: "退货数量",
      prop: "bookQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "退货价",
      prop: "taxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "退货金额",
      prop: "taxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税退货价",
      prop: "untaxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税退货金额",
      prop: "untaxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "开单价",
      prop: "billPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "开单金额",
      prop: "billAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxAmount",
      label: "税额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "freight",
      label: "运费",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "仓库",
      prop: "warehouseName",
      width: CELL_WIDTH.warehouseName
    },
    {
      label: "货位",
      prop: "positionName",
      width: CELL_WIDTH.positionName
    },
    {
      label: "退货原因",
      prop: "reason",
      width: CELL_WIDTH.reason
    },
    {
      label: "批次号",
      prop: "batchNo",
      width: CELL_WIDTH.no
    },
    {
      label: "客户名称",
      prop: "cooperatorName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "中间人",
      prop: "commissionName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "货主",
      prop: "ownerCompanyName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "原销售单号",
      prop: "saleBillNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "XS",
      information: {
        billDetailKey: "saleBillId"
      }
    },
    {
      label: "原销售业务员",
      prop: "saleBusinessManName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
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
      label: "销售车型",
      prop: "saleVehModel",
      width: CELL_WIDTH.vehModel,
      type: "saleVehModel"
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
      label: "标准适用车型",
      prop: "avaVehModels",
      type: "avaVehModels",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    }
  ]
};
