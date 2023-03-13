import { BasePartSeacrch } from "@/constants/part";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import SearchMixin from "@/mixins/searchMixin";
import { Component, Prop, Watch, Mixins } from "vue-property-decorator";
import { SearchPartItem, SupplierSelectItem } from "../interface";
import { addPartToSupplier, searchPart } from "../services";
import { SYPPLIER_PART_SEARCH_PART } from "./constants";
import SearchFrom from "./SearchFrom";
import SelectSupplier from "./SelectSupplier.vue";

@Component({
  components: {
    SearchFrom,
    SelectSupplier
  }
})
export default class SearchPartsBox extends Mixins(
  SearchMixin,
  PaginationDataMixin
) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly defaultSelects!: SupplierSelectItem[];

  protected tableData: SearchPartItem[] = [];
  protected selections: SearchPartItem[] = [];
  private selectChangeHandler(selections: SearchPartItem[]) {
    this.selections = selections;
  }
  private searchParams: BasePartSeacrch | null = null;
  private searchChange(params: BasePartSeacrch) {
    this.searchParams = params;
    this.pageChange(1);
  }

  @Watch("visible")
  onVisibleChange() {
    if (this.visible) {
      this.selectSuppliers = [...this.defaultSelects];
      this.pageChange(1);
    }
  }

  protected loadData() {
    this.loading = true;
    return searchPart({
      ...this.searchParams,
      page: this.page,
      pageSize: this.pageSize
    }).finally(() => {
      this.loading = false;
    });
  }

  private addPartToSupplier() {
    if (this.selectSuppliers.length === 0) {
      this.$message.warning("请先选择需要添加的供应商！");
    } else if (this.selections.length === 0) {
      this.$message.warning("请先选择需要添加的配件！");
    } else {
      this.loading = true;
      addPartToSupplier(
        this.selectSuppliers.map(item => item.id),
        this.selections.map(item => item.partId)
      )
        .then(() => {
          const msg =
            this.selectSuppliers.length === 1
              ? `已为${this.selectSuppliers[0].name}供应商成功添加${this.selections.length}个配件`
              : `已为${this.selectSuppliers.length}家供应商成功添加${this.selections.length}个配件`;
          this.$message.success(msg);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  private selectSuppliers: SupplierSelectItem[] = [];

  private closeDialog() {
    this.$emit("close");
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="供应商配件添加"
        top="7vh"
        width="1000px"
      >
        <div style={{ height: "70vh" }} class="flex-container column-flex">
          <select-supplier
            v-model={this.selectSuppliers}
            class="flex-block-bg flex-block-padding flex-block-margin"
          />
          <search-from
            loading={this.loading}
            onSearchChange={this.searchChange}
            class="flex-block-bg flex-block-padding flex-block-margin"
          />

          <ht-setting-table
            class="auto-block flex-block-margin"
            table-name={SYPPLIER_PART_SEARCH_PART.name}
            columns={SYPPLIER_PART_SEARCH_PART.columns}
            pagination
            autofocus
            selectionType="multiple"
            current-page={this.page}
            total={this.totalSize}
            data={this.tableData}
            loading={this.loading}
            selectedRows={this.selections}
            onSelectChange={this.selectChangeHandler}
            onPageChange={this.pageChange}
          />

          <div class="dialog-footer-align mt-1">
            <el-button
              type="primary"
              size="mini"
              plain
              on-click={() => this.addPartToSupplier()}
              loading={this.loading}
            >
              添加选择配件（F3）
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              on-click={this.closeDialog}
            >
              取消（Esc）
            </el-button>
          </div>
        </div>
      </ht-dialog>
    );
  }
}
