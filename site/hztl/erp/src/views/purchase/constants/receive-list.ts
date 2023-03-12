import { CELL_WIDTH, PURCHASE_RECEIVE_STATUS } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_PURCHASE_RECEIVE_LIST: TableSettingConfig<any> = {
  name: "purchaseReceiveList",
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
      label: "业务日期",
      prop: "billDate",
      width: CELL_WIDTH.date,
      type: "date",
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "业务公司",
      prop: "companyName",
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
      label: "订货计划单号",
      prop: "orderBillNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "CD",
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
        return PURCHASE_RECEIVE_STATUS[value];
      },
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "供应商",
      prop: "cooperatorName",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "进货数量",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "taxedAmount",
      label: "进货金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "untaxedAmount",
      label: "未税进货金额",
      width: 120,
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
      label: "预计到货日期",
      prop: "arrivalDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "入库数",
      prop: "stockinQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "入库金额",
      prop: "stockinTaxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "运费",
      prop: "freight",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      label: "单据来源",
      prop: "sourceType",
      width: CELL_WIDTH.type
    },
    {
      label: "来源单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no
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
      prop: "createdByName",
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
      prop: "submitByName",
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
