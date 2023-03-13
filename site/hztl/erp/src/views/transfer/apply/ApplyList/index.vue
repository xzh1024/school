<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import SearchFrom from "./SearchFrom.vue";
import { APPLY_TABLE } from "./constants";
import CancelBox from "../CancelBox.vue";
import TransferBox from "../TransferBox/index.vue";
import ApplyOperationMixin from "../mixins/ApplyOperationMixin";
import transferService from "../transferService";
import {
  TotalInfo,
  TransferBillItem,
  TransferBillPartItem
} from "../../interface";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component({
  name: "transferApplyList",
  components: {
    SearchFrom,
    CancelBox,
    TransferBox
  }
})
export default class TransferApply extends Mixins(
  HotkeyMixin,
  ApplyOperationMixin,
  PaginationDataMixin
) {
  // for PaginationDataMixin
  protected totalInfo: TotalInfo = {};
  protected tableData: TransferBillItem[] = [];
  protected selections: TransferBillItem[] = [];
  // 外部使用时用refreshData
  protected loadData() {
    this.setSortData();
    return this.transferService.fetchTransferList({
      ...this.searchFormData,
      page: this.page,
      sort: this.sort,
      pageSize: this.pageSize
    });
  }
  public sort = "";
  private tableName = APPLY_TABLE.name;
  mounted() {
    this.setSortData();
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
  // for BtnDisableMixin
  protected transferService = transferService;
  protected get curData() {
    return this.selections.length === 1 ? this.selections[0] : undefined;
  }

  private searchFormData!: FormData & { sort?: string };
  private searchChange(data: FormData) {
    this.searchFormData = data;
    this.pageChange(1);
  }

  private selectChangeHandler(data: TransferBillItem[]) {
    this.selections = data;
  }

  private createBill() {
    if (this.createDisabled) {
      return;
    }
    this.goDetail();
  }

  protected editBill(row?: TransferBillItem) {
    if (this.readDisabled) {
      return;
    }
    const curRow = row || this.curData;
    if (curRow?.allocOut) {
      this.goDetailAudit(curRow.id);
    } else {
      curRow && this.goDetail(curRow.id);
    }
  }
  private removeBillAndReload(row?: TransferBillItem) {
    this.removeBill(row).then(() => {
      this.pageChange(1);
    });
  }

  private billHeader: TransferBillItem | null = null;
  private billTable: TransferBillPartItem[] = [];
  private getBillDetails() {
    return this.transferService
      .fetchTransferBill(this.selections[0].id)
      .then(res => {
        this.billTable = res.details;
        this.billHeader = res.header;
      });
  }

  protected async cancelBillPart() {
    if (this.cancelDisabled) {
      return;
    }
    await this.getBillDetails();
    this.cancelBoxVisible = true;
  }
  protected async transOutBill() {
    if (this.transDisabled) {
      return;
    }
    await this.getBillDetails();
    this.transferBoxVisible = true;
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btn-group">
          <el-button
            type="primary"
            size="mini"
            disabled={this.createDisabled}
            onClick={this.createBill}
            loading={this.loading}
          >
            开单（F2）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={() => this.editBill()}
            disabled={!this.selections.length || this.readDisabled}
            loading={this.loading}
          >
            查改（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={this.delDisabled}
            onClick={() => this.removeBillAndReload()}
            loading={this.loading}
          >
            删除（F4）
          </el-button>
          <el-button
            type="primary"
            loading={this.loading}
            size="mini"
            disabled={this.submitDisabled}
            onClick={this.submitBill}
          >
            提交（F9）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.recallBill}
            disabled={this.recallDisabled}
          >
            撤回（F9）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.auditBill}
            disabled={this.auditDisabled}
          >
            调出方审核（F7）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.cancelBillPart}
            disabled={this.cancelDisabled}
          >
            配件取消
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.transOutBill}
            disabled={this.transDisabled}
          >
            转调拨出库单（F8）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.printHandle}
            disabled={this.printDisabled}
          >
            打印（F11）
          </el-button>
        </div>
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          <search-from
            loading={this.loading}
            onSearchChange={this.searchChange}
          />
        </div>

        <div class="auto-block flex-block-bg flex-block-margin">
          <ht-setting-table
            table-name={APPLY_TABLE.name}
            columns={APPLY_TABLE.columns}
            pagination
            autofocus
            current-page={this.page}
            total={this.totalSize}
            data={this.tableData}
            loading={this.loading}
            selectedRows={this.selections}
            onSelectChange={this.selectChangeHandler}
            onPageChange={this.pageChange}
            onRowOperation={this.editBill}
            onRowDelete={this.removeBillAndReload}
            show-summary
            summary-method={this.getSummaries}
            onSort-change={this.handleSortChange}
          />
        </div>

        <cancel-box
          visible={this.cancelBoxVisible}
          on={{
            "update:visible": (val: boolean) => (this.cancelBoxVisible = val)
          }}
          headerData={this.billHeader}
          totalData={this.billTable}
          onSuccess={() => this.refreshData()}
        />
        <transfer-box
          visible={this.transferBoxVisible}
          on={{
            "update:visible": (val: boolean) => (this.transferBoxVisible = val)
          }}
          headerData={this.billHeader}
          totalData={this.billTable}
          onSuccess={() => this.refreshData()}
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
