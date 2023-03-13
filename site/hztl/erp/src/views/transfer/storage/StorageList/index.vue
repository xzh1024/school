<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import SearchFrom from "./SearchFrom.vue";
import { STORAGE_TABLE } from "./constants";
import StorageOperationMixin from "../mixins/StorageOperationMixin";
import transferService from "../transferService";
import { SettleDialog } from "@/components/business";
import { TotalInfo, TransferBillItem } from "../../interface";
import { pick } from "lodash";
import EditWarehouseBox from "../EditWarehouseBox/index.vue";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component({
  name: "transferStorageList",
  components: {
    SearchFrom,
    SettleDialog,
    EditWarehouseBox
  }
})
export default class TransferStorage extends Mixins(
  HotkeyMixin,
  StorageOperationMixin,
  PaginationDataMixin
) {
  private tableName = STORAGE_TABLE.name;
  private sort = "";
  // for PaginationDataMixin
  protected totalInfo: TotalInfo = {};
  protected tableData: TransferBillItem[] = [];
  protected selections: TransferBillItem[] = [];
  protected settleVisible = false;
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

  private searchFormData!: FormData & { sort?: string };
  private searchChange(data: FormData) {
    this.searchFormData = data;
    this.pageChange(1);
  }
  protected settleBill() {
    this.settleVisible = true;
  }
  private selectChangeHandler(data: TransferBillItem[]) {
    this.selections = data;
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
      billType: "RD"
    };
  }
  public handleSettleRes(res: boolean) {
    if (res) {
      this.pageChange(this.page);
    }
  }

  protected editBill(row?: TransferBillItem) {
    if (this.readDisabled) {
      return;
    }
    const curRow = this.curData || row;
    curRow?.id &&
      this.$router.push({
        path: "storageDetail",
        query: {
          billId: curRow!.id.toString(),
          time: new Date().getTime().toString()
        }
      });
  }

  private setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
  }
  private handleSortChange(column: any) {
    this.page = 1;
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
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btn-group">
          <el-button
            type="primary"
            size="mini"
            onClick={this.editBill}
            disabled={!this.curData || this.readDisabled}
            loading={this.loading}
          >
            查改（F3）
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
            审核（F7）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.settleBill}
            disabled={this.settleDisabled}
          >
            结算即入库（F7）
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
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.setWarehouseHandle}
            disabled={this.updateDisabled}
          >
            设置到货仓库
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
            table-name={STORAGE_TABLE.name}
            columns={STORAGE_TABLE.columns}
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
            show-summary
            onSort-change={this.handleSortChange}
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
        <edit-warehouse-box
          visible={this.editWarehouseBoxVisible}
          onClose={() => (this.editWarehouseBoxVisible = false)}
          details={this.curDetails}
          headerId={this.curHeader?.id}
          companyId={this.curData?.companyId}
          onEdit={this.handleWarehouseEdit}
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
