<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import BillPanel from "@/components/bill-panel/BillPanel";
import Summaries from "@/mixins/summaries";
import {
  TransferBillItem,
  TransferBillPartItem
} from "@/views/transfer/interface";
import {
  TRANSFER_STOCKOUT_ENUM,
  TRANSFER_STOCKOUT_DETAIL_TOTAL_FILES,
  TRANSFER_STOCKOUT_DETAIL,
  transferStockoutService,
  DeaultHeader,
  defualtHeader
} from "./constants";

let lastKeyscope: symbol | string;
const topHotkeys = new TopHotkeys();

@Component({
  components: { BillPanel }
})
export default class TransferStockout extends Mixins(Summaries) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly billId!: number;

  private loading = false;
  private header: TransferBillItem | DeaultHeader = { ...defualtHeader };
  private tableData: TransferBillPartItem[] = [];

  @Watch("visible")
  onVisibleChange(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      lastKeyscope = hotkeys.getScope();
      topHotkeys.bindHotkeys(this.$el as HTMLElement);
      this.loadData();
    } else if (oldVal) {
      topHotkeys.unbindHotkeys(this.$el as HTMLElement);
      hotkeys.setScope(lastKeyscope);
    }
  }

  private loadData() {
    this.loading = true;
    return transferStockoutService
      .fetchTransferBill(this.billId)
      .then(res => {
        this.tableData = res.details || [];
        this.header = res.header;
      })
      .catch(() => {
        this.tableData = [];
        this.header = { ...defualtHeader };
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private closeDialog() {
    this.$emit("update:visible", false);
    this.$emit("close");
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        attrs={this.$attrs}
        on={{ ...this.$listeners }}
        append-to-body
        title="调拨出库单"
        width="1200px"
        top="7vh"
        class="ht-dialog-box-auto"
      >
        <div class="flex-container">
          <div class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding">
            <div class="ht-page-title page-title-divider">单据信息</div>
            <bill-panel
              v-loading={this.loading}
              billData={this.header}
              billEnum={TRANSFER_STOCKOUT_ENUM}
            />
          </div>

          <div class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex">
            <div class="ht-page-title page-title-divider">配件明细</div>
            <ht-setting-table
              loading={this.loading}
              table-name={TRANSFER_STOCKOUT_DETAIL.name}
              columns={TRANSFER_STOCKOUT_DETAIL.columns}
              data={this.tableData}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              summary-method={(params: any) =>
                this.getSummariesByCalculate(
                  params,
                  TRANSFER_STOCKOUT_DETAIL_TOTAL_FILES
                )
              }
              show-summary
              class="auto-block"
            />
            <div class="container-box">
              <div v-show={this.header?.createdByName}>
                制单人：
                <span class="text-font">{this.header?.createdByName}</span>
              </div>
            </div>
          </div>
        </div>
      </ht-dialog>
    );
  }
}
</script>
