<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { STOCKIN_RETURN_PART_TABLE } from "./constants";
import { SearchPartData } from "../constants";
import { fetchReturnablePartList } from "../services";
import { SearchPartItem } from "../../constants";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component
export default class PartTable extends Mixins(PaginationDataMixin) {
  @Prop() readonly outLoading!: boolean;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly searchData!: SearchPartData;

  protected tableData: SearchPartItem[] = [];
  protected selections: SearchPartItem[] = [];

  private tableName = STOCKIN_RETURN_PART_TABLE.name;
  private sort = "";
  public loadData() {
    return fetchReturnablePartList({
      ...this.searchFormData,
      page: this.page,
      sort: this.sort,
      pageSize: this.pageSize
    });
  }

  private searchFormData!: SearchPartData;
  @Watch("searchData", { deep: true })
  onSearchDataChange(val: SearchPartData) {
    this.searchFormData = val;
    this.pageChange(1);
  }

  @Watch("loading")
  onLoadingChange(loading: boolean) {
    this.$emit("loadingChange", loading);
  }

  private selectChange(data: SearchPartItem[]) {
    this.selections = data;
  }
  @Watch("selections", { deep: true })
  onSelectionsChange(data: SearchPartItem[]) {
    this.$emit("selectChange", data);
  }

  private wholeBillReturn(data: SearchPartItem) {
    this.$emit("wholeBill", data);
  }
  private allStockReturn(data: SearchPartItem) {
    this.$emit("allStock", data);
  }

  public clearData() {
    this.tableData = [];
  }

  protected get tableColumns() {
    return STOCKIN_RETURN_PART_TABLE.columns
      .filter(item => this.canEdit || item.prop !== "controls")
      .map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value: null, row: SearchPartItem) => (
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  on-click={() => this.wholeBillReturn(row)}
                >
                  整单退
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  on-click={() => this.allStockReturn(row)}
                >
                  全仓退
                </el-button>
              </div>
            )
          };
        }
        return item;
      });
  }
  private setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
  }
  private handleSortChange(column: any) {
    this.sort = setTableSort(column);
    if (this.tableData?.length && this.searchFormData) {
      this.searchFormData.sort = this.sort;
      this.pageChange(1);
    }
  }
  mounted() {
    this.setSortData();
  }
  render() {
    return (
      <ht-setting-table
        table-name={STOCKIN_RETURN_PART_TABLE.name}
        columns={this.tableColumns}
        data={this.tableData}
        loading={this.loading}
        selectedRows={this.selections}
        onSelectChange={this.selectChange}
        pagination
        current-page={this.page}
        total={this.totalSize}
        onPageChange={this.pageChange}
        onSort-change={this.handleSortChange}
      />
    );
  }
}
</script>
