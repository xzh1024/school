<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import { SearchSwapGroupParams } from "@/api/parts/swapGroup";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import { SwapGroup as SwapGroupData } from "@/api/parts/swapGroup";
import Search from "./components/Search.vue";
import SwapGroupList from "./components/SwapGroupList.vue";
import SwapGroupParts from "./components/SwapGroupParts.vue";

@Component({
  name: "PartSwapGroup"
})
export default class SwapGroup extends Mixins(HotkeyMixin) {
  $refs!: {
    swapGroup: SwapGroupList;
  };
  get swapGroupRef() {
    return this.$refs.swapGroup;
  }
  private loading = false;
  private searchParams: SearchSwapGroupParams | null = null;
  private selectedRow: SwapGroupData | null = null;
  private searchChange(data: SearchSwapGroupParams) {
    this.searchParams = { ...data };
  }
  private loadingChangeHandle(loading: boolean) {
    this.loading = loading;
  }
  private selectedChange(row: SwapGroupData) {
    this.selectedRow = row;
  }

  private detailChangeHandle() {
    this.swapGroupRef.refreshCurData();
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          <Search loading={this.loading} onChange={this.searchChange} />
        </div>
        <div class="auto-block flex-container detail-container">
          <div class="flex-block-bg flex-block-margin group-block flex-container column-flex">
            <div class="ht-page-title page-title-divider title-padding">
              互换组
            </div>
            <SwapGroupList
              ref="swapGroup"
              class="auto-block"
              selectedRow={this.selectedRow}
              params={this.searchParams!}
              loading={this.loading}
              onLoadingChange={this.loadingChangeHandle}
              onSelectedChange={this.selectedChange}
            />
          </div>
          <div class="auto-block flex-block-bg flex-block-margin flex-container column-flex">
            <div class="ht-page-title page-title-divider title-padding">
              互换组配件明细
              <span class="title-small-tip">
                （<i class="title-tip-icon"></i>自定义互换配件编码以黄色标注）
              </span>
            </div>
            <SwapGroupParts
              class="auto-block"
              group={this.selectedRow}
              disabled={this.loading}
              onDataChanged={this.detailChangeHandle}
            />
          </div>
        </div>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.detail-container {
  .flex-block-margin {
    margin-top: 0;
  }
  .group-block {
    width: 550px;
  }
  ::v-deep .btn-group {
    margin: 5px;
  }
}
</style>
