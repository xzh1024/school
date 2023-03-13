<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsx from "vue-tsx-support";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import {
  BatchSettleParams,
  SettleBillsParams,
  billBatchSettle
} from "@/api/finance/billSettle";
import Settle from "./Settle.vue";
import { SettleProps } from "./interface";
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
  @Prop() readonly batchData?: SettleBillsParams[];
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
        const params: BatchSettleParams = {
          enhancedSettlementType: formData.enhancedSettlementType,
          fundAccountId: Number(formData.fundAccountId),
          amount: Number(formData.settledAmount),
          discountAmount: Number(formData.discountAmount),
          paymentBy: formData.paymentBy,
          confirmDate: formData.confirmDate!,
          remark: formData.remark,
          settleBills: this.batchData || undefined
        };
        billBatchSettle(params)
          .then(() => {
            this.$message.success("结算成功！");
            this.$emit("settleSuccess", true);
            this.close();
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
      loading: this.loading
    };
    return (
      <ht-dialog
        visible={this.visible}
        title="批量结算"
        class="dialog-body ignore-top-hotkeys"
        width="680px"
        append-to-body
        on-close={this.close}
      >
        <settle ref="settle" on={useListeners} attrs={useAttrs} />
      </ht-dialog>
    );
  }
}
</script>
