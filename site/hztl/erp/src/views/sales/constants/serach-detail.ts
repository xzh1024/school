import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_SALES_SEARCH_DETAIL_LIST: TableSettingConfig<any> = {
  name: "salesSearchDetailList",
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
      prop: "companyName",
      label: "公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "billDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "billType"
    },
    {
      prop: "billTypeName",
      label: "单据类型",
      width: CELL_WIDTH.type
    },
    {
      prop: "cooperatorName",
      label: "客户",
      width: CELL_WIDTH.companyName
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "brand",
      label: "配件品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.property
    },
    {
      prop: "vehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel
    },
    {
      prop: "avaVehModel",
      label: "适用车型",
      width: CELL_WIDTH.vehModel
    },
    {
      prop: "avaVehModels",
      type: "avaVehModels",
      label: "标准适用车型",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    },
    {
      prop: "saleVehModel",
      label: "销售车型",
      width: CELL_WIDTH.vehModel,
      type: "saleVehModel"
    },
    {
      prop: "qty",
      label: "销售数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "unit",
      label: "单位",
      width: CELL_WIDTH.unit
    },
    {
      prop: "taxedPrice",
      label: "销售价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedAmount",
      label: "销售额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "freight",
      label: "运费",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "billPrice",
      label: "开单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "billAmount",
      label: "开单金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedPurchasePrice",
      label: "含税成本价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedPurchaseAmount",
      label: "含税成本额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "priceUpRate",
      label: "加价率",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "warehouseName",
      label: "所属仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "ownerCompanyName",
      label: "货主",
      width: CELL_WIDTH.ownerCompanyName
    },
    {
      prop: "stockoutQty",
      label: "已出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "returnQty",
      label: "已退货数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "urgentQty",
      label: "急件数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.no
    },
    {
      prop: "saleBillNo",
      label: "原销售单号",
      width: CELL_WIDTH.no
    },
    {
      prop: "orderBillNo",
      label: "销售订单号",
      width: CELL_WIDTH.no
    },
    {
      prop: "warehouseCompanyName",
      label: "仓库所属公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "detailRemark",
      label: "明细备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "remark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "createdAt",
      label: "创建时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "realSalePrice",
      label: "实售价",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "realSaleAmount",
      label: "实售额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedGrossProfit",
      label: "毛利",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedGrossProfit",
      label: "未税毛利",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedGrossProfitRate",
      label: "含税毛利率",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true
    },
    {
      prop: "untaxedGrossProfitRate",
      label: "未税毛利率",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true
    },
    {
      prop: "pickMethod",
      label: "提货方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "transportMethod",
      label: "运输方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "packMethod",
      label: "包装方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "financialAuditAt",
      label: "财务审核日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "stockoutDate",
      label: "出库日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "platformOrderNo",
      label: "来源单号",
      width: CELL_WIDTH.no,
      isHide: true
    },
    {
      prop: "model",
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      prop: "categoryName",
      label: "配件分类",
      width: CELL_WIDTH.categoryName,
      isHide: true
    },
    {
      prop: "settleDate",
      label: "结清日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "submitAt",
      label: "提交时间",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      isHide: true
    },
    {
      prop: "taxRate",
      label: "税率",
      width: CELL_WIDTH.taxRate,
      type: "number",
      defaultShow: true,
      isHide: true
    },
    {
      prop: "untaxedPrice",
      label: "未税售价",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAmount",
      label: "未税售额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxAmount",
      label: "税额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      prop: "untaxedPurchasePrice",
      label: "未税成本价",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPurchaseAmount",
      label: "未税成本额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "supplierName",
      label: "供应商名称",
      width: CELL_WIDTH.companyName,
      isHide: true
    },
    {
      prop: "positionName",
      label: "所属货位",
      width: CELL_WIDTH.positionName,
      isHide: true
    }
  ]
};
