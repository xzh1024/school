<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import { SettleDialog } from "@/components/business";
import PartsDetailBox from "@/components/parts/PartsDetailsBox.vue";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog.vue";
import { StockFilter } from "@/components/storage-detail/services";
import PartsInfoSearch from "@/components/partsInfoSearch";
import PrintGoodsLabelBox from "@/components/PrintGoodsLabelBox";
import { dateFormat } from "@/utils/date";
import SearchTable from "./SearchTable/index.vue";
import DetailTable from "./DetailTable/index.vue";
import HeaderForm from "./HeaderForm.vue";
import EditBillPartBox from "./EditBillPartBox.vue";
import {
  EditPartFormData,
  ReturnEditBillPart,
  SearchPartItem,
  SearchStockItem
} from "./constants";
import {
  batchOrAllStockAddPart,
  wholeBillAddPart,
  addOrUpdatePart
} from "./services";
import StockinReturnOperationMixin from "../mixins/StockinReturnOperationMixin";
import transferService from "../transferService";
import { TYPE } from "../constants";
import {
  ReturnablePartPrams,
  TransferBillItem,
  TransferBillPartItem,
  TransferEditBillHeader
} from "../../interface";
import { STOCKIN_RETURN_DETAL_TABLE } from "./DetailTable/constants";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
import { openNewWindow } from "@/utils/tool";

@Component({
  name: "transferStockinReturnDetail",
  components: {
    SearchTable,
    DetailTable,
    HeaderForm,
    EditBillPartBox,
    SettleDialog,
    PartsDetailBox,
    StorageStocksLockedDialog,
    PrintGoodsLabelBox
  }
})
export default class StockoutReturnDetail extends Mixins(
  HotkeyMixin,
  PrecisionsFixed,
  StockinReturnOperationMixin
) {
  public $refs!: {
    headerForm: HeaderForm;
    searchTable: SearchTable;
    detailTable: DetailTable;
  };

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

  @Watch("billId")
  onBillIdChange(val: number, oldVal: number) {
    if (!val || oldVal) {
      this.initData();
    }
  }

  protected transferService = transferService;
  protected loading = false;

  private header: TransferBillItem | null = null;
  private tableName = STOCKIN_RETURN_DETAL_TABLE.name;
  private sort = "";
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
  protected get myCompanyId() {
    return this.$store.state?.admin?.user?.userInfoMsg?.companyId;
  }
  private get companyId() {
    return this.curData?.companyId || this.myCompanyId;
  }
  protected get myStaffId() {
    return this.$store.state?.admin?.user?.userInfoMsg?.staffId;
  }
  private get businessManId() {
    return this.curData?.businessManId || this.myStaffId;
  }

  private relatedCompany: {
    id?: number;
    name?: string;
  } = {};
  relatedCompanyChange(data: { id: number; name: string }) {
    this.relatedCompany = { ...data };
  }

  private billId = 0;
  protected isScrollToEnd = false;
  private tableData: TransferBillPartItem[] = [];
  private selections: TransferBillPartItem[] = [];
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

  public refreshData() {
    this.loading = true;
    return this.transferService
      .fetchTransferBill(this.billId, this.sort)
      .then(res => {
        this.billId = res.header.id;
        this.header = res.header;
        this.tableData = res.details;
        this.$refs.searchTable && this.$refs.searchTable.reloadData();
        this.$nextTick(() => {
          this.isScrollToEnd = false;
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private initData() {
    this.formData = undefined;
    this.header = null;
    this.tableData = [];
    this.selections = [];
    this.$nextTick(() => {
      this.$refs.searchTable?.clearData();
      this.$refs.headerForm?.clearData();
    });
  }

  private selectChange(data: TransferBillPartItem[]) {
    this.selections = data;
    if (
      this.selections &&
      this.selections.length &&
      this.$refs.detailTable?.$el.querySelector(".is-hotkey-active")
    ) {
      this.partId = this.selections[0].part.partId;
    }
  }

  private backMainList() {
    this.$router.push({
      path: "./stockinReturnList"
    });
  }
  private createHandle() {
    if (this.createDisabled) {
      return;
    }
    this.$router.push({
      path: "./stockinReturnDetail",
      query: { time: new Date().getTime().toString() }
    });
    this.initData();
  }
  private gotoDetail(billId: string) {
    this.$router.push({
      path: "./stockinReturnDetail",
      query: {
        billId,
        time: new Date().getTime().toString()
      }
    });
  }

  private handleSettleRes(value: boolean) {
    this.settleDialogVisible = false;
    if (value) {
      this.refreshData();
    }
  }

  private formData?: TransferEditBillHeader;
  private formDataChange(formData: TransferEditBillHeader) {
    if (!this.getFormValid()) {
      return;
    }
    this.formData = formData;
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

  private wholeBillReturn(data: SearchPartItem) {
    if (
      this.billId &&
      data.relatedCompanyId !== this.header?.relatedCompanyId
    ) {
      this.$message.warning({
        message: "该配件所属调出分公司与单头不一致！",
        showClose: true
      });
      return;
    }
    this.loading = true;
    wholeBillAddPart(data.billId)
      .then(res => {
        this.$message.success({
          message: "添加明细成功！",
          showClose: true
        });
        this.loading = false;
        if (this.billId) {
          this.refreshData().then(() => {
            this.$nextTick(() => {
              this.isScrollToEnd = true;
            });
          });
        } else {
          this.gotoDetail(res.id.toString());
        }
      })
      .catch(() => {
        this.loading = false;
      });
  }
  private allStockReturn(data: SearchPartItem) {
    if (
      this.billId &&
      data.relatedCompanyId !== this.header?.relatedCompanyId
    ) {
      this.$message.warning({
        message: "该配件所属调出分公司与单头不一致！",
        showClose: true
      });
      return;
    }
    this.loading = true;
    batchOrAllStockAddPart(data.id)
      .then(res => {
        this.$message.success({
          message: "添加明细成功！",
          showClose: true
        });
        this.loading = false;
        if (this.billId) {
          this.refreshData().then(() => {
            this.$nextTick(() => {
              this.isScrollToEnd = true;
            });
          });
        } else {
          this.gotoDetail(res.id.toString());
        }
      })
      .catch(() => {
        this.loading = false;
      });
  }
  private batchAddPart(rows: SearchStockItem[], partDetail: SearchPartItem) {
    if (
      this.billId &&
      partDetail.relatedCompanyId !== this.header?.relatedCompanyId
    ) {
      this.$message.warning({
        message: "该配件所属调出分公司与单头不一致！",
        showClose: true
      });
      return;
    }
    this.loading = true;
    batchOrAllStockAddPart(
      partDetail.id,
      rows.map(item => item.id)
    )
      .then(res => {
        this.$message.success({
          message: "添加明细成功！",
          showClose: true
        });
        this.loading = false;
        if (this.billId) {
          this.refreshData().then(() => {
            this.$nextTick(() => {
              this.isScrollToEnd = true;
            });
          });
        } else {
          this.gotoDetail(res.id.toString());
        }
      })
      .catch(() => {
        this.loading = false;
      });
  }

  private seletedRelatedCompanyId?: number;
  private editBillPartBoxVisible = false;
  private partEditData: EditPartFormData = {};
  private partParamsData: ReturnablePartPrams = {};
  private isEdit = false;

  private showEditBillPartVisibleByAdd(
    row: SearchStockItem,
    partDetail: SearchPartItem
  ) {
    if (!this.canEdit || (this.billId && !this.getFormValid())) {
      return;
    }
    this.seletedRelatedCompanyId = partDetail.relatedCompanyId;
    if (
      this.billId &&
      this.seletedRelatedCompanyId !== this.header?.relatedCompanyId
    ) {
      this.$message.warning({
        message: "该配件所属调出分公司与单头不一致！",
        showClose: true
      });
      this.seletedRelatedCompanyId = undefined;
      return;
    }
    this.partEditData = {
      qty: undefined,
      price: undefined,
      amount: undefined,
      amount2Price: false,
      reason: "",
      remark: ""
    };
    this.partParamsData = { inDetailId: partDetail.id, stockId: row.id };
    this.isEdit = false;
    this.editBillPartBoxVisible = true;
  }
  private showEditBillPartVisibleByEdit(row: TransferBillPartItem) {
    if (!this.canEdit || !this.getFormValid()) {
      return;
    }
    this.partEditData = {
      qty: Number(row?.qty),
      price: Number(row?.price),
      amount: Number(row?.amount),
      reason: row?.reason,
      remark: row?.remark
    };
    this.partParamsData = { detailId: row.id };
    this.isEdit = true;
    this.editBillPartBoxVisible = true;
  }

  private handleEditBillPartChange(data: ReturnEditBillPart) {
    if (this.isEdit) {
      this.editPart(data);
    } else {
      this.addPart(data);
    }
  }
  private addPart(data: ReturnEditBillPart) {
    this.loading = true;
    let header = {};
    if (this.billId) {
      header = { id: this.billId };
    } else if (
      this.formData?.relatedCompanyId === this.seletedRelatedCompanyId
    ) {
      header = { ...this.formData };
    } else {
      header = {
        companyId: this.companyId,
        businessManId: this.businessManId,
        relatedCompanyId: this.seletedRelatedCompanyId,
        paymentType: "内部挂账",
        billDate: dateFormat(new Date(), "YYYY-MM-DD")
      };
    }
    addOrUpdatePart(data, header)
      .then(res => {
        this.$message.success({
          message: "添加明细成功！",
          showClose: true
        });
        if (this.billId) {
          this.refreshData().then(() => {
            this.$nextTick(() => {
              this.isScrollToEnd = true;
            });
          });
        } else {
          this.gotoDetail(res.id.toString());
        }
      })
      .finally(() => {
        this.seletedRelatedCompanyId = undefined;
        this.formData = undefined;
        this.loading = false;
      });
  }
  private editPart(data: ReturnEditBillPart) {
    this.loading = true;
    addOrUpdatePart(data, { id: this.billId })
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

  private removePart(row: TransferBillPartItem) {
    if (!this.canEdit || !this.getFormValid()) {
      return;
    }
    let tips = "";
    if (this.tableData.length === 1) {
      tips = "该单据只有一条明细，删除后单据也将删除，确定继续删除？";
    } else {
      tips = `确定删除配件 ${row.part.name}（${row.part.code}）？`;
    }
    this.$confirm(tips, { type: "warning" }).then(() => {
      if (this.tableData.length === 1 && this.delDisabled) {
        this.$message.error({
          message: "您没有权限删除该单据！",
          showClose: true
        });
      } else {
        this.loading = true;
        transferService
          .removeTransferBillPart(this.billId, [row.id])
          .then(() => {
            this.tableData = this.tableData.filter(item => item.id !== row.id);
            this.$message.success({
              message: `配件 ${row.part.name}（${row.part.code}） 删除成功！`,
              showClose: true
            });
            if (this.tableData.length === 0) {
              this.afterDeleteBill();
            } else {
              this.selections = this.tableData.length
                ? [this.tableData[this.tableData.length - 1]]
                : [];
              this.$nextTick(() => {
                this.isScrollToEnd = true;
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    });
  }

  private removeHandle() {
    this.removeBill().then(() => {
      this.afterDeleteBill();
    });
  }

  private afterDeleteBill() {
    if (!this.createDisabled) {
      this.$confirm(`单据 ${this.header?.billNo} 已删除，是否重新开单？`, {
        type: "warning"
      })
        .then(() => {
          this.createHandle();
        })
        .catch(() => {
          this.closePage();
        });
    } else {
      this.closePage();
    }
  }

  private get canShowPartDetail() {
    return this.partSelection.length || this.selections.length;
  }
  private get canShowStocksLocked() {
    return this.partSelection.length || this.selections.length;
  }
  private partId: number | undefined = 0;
  private partDetailBoxVisible = false;
  private partSelection: SearchPartItem[] = [];
  private storageStocksLockedVisible = false;
  private stockFilter: StockFilter = {};

  private showPartDetailBox() {
    if (!this.canShowPartDetail) {
      return;
    }
    this.setPartId();
    this.partDetailBoxVisible = true;
  }
  private showStocksLockedBox() {
    if (!this.canShowStocksLocked) {
      return;
    }
    this.setPartId();
    this.stockFilter = {
      partId: this.partId || undefined,
      ownerCompanyId: this.companyId
    };
    this.storageStocksLockedVisible = true;
  }
  private setPartId() {
    if (this.selections.length && this.partSelection.length) {
      if (this.$refs.detailTable?.$el.querySelector(".is-hotkey-active")) {
        this.partId = this.selections[0].part.partId;
      } else {
        this.partId = this.partSelection[0].partId;
      }
    } else if (this.selections.length) {
      this.partId = this.selections[0].part.partId;
    } else if (this.partSelection.length) {
      this.partId = this.partSelection[0].partId;
    }
  }
  private partSelectChange(data: SearchPartItem[]) {
    this.partSelection = data;
    if (this.partSelection && this.partSelection.length) {
      this.partId = data[0].partId;
    }
  }
  private setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
  }
  private handleSortChange(column: any) {
    this.sort = setTableSort(column);
    if (this.tableData?.length) {
      this.refreshData();
    }
  }
  protected printLabelHandle() {
    openNewWindow(
      this.$router.resolve({
        path: "/Print/Label/ShippingLabel/RT/" + this.billId
      }).href,
      "print"
    );
  }

  activated() {
    this.setSortData();
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch
          partId={this.partId}
          resetedActiveTab="Transfer"
          header={this.formData}
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
      <div style="height: 100%; width: 100%;">
        <ht-resize-columns
          isColumn
          defaultLen={302}
          scopedSlots={{
            block1: () => (
              <search-table
                ref="searchTable"
                canEdit={this.canEdit}
                relatedCompany={this.relatedCompany}
                detailSelections={this.selections}
                onBack={this.backMainList}
                onCreate={this.createHandle}
                onWholeBill={this.wholeBillReturn}
                onAllStock={this.allStockReturn}
                onBatchAdd={this.batchAddPart}
                onAdd={this.showEditBillPartVisibleByAdd}
                onPartSelectChange={this.partSelectChange}
                companyId={this.companyId}
              >
                <el-button
                  slot="button"
                  type="primary"
                  size="mini"
                  loading={this.loading}
                  disabled={!this.canShowPartDetail}
                  onClick={this.showPartDetailBox}
                >
                  配件详情（F10）
                </el-button>
                <el-button
                  slot="button"
                  type="primary"
                  size="mini"
                  loading={this.loading}
                  disabled={!this.canShowStocksLocked}
                  onClick={this.showStocksLockedBox}
                >
                  锁定数明细
                </el-button>
              </search-table>
            ),
            block2: () => (
              <div class="flex-container column-flex">
                <div class="flex-block-bg flex-block-padding btn-group">
                  <el-button
                    type="primary"
                    size="mini"
                    disabled={this.delDisabled}
                    loading={this.loading}
                    onClick={this.removeHandle}
                  >
                    删除（F4）
                  </el-button>
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
                    disabled={this.settleDisabled}
                    loading={this.loading}
                    onClick={this.settleBill}
                  >
                    结算即出库（F7）
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
                  <el-button
                    type="primary"
                    size="mini"
                    disabled={!this.billId || this.printDisabled}
                    loading={this.loading}
                    onClick={this.printLabelHandle}
                  >
                    打印发货标签
                  </el-button>
                </div>
                <header-form
                  ref="headerForm"
                  header={this.header}
                  companyId={this.companyId}
                  businessManId={this.businessManId}
                  relatedCompanies={this.relatedCompanies}
                  billId={this.billId}
                  loading={this.loading}
                  canEdit={this.canEdit}
                  onFormDataChange={this.formDataChange}
                  onRelatedCompanyChange={this.relatedCompanyChange}
                  class="flex-block-bg flex-block-padding flex-block-margin"
                  style="width: calc(100% - 10px);"
                />
                <detail-table
                  ref="detailTable"
                  loading={this.loading}
                  canEdit={this.canEdit}
                  tableData={this.tableData}
                  selectedRows={this.selections}
                  onSelectChange={this.selectChange}
                  onEdit={this.showEditBillPartVisibleByEdit}
                  onSortChange={this.handleSortChange}
                  onRemove={this.removePart}
                  class="auto-block flex-block-margin"
                />
                <div
                  class="flex-block-bg flex-block-padding"
                  style="display: flex;"
                >
                  <div>
                    记录数：
                    <span class="amount-font">{this.header?.detailsCount}</span>
                  </div>
                  <div style="margin-left: 20px;">
                    总数量：
                    <span class="amount-font">{this.header?.qty}</span>
                  </div>
                  <div style="margin-left: 20px;">
                    合计应收：
                    <span class="amount-font">{this.header?.amount}</span>
                  </div>
                </div>
              </div>
            )
          }}
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
          isEdit={this.isEdit}
          editData={this.partEditData}
          paramsData={this.partParamsData}
          onEditChange={this.handleEditBillPartChange}
        />
        <parts-detail-box
          visible={this.partDetailBoxVisible}
          on={{
            "update:visible": (val: boolean) =>
              (this.partDetailBoxVisible = val)
          }}
          value={this.partId}
        />
        <storage-stocks-locked-dialog
          visible={this.storageStocksLockedVisible}
          onClose={() => (this.storageStocksLockedVisible = false)}
          stockFilter={this.stockFilter}
        />
        <print-goods-label-box
          value={{ billType: TYPE, billId: this.billId }}
          visible={this.printGoodsLabelBoxVisible}
          onClose={() => (this.printGoodsLabelBoxVisible = false)}
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
