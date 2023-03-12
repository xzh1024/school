import { CELL_WIDTH, SALES_OUT_STATUS } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_SALES_OUT_LIST: TableSettingConfig<any> = {
  name: "salesOutList",
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
      prop: "billDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "companyName",
      label: "业务公司",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "单据号",
      prop: "billNo",
      width: CELL_WIDTH.no,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "客户订单单号",
      prop: "orderNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "XD",
      information: {
        billDetailKey: "orderId"
      },
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "单据状态",
      prop: "status",
      width: CELL_WIDTH.status,
      formatter: (value: number) => {
        return SALES_OUT_STATUS[value] || "";
      },
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "客户名称",
      prop: "cooperatorName",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "销售数量",
      prop: "bookQty",
      width: CELL_WIDTH.qty,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "销售金额",
      prop: "taxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "未税销售金额",
      prop: "untaxedAmount",
      type: "number",
      formatter: value => getNoPricePermTips(value),
      width: 120,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "开单金额",
      prop: "billAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "taxAmount",
      label: "税额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "税率",
      prop: "taxRate",
      width: CELL_WIDTH.taxRate,
      type: "percent"
    },
    {
      label: "发票类型",
      prop: "invoiceType",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "支付方式",
      prop: "enhancedSettlementType",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "到货日期",
      prop: "arrivalDate",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "出库数",
      prop: "stockoutQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "出库金额",
      prop: "stockoutTaxedAmount",
      width: CELL_WIDTH.qty,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "单据来源",
      prop: "sourceType",
      width: CELL_WIDTH.companyName
    },
    {
      label: "来源单号",
      prop: "platformOrderNo",
      width: CELL_WIDTH.no
    },
    {
      label: "车牌号",
      prop: "plateNumber",
      width: CELL_WIDTH.code,
      isHide: true
    },
    {
      label: "收货人",
      prop: "receiverName",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      label: "收货电话",
      prop: "receiverPhone",
      width: CELL_WIDTH.phone,
      isHide: true
    },
    {
      label: "收货区域",
      prop: "receiverAreaNames",
      width: CELL_WIDTH.address,
      type: "area",
      isHide: true
    },
    {
      label: "收货地址",
      prop: "receiverAddress",
      width: CELL_WIDTH.address,
      isHide: true
    },
    {
      label: "包装方式",
      prop: "packMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "提货方式",
      prop: "pickMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "运输方式",
      prop: "transportMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "运费付款方",
      prop: "freightPayer",
      width: CELL_WIDTH.freightPayer,
      isHide: true
    },
    {
      label: "物流公司",
      prop: "logisticsCompanyName",
      width: CELL_WIDTH.companyName,
      isHide: true
    },
    {
      label: "业务员",
      prop: "businessManName",
      width: CELL_WIDTH.personName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "制单人",
      prop: "createdName",
      width: CELL_WIDTH.personName
    },
    {
      label: "制单时间",
      prop: "createdAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "提交人",
      prop: "submitName",
      width: CELL_WIDTH.personName
    },
    {
      label: "提交时间",
      prop: "submitAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "结算人",
      prop: "financialAuditName",
      width: CELL_WIDTH.personName
    },
    {
      label: "结算时间",
      prop: "financialAuditAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "打印次数",
      prop: "printCount",
      width: CELL_WIDTH.count
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark,
      isHide: true
    }
  ]
};
