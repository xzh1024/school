<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { pick } from "lodash";
import PartsInfoSearch from "@/components/partsInfoSearch";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import Summaries from "@/mixins/summaries";
import { StockFilter } from "@/components/storage-detail/services";
import { getKeys } from "@/utils/tool";
import {
  TransferBillItem,
  TransferBillPartItem
} from "@/views/transfer/interface";
import { defaultFormData, AuditFormData, Part } from "./constants";
import HeaderForm from "./HeaderForm.vue";
import MyPartDetail from "./MyPartDetail.vue";
import CancelBox from "../../CancelBox.vue";
import TransferBox from "../../TransferBox/index.vue";
import ApplyOperationMixin from "../../mixins/ApplyOperationMixin";
import transferService from "../../transferService";
import {
  APPLY_DETAL_TABLE,
  APPLY_DETAL_TABLE_TOTAL_FILES
} from "../../constants";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component({
  name: "transferApplyDatailAudit",
  components: {
    HeaderForm,
    CancelBox,
    TransferBox,
    StorageStocksLockedDialog,
    PartsDetailBox,
    MyPartDetail
  }
})
export default class Audit extends Mixins(
  HotkeyMixin,
  Summaries,
  ApplyOperationMixin
) {
  @Watch("$route.query.time", { immediate: true })
  onTimeChange() {
    if (this.$route.name === this.$options.name) {
      this.billId = Number(this.$route.query.billId || 0);
      this.refreshData();
      this.setDefaultHotkey();
    }
  }

  protected get curData() {
    return this.header;
  }

  private billId = 0;
  protected transferService = transferService;
  protected loading = false;
  private header: TransferBillItem | null = null;
  private tableData: TransferBillPartItem[] = [];
  private columns = APPLY_DETAL_TABLE.columns.filter(
    item => item.prop !== "controls"
  );
  private sort = "";
  private tableName = `${APPLY_DETAL_TABLE.name}Audit`;
  public refreshData() {
    this.setSortData();
    if (!this.billId) {
      this.tableData = [];
      this.header = null;
      return Promise.resolve();
    }
    this.loading = true;
    return this.transferService
      .fetchTransferBill(this.billId, this.sort)
      .then(res => {
        this.billId = res.header.id;
        this.tableData = res.details;
        this.header = res.header;
        if (this.tableData?.length) {
          this.selections = [this.tableData[0]];
          this.setPart();
        }
        this.formData = {
          ...pick(res.header, getKeys(defaultFormData))
        };
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
    this.refreshData();
  }
  private createBill() {
    if (this.createDisabled) {
      return;
    }
    this.goDetail();
  }

  private selections: TransferBillPartItem[] = [];
  private part: Part | null = null;
  private selectChangeHandler(data: TransferBillPartItem[]) {
    this.selections = data;
    this.setPart();
  }
  private setPart() {
    if (this.selections && this.selections.length) {
      this.part = {
        id: this.selections[0].part.partId,
        name: this.selections[0].part.name,
        code: this.selections[0].part.code
      };
    } else {
      this.part = null;
    }
  }

  private stocksLockedBoxVisible = false;
  private stockFilter: StockFilter = {};
  showStocksLockedBox() {
    if (!this.selections.length) {
      return;
    }
    this.stockFilter = {
      partId: this.selections[0].part.partId
    };
    this.stocksLockedBoxVisible = true;
  }

  private partDetailBoxVisible = false;
  private showPartDetailBox() {
    if (!this.selections.length) {
      return;
    }
    this.partDetailBoxVisible = true;
  }

  private formData: AuditFormData = { ...defaultFormData };
  private formDataChange(formData: AuditFormData) {
    if (this.billId) {
      this.loading = true;
      this.transferService
        .updateTransferBillHeader(this.billId, {
          ...formData,
          ...pick(this.header, [
            "id",
            "billNo",
            "status",
            "sourceId",
            "companyId",
            "relatedCompanyId",
            "businessManId",
            "billDate",
            "planDate",
            "remark",
            "allocOut"
          ])
        })
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

  activated() {
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch
          partId={this.part?.id}
          resetedActiveTab="Transfer"
          header={this.formData}
        />
      )
    });
  }
  deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
  }

  render() {
    return (
      <ht-resize-columns
        isColumn
        directionContrary
        defaultLen={170}
        scopedSlots={{
          block1: () => (
            <div class="flex-container column-flex">
              <div class="flex-container flex-block-bg flex-block-padding btn-group">
                <div class="auto-block">
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
                  <el-button
                    type="primary"
                    size="mini"
                    disabled={!this.selections.length}
                    onClick={this.showPartDetailBox}
                    loading={this.loading}
                  >
                    配件详情（F10）
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    disabled={!this.selections.length}
                    onClick={this.showStocksLockedBox}
                    loading={this.loading}
                  >
                    锁定数明细
                  </el-button>
                </div>
                <div>
                  <el-link underline={false} onClick={this.gotoList}>
                    返回列表
                    <span class="el-icon-arrow-right" />
                  </el-link>
                </div>
              </div>
              <header-form
                header={this.header}
                v-model={this.formData}
                onChange={this.formDataChange}
                v-loading={this.loading}
                class="flex-block-bg flex-block-padding flex-block-margin auto-width"
              />
              <ht-setting-table
                class="auto-block flex-block-margin"
                table-name={`${APPLY_DETAL_TABLE.name}Audit`}
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
                selectedRows={this.selections}
                onSelectChange={this.selectChangeHandler}
                onSort-change={this.handleSortChange}
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
              <transfer-box
                visible={this.transferBoxVisible}
                on={{
                  "update:visible": (val: boolean) =>
                    (this.transferBoxVisible = val)
                }}
                headerData={this.header}
                totalData={this.tableData}
                onSuccess={() => this.refreshData()}
              />
              <parts-detail-box
                visible={this.partDetailBoxVisible}
                onClose={() => (this.partDetailBoxVisible = false)}
                value={this.part?.id}
              />
              <storage-stocks-locked-dialog
                visible={this.stocksLockedBoxVisible}
                stock-filter={this.stockFilter}
                onClose={() => (this.stocksLockedBoxVisible = false)}
              />
            </div>
          ),
          block2: () => (
            <my-part-detail
              part={this.part}
              relatedCompanyId={this.header?.relatedCompanyId}
            />
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
