<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import BillPanel from "@/components/bill-panel/BillPanel.vue";
import {
  Part,
  PART_DETAIL_ENUM1,
  PART_DETAIL_ENUM2,
  PART_DETAIL_ENUM3,
  PART_DETAIL_ENUM4
} from "./constants";
import transferService from "../../transferService";

interface Props {
  part: Part;
  relatedCompanyId: number;
}
const FATHER_NAME = "transferApplyDatailAudit";

@Component({
  components: { BillPanel }
})
export default class MyPartDetail extends tsc.Component<Props> {
  @Prop() readonly part!: Part;
  @Prop() readonly relatedCompanyId!: number;

  @Watch("$route.query.time", { immediate: true })
  onTimeChange() {
    if (this.$route.name === FATHER_NAME) {
      this.loadData();
    }
  }

  @Watch("part.id")
  onPartIdChange() {
    this.loadData();
  }

  private loading = false;
  private partData1 = {};
  private partData2 = {};
  private partData3 = {};
  private partData4 = {};

  public loadData() {
    if (this.relatedCompanyId && this.part?.id) {
      this.loading = true;
      transferService
        .getLatestBillDetail({
          allocOut: true,
          partId: this.part?.id,
          relatedCompanyId: this.relatedCompanyId
        })
        .then(res => {
          this.partData1 = {
            qty: res.qty,
            dynamicQty: res.dynamicQty,
            allocableQty: res.allocableQty,
            lockedQty: res.lockedQty
          };
          this.partData2 = {
            purchaseQtyInOrdering: res.purchaseQtyInOrdering,
            purchaseQtyInTransit: res.purchaseQtyInTransit,
            saleQtyInOrdering: res.saleQtyInOrdering,
            saleQtyToDeliver: res.saleQtyToDeliver
          };
          this.partData3 = {
            allocQtyInTransit: res.allocQtyInTransit,
            allocQtyInOrdering: res.allocQtyInOrdering
          };
          this.partData4 = {
            qty: res.applyIn?.qty,
            monthlySaleQty: res.applyIn?.monthlySaleQty,
            allocQtyInTransit: res.applyIn?.allocQtyInTransit,
            allocQtyInOrdering: res.applyIn?.allocQtyInOrdering
          };
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.partData1 = {};
      this.partData2 = {};
      this.partData3 = {};
      this.partData4 = {};
    }
  }

  render() {
    return (
      <div class="flex-container" v-loading={this.loading}>
        <div
          class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding"
          style="flex: 1;"
        >
          <div class="ht-page-title page-title-divider">
            本公司配件详情
            {this.part?.name
              ? ` - ${this.part?.name}（${this.part?.code}）`
              : ""}
          </div>
          <div class="flex-container">
            <bill-panel
              billData={this.partData1}
              billEnum={PART_DETAIL_ENUM1}
            />
            <bill-panel
              billData={this.partData2}
              billEnum={PART_DETAIL_ENUM2}
            />
            <bill-panel
              billData={this.partData3}
              billEnum={PART_DETAIL_ENUM3}
            />
          </div>
        </div>
        <div class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding">
          <div class="ht-page-title page-title-divider">请调公司配件详情</div>
          <bill-panel billData={this.partData4} billEnum={PART_DETAIL_ENUM4} />
        </div>
      </div>
    );
  }
}
</script>
