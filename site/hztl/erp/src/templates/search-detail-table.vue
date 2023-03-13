<script lang="tsx">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Mixins, Watch } from "vue-property-decorator";
import { TableColumn } from "@/constants/interface";
import ResizeBox from "@/components/resizeBox";
import SearchTable from "./search-table.vue";
import { setTableSort } from "@/utils/tool";
@Component
export default class SearchDetailTable extends Mixins(SearchTable) {
  // abstract 避免验证错误，处理为空
  protected get exportDetailName() {
    return "默认导出";
  }
  protected detailExportHandle(params: any) {
    params;
    //
  }
  protected detailTableRowOperation(row: any) {
    row;
    //
  }
  protected loadDetailTable() {}

  protected detailTotalInfo: any = {};
  protected detailLoading = false;
  protected detailTableName = "";
  protected detailColumns: TableColumn<any>[] = [];
  protected detailTableData: any[] = [];
  protected detailTotalSize = 0;
  protected detailPage = 1;

  protected detailExportVisible = false;

  protected syncDetailExportVisible(value: boolean) {
    this.detailExportVisible = value;
  }

  protected showDetailExportDilog(e: MouseEvent) {
    e.stopPropagation();
    this.detailExportVisible = true;
  }

  @Watch("curSelected", { immediate: true })
  onCurSelected(newVal: any) {
    if (newVal) {
      this.loadDetailTable();
    } else {
      this.detailTableData = [];
      this.detailTotalSize = 0;
    }
  }
  protected detailSort = "";
  private handleDetailSortChange(column: any) {
    this.detailPage = 1;
    this.detailSort = setTableSort(column);
    if (this.detailTableData?.length) {
      this.loadDetailTable();
    }
  }
  protected detailPageChange(page: number) {
    this.detailPage = page;
    this.loadDetailTable();
  }

  protected renderDetailTable() {
    return (
      <ht-setting-table
        v-loading={this.loading || this.detailLoading}
        pagination
        data={this.detailTableData}
        columns={this.detailColumns}
        table-name={this.detailTableName}
        file-name={this.exportDetailName}
        export-table-visible={this.detailExportVisible}
        end-export-func={this.detailExportHandle}
        total={this.detailTotalSize}
        current-page={this.detailPage}
        on-pageChange={this.detailPageChange}
        onSort-change={this.handleDetailSortChange}
        on={{
          "update:exportTableVisible": this.syncDetailExportVisible
        }}
        on-rowOperation={this.detailTableRowOperation}
        show-summary
        summary-method={(param: any) =>
          this.getSummaries(param, this.detailTotalInfo)
        }
        scopedSlots={{
          pagination: () => (
            <el-button
              type="primary"
              size="mini"
              disabled={
                !this.detailTableData.length ||
                !this.hasBelongsPerm("export", this.detailTableData[0].belongs)
              }
              on-click={this.showDetailExportDilog}
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
          <ResizeBox
            default-len={320}
            is-column
            direction-contrary
            scopedSlots={{
              block1: () => this.renderTable(),
              block2: () => this.renderDetailTable()
            }}
          />
        </div>
      </div>
    );
  }
}
</script>
