<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { SettleDialog } from "@/components/business";
import { OUT_TABLE } from "./constants";
import OutOperationMixin from "../mixins/OutOperationMixin";
import SearchFrom from "./SearchFrom.vue";
import transferService from "../transferService";
import { TotalInfo, TransferBillItem } from "../../interface";
import { pick } from "lodash";

@Component({
  name: "transferOutList",
  components: {
    SearchFrom,
    SettleDialog
  }
})
export default class TransferOut extends Mixins(
  HotkeyMixin,
  OutOperationMixin,
  PaginationDataMixin
) {
  // for PaginationDataMixin
  protected totalInfo: TotalInfo = {};
  protected tableData: TransferBillItem[] = [];
  protected selections: TransferBillItem[] = [];
  // 外部使用时用refreshData
  protected loadData() {
    return transferService.fetchTransferList({
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

  private searchFormData!: FormData;
  private searchChange(data: FormData) {
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
      path: "./outDetail",
      query: { time: new Date().getTime().toString(), create: "true" }
    });
  }

  protected editBill(row?: TransferBillItem) {
    if (this.readDisabled) {
      return;
    }
    const curRow = row || this.curData;
    if (curRow) {
      this.$router.push({
        path: "./outDetail",
        query: { billId: String(curRow?.id), list: "true" }
      });
    }
  }

  private removeBillAndReload(row?: TransferBillItem) {
    this.removeBill(row).then(() => {
      this.pageChange(1);
    });
  }

  private get informationList() {
    return [
      {
        name: "业务单号",
        content: this.curData?.billNo
      },
      {
        type: "billType"
      },
      { name: "往来单位", content: this.curData?.relatedBill?.companyName },
      {
        type: "amount"
      },
      {
        type: "settledAmount"
      },
      // {
      //   type: "discountAmount"
      // },
      {
        type: "unSettledAmount"
      }
    ];
  }

  private get settlData() {
    return {
      ...pick(this.curData, [
        "id",
        "amount",
        "discountAmount",
        "settledAmount",
        "billNo"
      ]),
      enhancedSettlementType: this.curData?.paymentType,
      billType: "KD"
    };
  }

  private settleVisible = false;
  protected settleBill() {
    this.settleVisible = true;
  }

  public handleSettleRes(res: boolean) {
    if (res) {
      this.pageChange(this.page);
    }
  }

  mounted() {
    this.refreshData();
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
            disabled={!this.curData || this.readDisabled}
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
            onClick={this.settleBill}
            disabled={this.settleDisabled}
          >
            结算即出库（F7）
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
            table-name={OUT_TABLE.name}
            columns={OUT_TABLE.columns}
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
          />
        </div>
        <settle-dialog
          visible={this.settleVisible}
          informationList={this.informationList}
          companyId={this.curData?.companyId}
          settlData={this.settlData}
          onSettleSuccess={this.handleSettleRes}
          onVisibleChange={(visible: boolean) => (this.settleVisible = visible)}
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
