<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import TabChangeMixin from "@/mixins/tabChangeMixin";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import { SummaryListParams } from "@/api/finance/summary";
import CollectDetail from "./collect-detail/index.vue";
import Logistics from "./tabs/logistics/index.vue";
import Company from "./tabs/company/index.vue";
import { SummaryInfo } from "./constants";

const tabs = [
  {
    id: "logistics",
    name: "按物流公司汇总"
  },
  {
    id: "company",
    name: "按往来单位汇总"
  }
];

@Component({
  name: "CollectSummary",
  components: { CollectDetail }
})
export default class CollectSummary extends Mixins(
  HotkeyMixin,
  TabChangeMixin
) {
  defaultTab = "logistics";

  private visible = false;
  private summaryInfo: SummaryInfo | null = null;
  private detailParams: SummaryListParams | null = null;

  private visibleUpdate(visible: boolean) {
    this.visible = visible;
  }

  private showCollectDetail(
    summaryInfo: SummaryInfo,
    params: SummaryListParams
  ) {
    this.visible = true;
    this.summaryInfo = summaryInfo;
    this.detailParams = params;
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <ht-tabs
          v-model={this.activeTab}
          tabs={tabs}
          on-change={this.changeTab}
          class="tabs-primary tabs-large"
          style="margin: 0"
        />
        {this.activeTab === "logistics" ? (
          <Logistics
            on-show-detail={this.showCollectDetail}
            class="auto-block"
          />
        ) : (
          <Company on-show-detail={this.showCollectDetail} class="auto-block" />
        )}
        <collect-detail
          visible={this.visible}
          on-visibleUpdate={this.visibleUpdate}
          params={this.detailParams}
          summaryInfo={this.summaryInfo}
        />
      </div>
    );
  }
}
</script>
