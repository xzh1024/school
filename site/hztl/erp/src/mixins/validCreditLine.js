export default {
  methods: {
    validCreditLine(data) {
      //验证客户信用额度
      return new Promise(resolve => {
        if (data.overCreditLine) {
          if (data.creditCanContinue) {
            this.$confirm(
              "<div>当前客户未结款已超过信用额度，是否继续？</div>" +
                "<div>信用额度：" +
                data.creditLine +
                "</div>" +
                "<div>未结款金额：" +
                data.unsettledAmount +
                "</div>" +
                "<div>当前单据金额：" +
                data.currentAmount +
                "</div>",
              "信用额度超出提示",
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: "继续",
                cancelButtonText: "取消"
              }
            )
              .then(() => {
                const skipCreditLine = true;
                resolve(skipCreditLine);
              })
              .catch(() => {});
          } else {
            this.$confirm(
              "<div>当前客户未结款已超过信用额度, 不能挂账！</div>" +
                "<div>信用额度：" +
                data.creditLine +
                "</div>" +
                "<div>未结款金额：" +
                data.unsettledAmount +
                "</div>" +
                "<div>当前单据金额：" +
                data.currentAmount +
                "</div>" +
                "<div>若要继续开单，请修改客户信用额度或在财务参数中修改“超过信用额度能否继续挂账交易”为可交易。</div>",
              "信用额度超出提示",
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: "确定",
                showCancelButton: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                showClose: false
              }
            )
              .then(() => {
                resolve();
              })
              .catch(() => {});
          }
        } else if (data.overCreditAlarm) {
          this.$confirm(
            "<div>当前客户未结款已经达到信用额度「 " +
              data.creditAlarmPercent +
              "%」预警。</div>" +
              "<div>信用额度：" +
              data.creditLine +
              "</div>" +
              "<div>未结款金额：" +
              data.unsettledAmount +
              "</div>" +
              "<div>当前单据金额：" +
              data.currentAmount +
              "</div>",
            "信用额度预警提示",
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "确定",
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              showClose: false
            }
          )
            .then(() => {
              const skipCreditLine = true;
              resolve(skipCreditLine);
            })
            .catch(() => {});
        }
      });
    }
  }
};
