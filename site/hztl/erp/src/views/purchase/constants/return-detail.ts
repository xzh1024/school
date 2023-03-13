import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_PURCHASE_RETURN_DETAILS: TableSettingConfig<any> = {
  name: "purchaseReturnDetailsList",
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
      prop: "qty",
      type: "number",
      width: CELL_WIDTH.qty
    },
    {
      label: "退货价",
      prop: "taxedPrice",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "退货金额",
      prop: "taxedAmount",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税退货价",
      prop: "untaxedPrice",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税退货金额",
      prop: "untaxedAmount",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxAmount",
      label: "税额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    // {
    //   prop: "freight",
    //   label: "运费",
    //   type: "number",
    //   width: CELL_WIDTH.money,
    //   formatter: value => getNoPricePermTips(value)
    // },
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
      label: "供应商",
      prop: "cooperatorName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "货主",
      prop: "ownerCompanyName",
      width: CELL_WIDTH.companyName,
      isHide: true
    },
    {
      label: "原采购单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "sourceBillType",
      billIdField: "sourceBillId"
    },
    {
      label: "原采购业务员",
      prop: "businessManName",
      width: CELL_WIDTH.personName
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
      label: "标准适用车型",
      prop: "avaVehModels",
      type: "avaVehModels",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
