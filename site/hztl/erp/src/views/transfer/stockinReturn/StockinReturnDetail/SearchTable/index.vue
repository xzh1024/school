<script lang="tsx">
import { Component, Mixins, Prop } from "vue-property-decorator";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { Company, TransferBillPartItem } from "@/views/transfer/interface";
import PartTable from "./PartTable/index.vue";
import StockTable from "./StockTable/index.vue";
import SearchPartsDialog from "./SearchPartsDialog.vue";
import { SearchPartData } from "./constants";
import { SearchPartItem, SearchStockItem } from "../constants";
import StockinReturnOperationMixin from "../../mixins/StockinReturnOperationMixin";

@Component({
  components: {
    PartTable,
    StockTable,
    SearchPartsDialog
  }
})
export default class SearchTable extends Mixins(
  StockinReturnOperationMixin,
  PaginationDataMixin
) {
  public $refs!: {
    partTable: PartTable;
  };

  @Prop() readonly relatedCompany!: Company;
  @Prop() readonly companyId!: number;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly detailSelections!: TransferBillPartItem[];

  protected loading = false;

  protected selections: SearchPartItem[] = [];
  private selectChange(data: SearchPartItem[]) {
    this.selections = data;
    this.$emit("partSelectChange", this.selections);
  }

  private searchData!: SearchPartData;
  private searchChange(data: SearchPartData) {
    this.searchData = data;
    this.closeSearch();
  }
  private searchVisible = false;
  private showSearch() {
    this.searchVisible = true;
  }
  private closeSearch() {
    this.searchVisible = false;
  }

  private backMainList() {
    this.$emit("back");
  }
  private createHandle() {
    this.$emit("create");
  }

  private wholeBillReturn(data: SearchPartItem) {
    this.$emit("wholeBill", data);
  }
  private allStockReturn(data: SearchPartItem) {
    this.$emit("allStock", data);
  }
  private batchAddPart(data: SearchStockItem[]) {
    this.$emit("batchAdd", data, this.selections[0]);
  }
  private addPart(data: SearchStockItem) {
    this.$emit("add", data, this.selections[0]);
  }

  public clearData() {
    this.$refs.partTable.clearData();
    this.selections = [];
  }

  public reloadData() {
    if (this.selections.length) {
      this.$refs.partTable.refreshData();
    }
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btn-group">
          <div class="flex-container">
            <div>
              <el-button
                type="primary"
                size="mini"
                disabled={this.createDisabled}
                loading={this.loading}
                onClick={this.createHandle}
              >
                开单（F2）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                loading={this.loading}
                onClick={this.showSearch}
              >
                查询（Ins）
              </el-button>
              {this.$slots.button}
            </div>
            <div>
              <el-link underline={false} onClick={this.backMainList}>
                返回列表
                <span class="el-icon-arrow-right" />
              </el-link>
            </div>
          </div>
        </div>

        <ht-resize-columns
          class="auto-block flex-block-margin"
          directionContrary
          defaultLen={500}
          scopedSlots={{
            block1: () => (
              <part-table
                ref="partTable"
                canEdit={this.canEdit}
                searchData={this.searchData}
                outLoading={this.loading}
                onLoadingChange={(val: boolean) => (this.loading = val)}
                onSelectChange={this.selectChange}
                onWholeBill={this.wholeBillReturn}
                onAllStock={this.allStockReturn}
              />
            ),
            block2: () => (
              <stock-table
                canEdit={this.canEdit}
                searchData={this.selections}
                outLoading={this.loading}
                onBatchAdd={this.batchAddPart}
                onAdd={this.addPart}
              />
            )
          }}
        />

        <search-parts-dialog
          visible={this.searchVisible}
          relatedCompany={this.relatedCompany}
          relatedCompanies={this.relatedCompanies}
          onClose={this.closeSearch}
          onSearchChange={this.searchChange}
          companyId={this.companyId}
        />
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
.btn-group {
  margin-top: 5px;
}
</style>
