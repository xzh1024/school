export const transferOut = [
  {
    name: "调出分公司名称",
    width: 2,
    file: "companyName"
  },
  {
    name: "调入分公司名称",
    width: 2,
    file: ["relatedBill", "companyName"]
  },
  {
    name: "支付方式",
    file: "paymentType"
  },
  {
    name: "单号",
    width: 2,
    file: "billNo"
  },
  {
    name: "合计数量",
    file: "qty"
  },
  {
    name: "合计金额",
    file: "amount"
  },
  {
    name: "业务日期",
    width: 2,
    file: "billDate"
  },
  {
    name: "业务员",
    file: "businessManName"
  },
  {
    name: "备注",
    width: 4,
    sampleData: "单据备注",
    file: "remark"
  },
  {
    name: "收货人",
    file: ["logistics", "receiverName"]
  },
  {
    name: "收货地址",
    file: ["logistics", "receiverAddress"]
  },
  {
    name: "收货电话",
    file: ["logistics", "receiverPhone"]
  },
  {
    name: "提货方式",
    file: ["logistics", "pickMethod"]
  },
  {
    name: "运输方式",
    file: ["logistics", "transportMethod"]
  },
  {
    name: "包装方式",
    file: ["logistics", "packMethod"]
  },
  {
    name: "运费付款方",
    file: ["logistics", "freight"]
  },
  {
    name: "物流公司",
    file: ["logistics", "logisticsCompanyName"]
  },
  {
    name: "制单人",
    file: "createdByName"
  },
  {
    name: "财务",
    file: "financialByName"
  }
];
