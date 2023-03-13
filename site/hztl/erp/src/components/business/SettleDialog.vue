<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsx from "vue-tsx-support";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { BillSettleParams, billSettle } from "@/api/finance/billSettle";
import Settle from "./Settle.vue";
import { SettleProps, SettlData } from "./interface";
import hotkeys from "hotkeys-js";

interface Props extends SettleProps {
  visible: boolean;
}

let lastKeyScope: string | symbol;
const topHotkeys = new TopHotkeys();
@Component({
  components: {
    Settle
  }
})
export default class SettleDialog extends tsx.Component<Props> {
  public $refs!: {
    settle: Settle;
  };
  @Prop() visible!: boolean;
  @Prop() readonly settlData?: SettlData;

  @Watch("visible")
  onVisibleChange(newVal: boolean) {
    if (newVal) {
      lastKeyScope = hotkeys.getScope();
      topHotkeys.bindHotkeys(this.$el as HTMLElement);
    } else {
      topHotkeys.unbindHotkeys(this.$el as HTMLElement);
      hotkeys.setScope(lastKeyScope);
    }
  }
  private loading = false;
  private reset = false;
  private get settleRef() {
    return this.$refs.settle;
  }

  private close() {
    this.$emit("update:visible", false);
    this.$emit("visibleChange", false);
  }

  private async submit(isSubmit: boolean) {
    if (isSubmit) {
      const formData = await this.settleRef.getValidateParams();
      if (formData) {
        this.loading = true;
        const isNowPay =
          formData.enhancedSettlementType.substring(0, 2) === "现付";
        const lists: any = [];
        formData.fundAccounts.forEach((item: any) => {
          lists.push({
            fundAccountId: item.id,
            amount: Number(item.amount)
          });
        });
        const params: BillSettleParams = {
          billType: formData.billType,
          billId: formData.id,
          discountAmount: Number(formData.discountAmount),
          prepayedAmount: formData.isUsePrepayedAmount
            ? Number(formData.prepayedAmount)
            : undefined,
          transPrepayedAmount: formData.isUseTransPrepayedAmount
            ? Number(formData.transPrepayedAmount)
            : undefined,
          enhancedSettlementType: formData.enhancedSettlementType,
          confirmDate: formData.confirmDate!,
          paymentBy: formData.paymentBy,
          remark: formData.remark,
          billNo: this.settlData?.billNo,
          invoiceType: this.settlData?.invoiceType,
          isUnsettle: this.settlData?.isUnsettle,
          details: isNowPay ? lists : undefined
        };
        // [
        //   {
        //     fundAccountId: formData.fundAccountId!,
        //     amount: Number(formData.settledAmount)
        //   }
        // ]
        billSettle({
          billSettles: [params]
        })
          .then(() => {
            this.$message.success("结算成功！");
            this.$emit("settleSuccess", true);
            this.close();
          })
          .catch(err => {
            // 单据不可结算（关闭结算页面）
            if (err.code == "bill-status-err") {
              this.close();
            }
            // 冲销金额超过可用余额，不可冲销（重新刷新预收余额，重新设置预收款结算金额，联动刷新其他金额）
            if (err.code == "prev-fund-not-enough-err") {
              this.reset = true;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    } else {
      this.close();
    }
  }

  render() {
    const useListeners = {
      ...this.$listeners,
      settleSolve: (value: boolean) => this.submit(value)
    };
    const useAttrs = {
      ...this.$attrs,
      settlData: this.settlData,
      loading: this.loading,
      reset: this.reset
    };
    return (
      <ht-dialog
        visible={this.visible}
        title="结算"
        class="dialog-body ignore-top-hotkeys"
        width="860px"
        append-to-body
        on-close={this.close}
      >
        <settle ref="settle" on={useListeners} attrs={useAttrs} />
      </ht-dialog>
    );
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  ::v-deep .el-dialog__body {
    padding: 5px !important;
    background-color: #e7ebed !important;
  }
}
</style>
