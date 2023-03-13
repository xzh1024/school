<script lang="tsx">
import { Component, Mixins, Prop } from "vue-property-decorator";
import { TransferBillPartItem } from "@/views/transfer/interface";
import Summaries from "@/mixins/summaries";
import {
  STOCKOUT_RETURN_DETAL_TABLE,
  STOCKOUT_RETURN_DETAL_TOTAL_FILES
} from "./constants";

@Component
export default class DetailTable extends Mixins(Summaries) {
  @Prop() readonly loading!: boolean;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly tableData!: TransferBillPartItem[];
  @Prop() readonly selectedRows!: TransferBillPartItem[];

  private get tableColumns() {
    return STOCKOUT_RETURN_DETAL_TABLE.columns
      .filter(item => this.canEdit || item.prop !== "controls")
      .map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value: null, row: TransferBillPartItem) => (
              <div>
                <el-tooltip placement="top" content="编辑" enterable={false}>
                  <i
                    class="icon operation-icon icon-edit-info"
                    on-click={() => this.editPartHandle(row)}
                  />
                </el-tooltip>
              </div>
            )
          };
        }
        return item;
      });
  }

  private selectChange(data: TransferBillPartItem[]) {
    this.$emit("selectChange", data);
  }
  private editPartHandle(row: TransferBillPartItem) {
    if (!this.canEdit) {
      this.$message.warning({ message: "当前状态不可编辑", showClose: true });
      return;
    }
    this.$emit("edit", row);
  }
  private sortChange(column: any) {
    this.$emit("sortChange", column);
  }
  render() {
    return (
      <ht-setting-table
        table-name={STOCKOUT_RETURN_DETAL_TABLE.name}
        columns={this.tableColumns}
        data={this.tableData}
        loading={this.loading}
        selectedRows={this.selectedRows}
        onSelectChange={this.selectChange}
        onRowOperation={this.editPartHandle}
        onSort-change={this.sortChange}
        show-summary
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        summary-method={(params: any) =>
          this.getSummariesByCalculate(
            params,
            STOCKOUT_RETURN_DETAL_TOTAL_FILES
          )
        }
      />
    );
  }
}
</script>
