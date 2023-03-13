import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_PURCHASE_SEARCH_DETAIL_LIST: TableSettingConfig<any> = {
  name: "purchaseSearchDetailList",
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
      label: "供应商",
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
      prop: "qty",
      label: "进货数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "unit",
      label: "单位",
      width: CELL_WIDTH.unit
    },
    {
      prop: "stockinQty",
      label: "已入库数量",
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
      prop: "purchasePrice",
      label: "进货单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "purchaseAmount",
      label: "进货总额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPrice",
      label: "未税进货单价",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAmount",
      label: "未税进货总额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxRate",
      label: "税率",
      width: CELL_WIDTH.taxRate,
      type: "percent",
      isHide: true
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
      prop: "freight",
      label: "运费",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "warehouseName",
      label: "所属仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "positionName",
      label: "所属货位",
      width: CELL_WIDTH.positionName
    },
    {
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.no
    },
    {
      prop: "detailRemark",
      label: "明细备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "billRemark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "sourceBillNo",
      label: "原进货单号",
      width: CELL_WIDTH.no,
      isHide: true
    },
    {
      prop: "orderBillNo",
      label: "采购订单号",
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
      prop: "createdAt",
      label: "创建时间",
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
      prop: "financialAuditAt",
      label: "财务审核日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "stockinDate",
      label: "入库日期",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    ...OTHER_PIRCE_LIST
  ]
};
