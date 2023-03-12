<script lang="tsx">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { STOCKIN_RETURN_STOCK_TABLE } from "./constants";
import { fetchReturnableStockList } from "../services";
import { SearchPartItem, SearchStockItem } from "../../constants";
import { SearchStockData } from "../constants";

@Component
export default class StockTable extends Vue {
  @Prop() readonly outLoading!: boolean;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly searchData!: SearchPartItem[];

  private loading = false;
  private tableData: SearchStockItem[] = [];
  private selections: SearchStockItem[] = [];
  @Watch("tableData", { deep: true })
  onTableDataChange() {
    let selectedRow = null;
    if (this.selections.length) {
      selectedRow = this.tableData.find(
        item => item.id === this.selections[0].id
      );
    }
    this.selections = selectedRow
      ? [selectedRow]
      : this.tableData.length
      ? [this.tableData[0]]
      : [];
  }

  private searchFormData!: SearchStockData;
  @Watch("searchData", { deep: true })
  onSearchDataChange(val: SearchPartItem[]) {
    if (val.length) {
      this.searchFormData = { detailId: val[0].id };
      this.loadData();
    } else {
      this.tableData = [];
    }
  }

  public loadData() {
    this.loading = true;
    return fetchReturnableStockList(this.searchFormData)
      .then(res => {
        this.tableData = res.rows || [];
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private selectChange(data: SearchStockItem[]) {
    this.selections = data;
  }
  private addPart(data: SearchStockItem) {
    if (!this.canEdit) {
      this.$message.warning({ message: "当前状态不可编辑", showClose: true });
      return;
    }
    this.$emit("add", data);
  }
  private batchAddPart() {
    this.$emit("batchAdd", this.selections);
  }

  private get tableColumns() {
    return STOCKIN_RETURN_STOCK_TABLE.columns
      .filter(item => this.canEdit || item.prop !== "controls")
      .map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value: null, row: SearchStockItem) => (
              <div>
                <el-tooltip placement="top" content="添加" enterable={false}>
                  <i
                    class="icon operation-icon icon-add-info"
                    on-click={() => this.addPart(row)}
                  />
                </el-tooltip>
              </div>
            )
          };
        }
        return item;
      });
  }

  render() {
    return (
      <div class="flex-block-bg" style="height: 100%;">
        <ht-setting-table
          table-name={STOCKIN_RETURN_STOCK_TABLE.name}
          columns={this.tableColumns}
          data={this.tableData}
          loading={this.outLoading || this.loading}
          selectedRows={this.selections}
          onSelectChange={this.selectChange}
          onRowOperation={this.addPart}
          style="height: calc(100% - 35px);"
        />
        <div style="padding: 2px 0 2px 5px;">
          <el-button
            loading={this.outLoading || this.loading}
            disabled={!this.canEdit || !this.selections.length}
            type="primary"
            size="mini"
            on-click={this.batchAddPart}
          >
            批量添加
          </el-button>
        </div>
      </div>
    );
  }
}
</script>
