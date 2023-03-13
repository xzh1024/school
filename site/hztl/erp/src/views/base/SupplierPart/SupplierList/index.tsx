import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import { SYPPLIER_PART_SYPPLIER_LIST } from "./constants";
import { SupplierPartFilter } from "../SearchFrom";
import { loadSupplierList } from "../services";
import { SupplierItem } from "../interface";

@Component({
  name: "supplierList",
  components: {
    PartsDetailBox,
    StorageStocksLockedDialog
  }
})
export default class SupplierList extends Mixins(PaginationDataMixin) {
  @Prop() searchParams!: SupplierPartFilter;
  protected tableKey = "cooperatorId";
  protected tableData: SupplierItem[] = [];
  protected selections: SupplierItem[] = [];

  private selectChangeHandler(data: SupplierItem[]) {
    this.selections = data;
  }

  @Watch("selections")
  onSelectionsChange() {
    this.$emit("selectChange", this.selections[0]);
  }

  @Watch("searchParams")
  onSearchChange() {
    this.pageChange(1);
  }

  protected loadData() {
    this.loading = true;
    return loadSupplierList({
      ...this.searchParams,
      page: this.page,
      pageSize: this.pageSize
    }).finally(() => {
      this.loading = false;
    });
  }

  render() {
    return (
      <ht-setting-table
        table-name={SYPPLIER_PART_SYPPLIER_LIST.name}
        columns={SYPPLIER_PART_SYPPLIER_LIST.columns}
        pagination
        autofocus
        current-page={this.page}
        total={this.totalSize}
        data={this.tableData}
        loading={this.loading}
        selectedRows={this.selections}
        onSelectChange={this.selectChangeHandler}
        onPageChange={this.pageChange}
      />
    );
  }
}
