<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchMixin from "@/mixins/searchMixin";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import PartsInfoSearch from "@/components/partsInfoSearch";
import PartsDetailBox from "@/components/parts/PartsDetailsBox.vue";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog.vue";
import { SettleDialog } from "@/components/business";
import DetailTable from "./DetailTable/index.vue";
import HeaderForm from "./HeaderForm.vue";
import EditBillPartBox from "./EditBillPartBox.vue";
import { EditBillPartParams, EditPartFormData } from "./constants";
import StockoutReturnOperationMixin from "../mixins/StockoutReturnOperationMixin";
import transferService from "../transferService";
import {
  ReturnablePartPrams,
  TransferBillItem,
  TransferBillPartItem,
  TransferEditBillHeader
} from "../../interface";
import { STOCKOUT_RETURN_DETAL_TABLE } from "./DetailTable/constants";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component({
  name: "transferStockoutReturnDetail",
  components: {
    DetailTable,
    HeaderForm,
    EditBillPartBox,
    PartsDetailBox,
    StorageStocksLockedDialog,
    SettleDialog
  }
})
export default class StockoutReturnDetail extends Mixins(
  HotkeyMixin,
  SearchMixin,
  PrecisionsFixed,
  StockoutReturnOperationMixin
) {
  public $refs!: {
    headerForm: HeaderForm;
  };
  private tableName = STOCKOUT_RETURN_DETAL_TABLE.name;
  private sort = "";
  @Watch("$route.query.time", { immediate: true })
  onTimeChange() {
    if (this.$route.name === this.$options.name) {
      this.billId = Number(this.$route.query.billId || 0);
      if (this.billId) {
        this.refreshData();
      }
      this.setDefaultHotkey();
    }
  }

  protected transferService = transferService;
  protected loading = false;

  private header: TransferBillItem | null = null;
  protected get curData() {
    return this.header;
  }
  private get canEdit() {
    return (
      (!this.curData?.id && !this.createDisabled) ||
      (this.curData?.id && !this.updateDisabled)
    );
  }

  public getFormValid() {
    return this.$refs.headerForm.getFormValid();
  }

  private billId = 0;
  protected isScrollToEnd = false;
  private tableData: TransferBillPartItem[] = [];
  private selections: TransferBillPartItem[] = [];
  private partId: number | null = null;
  @Watch("tableData", { deep: true })
  private onTableDataChange() {
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
  @Watch("selections", { deep: true })
  private onSelectionsChange() {
    if (this.selections.length) {
      this.partId = this.selections[0].part.partId || null;
    } else {
      this.partId = null;
    }
  }

  public refreshData() {
    this.loading = true;
    return this.transferService
      .fetchTransferBill(this.billId, this.sort)
      .then(res => {
        this.billId = res.header.id;
        this.header = res.header;
        this.tableData = res.details;
        this.$nextTick(() => {
          this.isScrollToEnd = false;
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private selectChange(data: TransferBillPartItem[]) {
    this.selections = data;
  }

  private backMainList() {
    this.$router.push({
      path: "./stockoutReturnList"
    });
  }
  private gotoDetail(billId: string) {
    this.$router.push({
      path: "./stockoutReturnDetail",
      query: { billId, time: new Date().getTime().toString() }
    });
  }

  private handleSettleRes(value: boolean) {
    this.settleDialogVisible = false;
    if (value) {
      this.refreshData();
    }
  }

  private partDetailBoxVisible = false;
  private showPartDetailBox() {
    if (!this.selections.length) {
      return;
    }
    this.partDetailBoxVisible = true;
  }

  private formDataChange(formData: TransferEditBillHeader) {
    if (this.billId) {
      this.loading = true;
      this.transferService
        .updateTransferBillHeader(this.billId, formData)
        .then(() => {
          this.$message.success({
            message: "单头更新成功！",
            showClose: true
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  private editBillPartBoxVisible = false;
  private partEditData: EditPartFormData = {};
  private partParamsData: ReturnablePartPrams = {};
  private showEditBillPartVisible(row: TransferBillPartItem) {
    if (!this.canEdit || !this.getFormValid()) {
      return;
    }
    this.partEditData = {
      qty: Number(row?.qty),
      price: Number(row?.price),
      amount: Number(row?.amount),
      warehouseId: row?.warehouseId,
      warehouseName: row?.warehouseName,
      positionId: row?.positionId,
      positionName: row?.positionName,
      reason: row?.reason,
      remark: row?.remark
    };
    this.partParamsData = { detailId: row.id };
    this.editBillPartBoxVisible = true;
  }
  private editPart(data: EditBillPartParams) {
    this.loading = true;
    this.transferService
      .updateTransferBillpart([data])
      .then(() => {
        this.$message.success({
          message: "更新明细成功！",
          showClose: true
        });
        this.refreshData();
      })
      .finally(() => {
        this.loading = false;
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
    if (this.tableData?.length) {
      this.refreshData();
    }
  }
  mounted() {
    this.setSortData();
  }
  activated() {
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch
          partId={this.partId}
          resetedActiveTab="Transfer"
          header={this.header}
        />
      )
    });
    if (this.$route.name === this.$options.name && this.$route.query.billId) {
      this.refreshData();
    }
  }

  get autoSubmitWhenClose() {
    return this.$store.state?.admin?.systemParams?.params?.autoSubmitWhenClose;
  }
  async deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
    if (this.autoSubmitWhenClose) {
      await this.submitBill();
    }
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btn-group">
          <div class="flex-container">
            <div>
              <el-button
                type="primary"
                size="mini"
                disabled={this.submitDisabled}
                loading={this.loading}
                onClick={this.submitBill}
              >
                提交（F9）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                disabled={this.recallDisabled}
                loading={this.loading}
                onClick={this.recallBill}
              >
                撤回（F9）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                disabled={this.auditDisabled}
                loading={this.loading}
                onClick={this.auditBill}
              >
                审核（F7）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                disabled={this.settleDisabled}
                loading={this.loading}
                onClick={this.settleBill}
              >
                结算即入库（F7）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                loading={this.loading}
                disabled={!this.selections.length}
                onClick={this.showPartDetailBox}
              >
                配件详情（F10）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                disabled={!this.billId || this.printDisabled}
                loading={this.loading}
                onClick={this.printBill}
              >
                打印（F11）
              </el-button>
            </div>
            <div>
              <el-link underline={false} onClick={this.backMainList}>
                返回列表
                <span class="el-icon-arrow-right" />
              </el-link>
            </div>
          </div>
        </div>
        <header-form
          ref="headerForm"
          header={this.header}
          loading={this.loading}
          canEdit={this.canEdit}
          onFormDataChange={this.formDataChange}
          class="flex-block-bg flex-block-padding flex-block-margin"
          style="width: calc(100% - 10px);"
        />
        <detail-table
          loading={this.loading}
          canEdit={this.canEdit}
          tableData={this.tableData}
          selectedRows={this.selections}
          onSelectChange={this.selectChange}
          onSortChange={this.handleSortChange}
          onEdit={this.showEditBillPartVisible}
          class="auto-block flex-block-margin"
        />
        <div class="flex-block-bg flex-block-padding" style="display: flex;">
          <div>
            记录数：
            <span class="amount-font">{this.header?.detailsCount}</span>
          </div>
          <div style="margin-left: 20px;">
            总数量：
            <span class="amount-font">{this.header?.qty}</span>
          </div>
          <div style="margin-left: 20px;">
            合计应付：
            <span class="amount-font">{this.header?.amount}</span>
          </div>
        </div>

        <parts-detail-box
          visible={this.partDetailBoxVisible}
          on={{
            "update:visible": (val: boolean) =>
              (this.partDetailBoxVisible = val)
          }}
          value={this.partId}
        />
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
        <edit-bill-part-box
          visible={this.editBillPartBoxVisible}
          onClose={() => (this.editBillPartBoxVisible = false)}
          editData={this.partEditData}
          paramsData={this.partParamsData}
          onEditChange={this.editPart}
          companyId={this.curData?.companyId}
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
