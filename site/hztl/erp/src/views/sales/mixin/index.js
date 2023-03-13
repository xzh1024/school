export const commonValidator = {
  data() {
    return {
      rules: {
        billDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        cooperatorId: [
          {
            required: true,
            message: "请选择客户名称",
            trigger: "change"
          }
        ],
        enhancedSettlementType: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change"
          }
        ],
        invoiceType: [
          {
            required: true,
            message: "请选择发票类型",
            trigger: "change"
          }
        ]
      }
    };
  }
};
