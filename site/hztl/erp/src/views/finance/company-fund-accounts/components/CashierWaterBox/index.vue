<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { loadManulList } from "@/api/finance/manual";
import { ManulData } from "@/constants/finance/manul";
import { subtract } from "@/utils/numberAPI";
import SearchForm from "./SearchForm.vue";
import {
  CompanyFundAccount,
  FUND_ACCOUNTS_CASHIER_WATER_BOX_TABLE,
  SearchParams,
  TotalInfo
} from "./constants";

let oldKeyScope: string | symbol;
const topHotkeys = new TopHotkeys();
const defaultTotalInfo: TotalInfo = {
  amountIn: "0",
  amountOut: "0"
};

@Component({
  name: "CashierWaterBox",
  components: { SearchForm }
})
export default class CashierWaterBox extends Mixins(PaginationDataMixin) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly companyFundAccount!: CompanyFundAccount;

  @Watch("visible")
  private onVisibleChange(val: boolean, oldVal: boolean) {
    if (val) {
      oldKeyScope = hotkeys.getScope();
      topHotkeys.bindHotkeys(this.$el as HTMLElement);
      this.totalInfo = { ...defaultTotalInfo };
    } else if (oldVal) {
      topHotkeys.unbindHotkeys(this.$el as HTMLElement);
      hotkeys.setScope(oldKeyScope);
    }
  }

  private searchParams: SearchParams = {};
  protected totalInfo: TotalInfo = { ...defaultTotalInfo };

  protected loadData() {
    return loadManulList({
      ...this.searchParams,
      companyIds: [this.companyFundAccount.companyId || 0],
      fundAccountId: [this.companyFundAccount.fundAccountId || 0],
      page: this.page,
      pageSize: this.pageSize
    });
  }

  private searchHandle(params: SearchParams) {
    this.searchParams = { ...params };
    this.refreshData();
  }

  private changeVisible(visible: boolean) {
    this.$emit("update:visible", visible);
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on={{ "update:visible": this.changeVisible }}
        title={`${this.companyFundAccount.companyName}「${this.companyFundAccount.fundAccountName}」出纳流水查看`}
        append-to-body
        width="1200px"
        top="7vh"
        class="dialog-body ignore-top-hotkeys"
      >
        <search-form
          visible={this.visible}
          loading={this.loading}
          onSearch={this.searchHandle}
        />
        <ht-setting-table
          table-name={FUND_ACCOUNTS_CASHIER_WATER_BOX_TABLE.name}
          columns={FUND_ACCOUNTS_CASHIER_WATER_BOX_TABLE.columns}
          pagination
          current-page={this.page}
          total={this.totalSize}
          data={this.tableData}
          loading={this.loading}
          selectedRows={this.selections}
          onSelectChange={(val: ManulData[]) => (this.selections = val)}
          onPageChange={this.pageChange}
          show-summary
          summary-method={this.getSummaries}
          height="490"
          style="margin-top: 5px;"
        />
        <div class="sum-container">
          <div>
            <div>总条数</div>
            <div class="text-font-primary">{this.totalSize}</div>
          </div>
          <div>
            <div>收入总额</div>
            <div class="text-font-primary">{this.totalInfo.amountIn}</div>
          </div>
          <div>
            <div>支出总额</div>
            <div class="text-font-primary">{this.totalInfo.amountOut}</div>
          </div>
          <div>
            <div>净流入</div>
            <div class="text-font-primary">
              {subtract(this.totalInfo.amountIn, this.totalInfo.amountOut)}
            </div>
          </div>
        </div>
      </ht-dialog>
    );
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .pagination {
    height: 45px;
    line-height: 45px;
  }
}
.sum-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  margin: -45px 0 0 10px;
}
</style>
