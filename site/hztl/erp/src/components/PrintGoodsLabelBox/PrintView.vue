<script>
import CustomQrcode from "@/components/CustomQrcode";
import { formateArea } from "@/utils/formateAddress";

export default {
  name: "PrintView",
  components: { CustomQrcode },
  props: {
    value: {
      type: Object,
      required: true
    },
    bill: {
      type: Object,
      required: true
    },
    showQrCode: Boolean
  },
  data() {
    return {
      defaultLogo: require("@/assets/images/img-send-packeges.png")
    };
  },
  computed: {
    formattedReceiverPhone() {
      return this.value.receiverPhone ? `（${this.value.receiverPhone}）` : "";
    },
    formattedReceiverAddress() {
      return `${formateArea(this.value.receiverAreaNames).replace(
        /\//g || "",
        ""
      )} ${this.value.receiverAddress || ""}`;
    },
    formattedSenderPhone() {
      return this.value.senderPhone ? `（${this.value.senderPhone}）` : "";
    },
    formattedSenderAddress() {
      return `${formateArea(this.value.senderAreaNames).replace(/\//g, "") ||
        ""} ${this.value.senderAddress || ""}`;
    }
  },
  methods: {
    formateAddress(areaNames, address) {
      return `${formateArea(areaNames)} ${address}`;
    }
  },
  render() {
    return (
      <div class="print-view-item">
        <div class="header">
          <div class="my-company">
            <img src={this.defaultLogo} height="50" width="50" />
            <div
              class="my-company-name ellipsis-text"
              title={`${this.value.senderName}发货单`}
            >
              {this.value.senderName}发货单
            </div>
          </div>
        </div>

        <div class="body">
          <div class="block compnay-container">
            <div class="block-title">收 件 人</div>
            <div class="block-content compnay-info">
              <div class="item ooperator">
                <div
                  class="item-bold cooperator-name ellipsis-text"
                  title={this.value.cooperatorName}
                >
                  {this.value.cooperatorName}
                </div>
                <div
                  class="cooperator-receiver ellipsis-text"
                  title={`${this.value.receiverName}${this.formattedReceiverPhone}`}
                >
                  <span class="item-bold">{this.value.receiverName}</span>
                  {this.formattedReceiverPhone}
                </div>
              </div>
              <div class="item address" title={this.formattedReceiverAddress}>
                收货地址：{this.formattedReceiverAddress}
              </div>
            </div>
          </div>

          <div class="block compnay-container">
            <div class="block-title">寄 件 人</div>
            <div class="block-content compnay-info">
              <div
                class="item ellipsis-text"
                title={`${this.value.senderName}${this.formattedSenderPhone}`}
              >
                <span class="item-bold">{this.value.senderName}</span>
                {this.formattedSenderPhone}
              </div>
              <div class="item address" title={this.formattedSenderAddress}>
                发货地址：{this.formattedSenderAddress}
              </div>
            </div>
          </div>

          <div class="block goods-container">
            <div class="block-title">发 货 商 品</div>
            <div class="block-content goods-info">
              <div class="item">
                <div class="item-bold item-title">商品名称：</div>
                <div class="item-content ellipsis-text" title={this.value.name}>
                  {this.value.name}
                </div>
              </div>
              <div class="item">
                <div class="item-bold item-title">合计数量：</div>
                <div class="item-content ellipsis-text" title={this.value.qty}>
                  {this.value.qty}
                </div>
              </div>
              <div class="item">
                <div class="item-bold item-title">发货件数：</div>
                <div class="item-content ellipsis-text" title={this.value.nums}>
                  {this.value.nums}
                </div>
              </div>
              <div class="item">
                <div class="item-bold item-title">合计金额：</div>
                <div
                  class="item-content ellipsis-text"
                  title={this.value.billAmount}
                >
                  ¥ {this.value.billAmount}
                </div>
              </div>
            </div>
          </div>

          <div class="block remark-container">
            <div class="block-title">备 注</div>
            <div class="block-content remark">{this.value.remark}</div>
          </div>

          <div class="block text-container">{this.value.customText}</div>
        </div>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.print-view-item {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 5px;
  width: 100mm;
  height: 100mm;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 2mm;

  &:last-child {
    margin-bottom: 2mm;
  }

  .header {
    flex: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .my-company {
      flex: 1;
      max-width: calc(100% - 50px);
      display: flex;
      align-items: center;

      .my-company-name {
        margin-left: 5px;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 5px;

    .block {
      display: flex;
      align-items: center;
      border: 1px solid #606266;
      border-bottom: none;

      &:last-child {
        border-bottom: 1px solid #606266;
      }

      .block-title,
      .block-content {
        align-self: stretch;
      }

      .block-title {
        flex: none;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        writing-mode: vertical-lr;
        border-right: inherit;
        font-weight: 600;
        font-size: 14px;
      }

      .block-content {
        flex: 1;
        max-width: calc(100% - 30px);
        display: flex;
        padding: 0 10px;
        font-size: 12px;

        .item-bold {
          font-weight: 600;
        }

        .address {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .compnay-info {
        flex-direction: column;
        justify-content: center;

        .item {
          width: 100%;
          line-height: 200%;
        }

        .ooperator {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .cooperator-name {
            flex: 1;
            margin-right: 10px;
          }

          .cooperator-receiver {
            flex: none;
          }
        }
      }

      .goods-info {
        flex-wrap: wrap;
        align-content: center;

        .item {
          display: flex;
          align-items: center;
          width: 50%;
          line-height: 200%;

          .item-title {
            flex: none;
          }

          .item-content {
            flex: 1;
            margin-right: 5px;
          }
        }
      }

      .remark {
        align-items: center;
      }
    }

    .compnay-container,
    .goods-container {
      flex: 2;
    }

    .remark-container,
    .text-container {
      flex: 1;
    }

    .text-container {
      justify-content: center;
      padding: 5px 2px;
      width: calc(100mm - 10px);
      word-break: break-all;
      overflow: hidden;
      font-size: 12px;
    }
  }
}
</style>
