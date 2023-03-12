<script lang="tsx">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import { TableColumn } from "@/constants/interface";

@Component
export default class SearchTable extends Vue {
  // abstract 避免验证错误，处理为空
  protected get exportName() {
    return "默认导出";
  }
  protected exportHandle(params: any[]) {
    params;
    //
  }

  protected tableRowOperation(row: any) {
    row;
    //
  }

  protected loadData() {}
  protected renderSearch() {
    return <div></div>;
  }

  protected get pageSize() {
    return (this.$store && this.$store.state.admin.table.pageSize) || 20;
  }

  protected totalInfo: any = {};
  protected searchParams: any = {};
  protected get selectedRows() {
    return this.curSelected ? [this.curSelected] : [];
  }
  protected loading = false;
  protected page = 1;
  protected totalSize = 0;
  protected tableName = "";
  protected columns: TableColumn<any>[] = [];
  protected tableData: any[] = [];
  protected curSelected: any = null;

  protected exportVisible = false;

  protected syncExportVisible(value: boolean) {
    this.exportVisible = value;
  }

  protected showExportDilog(e: MouseEvent) {
    e.stopPropagation();
    this.exportVisible = true;
  }

  protected onSelectChange(selectedRows: any[]) {
    this.curSelected = selectedRows[0] || null;
  }

  protected pageChange(page: number) {
    this.page = page;
    this.loadData();
  }

  protected searchChange(params: any) {
    this.searchParams = params;
    this.pageChange(1);
  }

  protected getSummaries(param: { columns: any[]; data: any[] }, info: any) {
    const { columns } = param;
    const sums: Array<string | number> = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "总计";
        return;
      }
      if (column.level === 2) {
        const arr = column.property.split(".", 2);
        if (Array.isArray(arr) && arr.length === 2) {
          const parentKey = arr[0];
          const key = arr[1];
          if (
            info[parentKey] &&
            ![null, undefined, ""].includes(info[parentKey][key])
          ) {
            sums[index] = info[parentKey][key];
          }
        }
      } else {
        if (info[column.property]) {
          sums[index] = info[column.property];
        }
      }
    });

    return sums;
  }

  protected renderTable() {
    return (
      <ht-setting-table
        v-loading={this.loading}
        pagination
        data={this.tableData}
        columns={this.columns}
        table-name={this.tableName}
        export-table-visible={this.exportVisible}
        file-name={this.exportName}
        end-export-func={this.exportHandle}
        selected-rows={this.selectedRows}
        on-selectChange={this.onSelectChange}
        total={this.totalSize}
        current-page={this.page}
        on-pageChange={this.pageChange}
        on-rowOperation={this.tableRowOperation}
        show-summary
        summary-method={(param: any) => {
          return this.getSummaries(param, this.totalInfo);
        }}
        on={{
          "update:exportTableVisible": this.syncExportVisible
        }}
        scopedSlots={{
          pagination: () => (
            <el-button
              type="primary"
              size="mini"
              disabled={!this.tableData.length || !this.tableData[0].belongs}
              on-click={this.showExportDilog}
            >
              导出
            </el-button>
          )
        }}
      />
    );
  }

  protected renderContent() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          {this.renderSearch && this.renderSearch()}
        </div>
        <div class="auto-block flex-block-bg flex-block-margin">
          {this.renderTable()}
        </div>
      </div>
    );
  }
}
</script>
