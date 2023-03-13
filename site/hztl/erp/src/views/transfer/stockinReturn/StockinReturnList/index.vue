<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { SettleDialog } from "@/components/business";
import SearchFrom from "./SearchFrom.vue";
import { STOCKIN_RETURN_TABLE } from "./constants";
import StockinReturnOperationMixin from "../mixins/StockinReturnOperationMixin";
import transferService from "../transferService";
import {
  TotalInfo,
  TransferBillItem,
  TransferListFilters
} from "../../interface";

@Component({
  name: "transferStockinReturnList",
  components: {
    SearchFrom,
    SettleDialog
  }
})
export default class StockoutReturnList extends Mixins(
  HotkeyMixin,
  StockinReturnOperationMixin,
  PaginationDataMixin
) {
  // for PaginationDataMixin
  protected totalInfo: TotalInfo = {};
  protected tableData: TransferBillItem[] = [];
  protected selections: TransferBillItem[] = [];

  // 外部使用时用refreshData
  protected loadData() {
    // TODO 处理过滤数据
    return this.transferService.fetchTransferList({
      ...this.searchFormData,
      page: this.page,
      pageSize: this.pageSize
    });
  }

  // for BtnDisableMixin
  protected transferService = transferService;
  protected get curData() {
    return this.selections.length === 1 ? this.selections[0] : undefined;
  }

  private searchFormData!: TransferListFilters;
  private searchChange(data: TransferListFilters) {
    this.searchFormData = data;
    this.pageChange(1);
  }

  private selectChangeHandler(data: TransferBillItem[]) {
    this.selections = data;
  }

  protected createBill() {
    if (this.createDisabled) {
      return;
    }
    this.$router.push({
      path: "./stockinReturnDetail",
      query: { time: new Date().getTime().toString() }
    });
  }
  protected readBill() {
    if (this.readDisabled) {
      return;
    }
    this.$router.push({
      path: "./stockinReturnDetail",
      query: {
        billId: this.curData!.id.toString(),
        time: new Date().getTime().toString()
      }
    });
  }
  protected removeSelecetdBill() {
    this.removeBill().then(() => {
      this.pageChange(1);
    });
  }

  private handleSettleRes(value: boolean) {
    this.settleDialogVisible = false;
    if (value) {
      this.pageChange(this.page);
    }
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btn-group">
          <el-button
            type="primary"
            size="mini"
            disabled={this.createDisabled}
            loading={this.loading}
            onClick={this.createBill}
          >
            开单（F2）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.selections.length || this.readDisabled}
            loading={this.loading}
            onClick={this.readBill}
          >
            查改（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.selections.length || this.delDisabled}
            loading={this.loading}
            onClick={() => this.removeSelecetdBill()}
          >
            删除（F4）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.selections.length || this.submitDisabled}
            loading={this.loading}
            onClick={this.submitBill}
          >
            提交（F9）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={!this.selections.length || this.recallBill}
            loading={this.loading}
            disabled={this.recallDisabled}
          >
            撤回（F9）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.selections.length || this.settleDisabled}
            loading={this.loading}
            onClick={this.settleBill}
          >
            结算即出库（F7）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.selections.length || this.printDisabled}
            loading={this.loading}
            onClick={this.printBill}
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
            table-name={STOCKIN_RETURN_TABLE.name}
            columns={STOCKIN_RETURN_TABLE.columns}
            pagination
            current-page={this.page}
            total={this.totalSize}
            data={this.tableData}
            loading={this.loading}
            selectedRows={this.selections}
            onSelectChange={this.selectChangeHandler}
            onPageChange={this.pageChange}
            onRowOperation={this.readBill}
            show-summary
            summary-method={this.getSummaries}
          />
        </div>

        <settle-dialog
          visible={this.settleDialogVisible}
          on={{
            "update:visible": (val: boolean) => (this.settleDialogVisible = val)
          }}
          settlData={this.settleData}
          informationList={this.settleList}
          companyId={this.curData?.companyId}
          onSettleSuccess={this.handleSettleRes}
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
