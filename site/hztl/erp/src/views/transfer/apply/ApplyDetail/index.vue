<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { Table } from "hztl-ui";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchMixin from "@/mixins/searchMixin";
import Summaries from "@/mixins/summaries";
import PartsInfoSearch from "@/components/partsInfoSearch";
import PartsDetailBox from "@/components/parts/PartsDetailsBox.vue";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog.vue";
import { StockFilter } from "@/components/storage-detail/services";
import PrecisionsFixedMixin from "@/mixins/PrecisionsFixedMixin";
import { add } from "@/utils/numberAPI";
import SearchTable from "./SearchTable/index.vue";
import {
  APPLY_DETAL_TABLE,
  APPLY_DETAL_TABLE_TOTAL_FILES,
  defaultFormData,
  DetailFormData,
  ImportInfo
} from "../constants";
import HeaderForm from "./DetailTable/HeaderForm.vue";
import transferService from "../transferService";
import ApplyOperationMixin from "../mixins/ApplyOperationMixin";
import EditBillPartDialog, {
  EditFormData,
  PartBaseData
} from "./EditBillPartDialog";
import { TransferBillPartItem, TransferBillItem } from "../../interface";
import { TransferApplySearchData } from "./SearchTable/interface";
import { TYPE } from "../constants";
import { pick } from "lodash";
import { getKeys } from "@/utils/tool";
import { getStaffSystemParamsDetail } from "@/api/base/base";
import CancelBox from "../CancelBox.vue";
import ImportBox from "../ImportBox.vue";
import * as store from "@/utils/store";
import { TRANSFER_APPLY_COUNT } from "@/constants";
import { transferApplyOptions } from "@/components/importBox/options";
import { reqImportTransferBill } from "@/api/importBox";
import { setTableSort } from "@/utils/tool";
@Component({
  name: "transferApplyDatail",
  components: {
    SearchTable,
    HeaderForm,
    EditBillPartDialog,
    CancelBox,
    ImportBox,
    PartsDetailBox,
    StorageStocksLockedDialog
  }
})
export default class TransfersApplyDetail extends Mixins(
  HotkeyMixin,
  SearchMixin,
  Summaries,
  PrecisionsFixedMixin,
  ApplyOperationMixin
) {
  public $refs!: {
    headerForm: HeaderForm;
    searchTable: SearchTable;
    detailTable: Table;
    importBox: any;
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

  public getFormValid() {
    return this.$refs.headerForm.getFormValid();
  }

  protected get curData() {
    return this.header;
  }
  private get canEdit() {
    return (
      (!this.curData?.id && !this.createDisabled) ||
      (this.curData?.id && !this.updateDisabled)
    );
  }

  private billId = 0;
  protected transferService = transferService;
  protected loading = false;
  private header: TransferBillItem | null = null;
  private tableData: TransferBillPartItem[] = [];
  private srcMode: number | null = 2;
  private bottomSort = "";
  public refreshData() {
    this.loading = true;
    return this.transferService
      .fetchTransferBill(this.billId, this.bottomSort)
      .then(res => {
        this.billId = res.header.id;
        this.tableData = res.details;
        this.header = res.header;
        this.srcMode = Math.max(0, Number(res.header.mode || 0) - 2);
        // this.mode = res.header.mode;
        // if (this.cacheMode === null) {
        //   this.cacheMode = this.mode;
        // }
        this.cacheMode = this.mode;
        // 如果开单模式变化，则清空配件列表
        // if (this.mode !== this.cacheMode) {
        //   console.log("this.mode", this.mode);
        //   console.log("this.cacheMode", this.cacheMode);
        //   this.$nextTick(() => {
        //     this.$refs.searchTable?.initData();
        //   });
        // }
        this.formData = {
          ...pick(res.header, getKeys(defaultFormData))
        };
      })
      .finally(() => {
        this.loading = false;
      });
  }
  protected initData() {
    this.tableData = [];
    this.header = null;
    this.formData = {
      ...defaultFormData,
      companyId: store.userInfoMsg()?.companyId,
      businessManId: store.userInfoMsg()?.staffId
    };
    this.$nextTick(() => {
      this.$refs.headerForm?.clearValidate();
      this.$refs.searchTable?.initData();
    });
  }

  private selections: TransferBillPartItem[] = [];
  private selectChangeHandler(data: TransferBillPartItem[]) {
    this.selections = data;
    if (
      this.selections &&
      this.selections.length &&
      this.$refs.detailTable?.$el.querySelector(".is-hotkey-active")
    ) {
      this.partId = this.selections[0].part.partId;
    }
  }

  private cachePart?: TransferApplySearchData;
  private selectPartHandle(row: TransferApplySearchData) {
    const valid = this.getFormValid();
    if (valid) {
      if (this.tableData.length) {
        let count = 0;
        this.tableData.forEach(item => {
          if (
            item.part.code === row.code &&
            item.part.brand === row.brand &&
            item.part.productionCode === row.productionCode
          ) {
            count = this.precisionFormat(add(count, item.qty || 0), "qty");
          }
        });
        if (count) {
          this.$confirm(
            `单据明细已包含此配件，合计数量：${count} 个，是否继续添加？`,
            {
              type: "warning"
            }
          ).then(() => {
            this.showEditPartDialog({ ...row, partId: row.id });
          });
        } else {
          this.showEditPartDialog({ ...row, partId: row.id });
        }
      } else {
        this.showEditPartDialog({ ...row, partId: row.id });
      }
    } else {
      this.cachePart = row;
    }
  }

  private formData: DetailFormData = { ...defaultFormData };
  private get companyId() {
    return (
      this.header?.companyId ||
      this.formData.companyId ||
      store.userInfoMsg().companyId
    );
  }
  private get relatedCompanyId() {
    return this.header?.relatedCompanyId || this.formData.relatedCompanyId;
  }
  private searchDataChange(data: DetailFormData) {
    this.formData = {
      ...this.formData,
      ...data
    };
  }
  private formDataChange(formData: DetailFormData) {
    // 已创建单据直接更新，未创建单据
    this.formData = { ...formData };
    this.formData.mode = this.header?.mode;
    this.syncHeader(this.formData);
  }
  private syncHeader(formData: DetailFormData) {
    const valid = this.getFormValid();
    if (!valid) {
      return;
    }
    if (this.billId) {
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
    } else if (this.cachePart) {
      const usePart = this.cachePart;
      this.cachePart = undefined;
      this.showEditPartDialog({ ...usePart, partId: usePart.id });
    }
  }

  private editPartHandle(row: TransferBillPartItem, edit = false) {
    if (this.updateDisabled) {
      return;
    }
    this.showEditPartDialog(
      {
        ...row.part,
        partId: row.part.partId,
        detailId: row.id,
        outWarehouseId: row.outWarehouseId,
        ...pick(row, ["warehouseName", "property", "batchNo", "positionName"])
      },
      {
        qty: Number(row.qty),
        warehouseId: row.warehouseId,
        warehouseName: row.warehouseName,
        remark: row.remark
      },
      edit
    );
  }

  protected removePart(row: TransferBillPartItem) {
    const len = this.tableData.length;
    if (len === 0) {
      return;
    }
    if (len === 1) {
      this.removeBill(
        this.curData!,
        "该单据只有一条明细，删除后单据也将删除，确定继续删除？"
      ).then(() => {
        return this.$confirm(
          `删除单据${this.curData!.billNo}成功，是否重新开单！`,
          {
            type: "warning"
          }
        )
          .then(() => {
            this.goDetail();
          })
          .catch(() => {
            this.closePage();
          });
      });
    } else {
      this.$confirm("确定要删除该条单据明细?", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.transferService
          .removeTransferBillPart(this.curData!.id, [row.id])
          .then(() => {
            this.refreshData();
            this.$message.success({
              message: "移除配件成功!",
              showClose: true
            });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  }

  private editPartVisible = false;
  private editPartData?: EditFormData;
  private partBaseInfo?: PartBaseData = undefined;
  private isEdit = false;
  private showEditPartDialog(
    partInfo: PartBaseData,
    data: EditFormData = {
      qty: 1,
      warehouseId: undefined,
      warehouseName: "",
      remark: ""
    },
    edit = false
  ) {
    this.partBaseInfo = pick(partInfo, [
      "detailId",
      "partId",
      "relatedCompanyId",
      "code",
      "name",
      "brand",
      "property",
      "batchNo",
      "warehouseName",
      "positionName",
      "outWarehouseId"
    ]);
    this.isEdit = edit;
    this.editPartData = data;
    this.editPartVisible = true;
  }
  private handleBottomSortChange(column: any) {
    this.page = 1;
    this.bottomSort = setTableSort(column);
    if (this.tableData.length) {
      this.refreshData();
    }
  }
  private editPartConfirm(data: EditFormData) {
    const header = this.billId
      ? { id: this.billId }
      : { ...this.formData!, mode: this.mode };
    this.loading = true;
    transferService
      .addPart(header, {
        ...data,
        partId: this.partBaseInfo!.partId,
        qty: data.qty?.toString(),
        id: this.partBaseInfo!.detailId,
        outWarehouseId: this.partBaseInfo!.outWarehouseId
      })
      .then(res => {
        if (this.billId) {
          this.refreshData();
        } else {
          this.goDetail(res?.id);
        }
        const tips = this.partBaseInfo!.detailId ? "编辑成功！" : "添加成功！";
        this.$message.success({
          message: tips,
          showClose: true
        });
        this.editPartVisible = false;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private removeBillAndReload() {
    this.removeBill().then(() => {
      this.$confirm(`单据 ${this.header?.billNo} 已删除，是否重新开单？`, {
        type: "warning"
      })
        .then(() => {
          this.goDetail();
        })
        .catch(() => {
          this.closePage();
        });
    });
  }

  private cacheMode: number | null = 4;
  private mode: number | null = 4;
  private loadMode() {
    this.loading = true;
    return (
      getStaffSystemParamsDetail({
        module: "allocation",
        type: "allocApplyMode"
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          this.cacheMode = res.value;
          this.mode = res.value;
        })
        .finally(() => {
          this.loading = false;
        })
    );
  }
  private handleModeChange(value: number) {
    this.mode = value;
    this.cacheMode = value;
  }

  get columns() {
    const editHandle = (
      row: TransferBillPartItem,
      e: MouseEvent,
      edit = false
    ) => {
      e.stopPropagation();
      this.editPartHandle(row, edit);
    };

    const removePart = (row: TransferBillPartItem, e: MouseEvent) => {
      e.stopPropagation();
      this.removePart(row);
    };
    return APPLY_DETAL_TABLE.columns
      .filter((item: any) => this.canEdit || item.prop !== "controls")
      .map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value: null, row: TransferBillPartItem) => {
              return (
                <div>
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={(e: MouseEvent) => editHandle(row, e, true)}
                    />
                  </el-tooltip>
                  <el-tooltip placement="top" content="删除" enterable={false}>
                    <i
                      class="icon operation-icon icon-delete-info"
                      on-click={(e: MouseEvent) => removePart(row, e)}
                    />
                  </el-tooltip>
                </div>
              );
            }
          };
        }
        return item;
      });
  }

  private get canShowPartDetail() {
    return this.partSelection.length || this.selections.length;
  }
  private get canShowStocksLocked() {
    return this.partSelection.length || this.selections.length;
  }
  private partId: number | undefined = 0;
  private partDetailBoxVisible = false;
  private partSelection: TransferApplySearchData[] = [];
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
      partId: this.partId || undefined
    };
    this.storageStocksLockedVisible = true;
  }
  private setPartId() {
    if (this.selections.length && this.partSelection.length) {
      if (this.$refs.detailTable?.$el.querySelector(".is-hotkey-active")) {
        this.partId = this.selections[0].part.partId;
      } else {
        this.partId = this.partSelection[0].id;
      }
    } else if (this.selections.length) {
      this.partId = this.selections[0].part.partId;
    } else if (this.partSelection.length) {
      this.partId = this.partSelection[0].id;
    }
  }
  private partSelectChange(data: TransferApplySearchData[]) {
    this.partSelection = data;
    if (this.partSelection && this.partSelection.length) {
      this.partId = data[0].id;
    }
  }

  protected importInfo: ImportInfo = {
    options: transferApplyOptions,
    hasSetting: true,
    offset: TRANSFER_APPLY_COUNT,
    relatedCompanyId: undefined,
    relatedCompanyName: "",
    businessManId: undefined,
    businessManName: "",
    billDate: ""
  };
  protected importBoxVisible = false;
  protected importHandle() {
    if (this.importDisabled) {
      return;
    }
    this.importInfo = {
      ...this.importInfo,
      relatedCompanyId: this.formData.relatedCompanyId,
      relatedCompanyName: this.formData.relatedCompanyName,
      businessManId: this.formData.businessManId,
      businessManName: this.formData.businessManName,
      billDate: this.formData.billDate
    };
    this.importBoxVisible = true;
  }
  private importInfoChange(data: ImportInfo) {
    this.formDataChange({ ...this.formData, ...data });
  }
  protected importBill(rows: any) {
    return new Promise((resolve, reject) => {
      if (this.$refs.importBox.isValidate()) {
        reqImportTransferBill(
          {
            id: this.billId,
            relatedCompanyId: this.importInfo.relatedCompanyId,
            businessManId: this.importInfo.businessManId,
            billDate: this.importInfo.billDate,
            rows
          },
          TYPE
        )
          .then((res: any) => {
            if (res.id) {
              this.importBoxVisible = false;
              this.goDetail(res.id);
            }
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      } else {
        reject();
      }
    });
  }

  mounted() {
    this.loadMode();
    if (!this.billId) {
      this.initData();
    }
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
          header={this.formData}
        />
      )
    });
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
      <ht-resize-columns
        isColumn
        defaultLen={342}
        scopedSlots={{
          block1: () => (
            <search-table
              ref="searchTable"
              canEdit={this.canEdit}
              relatedCompanyId={this.relatedCompanyId}
              companyId={this.companyId}
              onSelectPart={this.selectPartHandle}
              onSearchDataChange={this.searchDataChange}
              billId={this.billId}
              mode={this.mode}
              onModeChange={this.handleModeChange}
              onPartSelectChange={this.partSelectChange}
              onCreate={this.initData}
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
                  onClick={this.removeBillAndReload}
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
                  onClick={this.cancelBillPart}
                  disabled={this.cancelDisabled}
                >
                  配件取消
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
                  onClick={this.importHandle}
                  disabled={this.importDisabled}
                >
                  导入（Alt+ I）
                </el-button>
              </div>
              <header-form
                ref="headerForm"
                header={this.header}
                v-loading={this.loading}
                v-model={this.formData}
                onChange={this.formDataChange}
                relatedCompanies={this.relatedCompanies}
                class="flex-block-bg flex-block-padding flex-block-margin auto-width"
              />
              <ht-setting-table
                ref="detailTable"
                class="auto-block flex-block-margin"
                table-name={APPLY_DETAL_TABLE.name}
                columns={this.columns}
                data={this.tableData}
                loading={this.loading}
                show-summary
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                summary-method={(params: any) =>
                  this.getSummariesByCalculate(
                    params,
                    APPLY_DETAL_TABLE_TOTAL_FILES
                  )
                }
                onSort-change={this.handleBottomSortChange}
                selectedRows={this.selections}
                onSelectChange={this.selectChangeHandler}
                onRowOperation={(row: any) => {
                  this.editPartHandle(row, true);
                }}
                onRowDelete={this.removePart}
              />

              <edit-bill-part-dialog
                loading={this.loading}
                relatedCompanyId={this.formData.relatedCompanyId}
                visible={this.editPartVisible}
                editData={this.editPartData}
                mode={this.mode}
                isEdit={this.isEdit}
                partBaseInfo={this.partBaseInfo}
                companyId={this.companyId}
                onConfirm={this.editPartConfirm}
                onClose={() => (this.editPartVisible = false)}
              />
              <cancel-box
                visible={this.cancelBoxVisible}
                on={{
                  "update:visible": (val: boolean) =>
                    (this.cancelBoxVisible = val)
                }}
                headerData={this.header}
                totalData={this.tableData}
                onSuccess={() => this.refreshData()}
              />
              <parts-detail-box
                visible={this.partDetailBoxVisible}
                onClose={() => (this.partDetailBoxVisible = false)}
                value={this.partId}
              />
              <storage-stocks-locked-dialog
                visible={this.storageStocksLockedVisible}
                onClose={() => (this.storageStocksLockedVisible = false)}
                stockFilter={this.stockFilter}
              />
              <import-box
                ref="importBox"
                visible={this.importBoxVisible}
                on={{
                  "update:visible": (val: boolean) =>
                    (this.importBoxVisible = val)
                }}
                disabled={this.importDisabled}
                v-model={this.importInfo}
                header={this.header}
                relatedCompanies={this.relatedCompanies}
                req-handler={this.importBill}
                onChange={this.importInfoChange}
              />
            </div>
          )
        }}
      />
    );
  }
}
</script>
<style lang="scss" scoped>
.btn-group {
  margin-top: 5px;
}
.auto-width {
  width: auto;
}
</style>
