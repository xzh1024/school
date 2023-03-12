<script lang="tsx">
import { ManulData } from "@/constants/finance/manul";
import { Component, Mixins, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchTable from "@/templates/search-table.vue";
import { dateFormat } from "@/utils/date";
import { TableColumn } from "@/constants/interface";
import { BILL_TYPE } from "@/constants";
import {
  exportManulList,
  FundCategories,
  loadManulList,
  removeManulLog,
  reviewManual,
  searchFundCategories
} from "@/api/finance/manual";
import { backSettle } from "@/api/finance/billSettle";
import { FINANCE_MANUAL_BILL_DETAIL, PAYMENT_TYPE } from "./constants";
import EditManualDetailBox from "./components/EditManualDetailBox.vue";
import TransferManulBox from "./components/TransferManulBox.vue";
import { Dictionary } from "vue-router/types/router";
import * as store from "@/utils/store";
import VideoPopover from "@/components/VideoPopover/index.vue";

const videoUrl = "https://dl.hztl3.com/videos/yp_videos/accounting_records.mp4";
const videoPopoverRemark =
  "出纳记账页面，用于各个采购、销售、OA等业务单据产生的出纳账以及手工账。";

const REVIEW_STATUS = {
  0: "未复核",
  1: "已复核"
};

const DATE_TYPES = ["登记日期", "收付款日期", "票据日期", "复核日期"];
const baseType = [
  "LR",
  "XS",
  "XT",
  "CG",
  "JJ",
  "CT",
  "DS",
  "DZ",
  "SS",
  "SA",
  "RS",
  "RA",
  "DD",
  "YJ",
  "FEE",
  "KZ",
  "YS",
  "YF",
  "TS",
  "TF",
  "ZZ"
];
const repairtypes = ["XC", "WX", "FX"];

const curDate = new Date();
const defaultSearchFormData = {
  dateType: 1,
  timeRange: [
    dateFormat(new Date().setDate(curDate.getDate() - 6)),
    dateFormat(curDate)
  ],
  cooperatorId: null,
  paymentTypes: [0, 1],
  statuses: [0, 1],
  companyIds: [],
  fundAccountId: [],
  fundAccountType: [],
  businessType: [""],
  description: "",
  billNo: "",
  fundCategoryId: []
};
const SystemParamsStore = namespace("admin/systemParams");

@Component({
  name: "ManualBill",
  components: { EditManualDetailBox, TransferManulBox, VideoPopover }
})
export default class ManualBill extends Mixins(
  SearchTable,
  SearchMixin,
  HotkeyMixin
) {
  @SystemParamsStore.Getter("sumQueryDefaultDateRange")
  private sumQueryDefaultDateRange!: [string, string];
  @Watch("sumQueryDefaultDateRange")
  private onSumQueryDefaultDateRangeChange() {
    defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
    this.searchFormData.timeRange = this.sumQueryDefaultDateRange;
  }

  protected get exportName() {
    return `出纳记账-${dateFormat(curDate)}`;
  }

  protected get BUSINESS_TYPE() {
    const TYPE = store.isYx() ? [...baseType, ...repairtypes] : baseType;
    return TYPE.map(item => ({
      id: item,
      name: BILL_TYPE[item]
    }));
  }

  protected tableName = FINANCE_MANUAL_BILL_DETAIL.name;
  protected columns = FINANCE_MANUAL_BILL_DETAIL.columns;

  private formateCloumns() {
    this.columns = FINANCE_MANUAL_BILL_DETAIL.columns.map(item => {
      const deleteHandle = (row: ManulData, e: MouseEvent) => {
        e && e.stopPropagation();
        this.deleteManual(row);
      };
      const updateHandle = (row: ManulData, e: MouseEvent) => {
        e && e.stopPropagation();
        this.updateManual(row);
      };
      const unsettleHandle = (row: ManulData, e: MouseEvent) => {
        e && e.stopPropagation();
        this.unsettleManual(row);
      };

      if (item.type === "controls") {
        const column: TableColumn<ManulData> = {
          ...item,
          render: (value, row) => {
            return (
              <div>
                {this.canDelete(row) ? (
                  <el-tooltip
                    enterable={false}
                    effect="dark"
                    content="编辑"
                    placement="top"
                  >
                    <span
                      class="icon operation-icon icon-edit-info"
                      on-click={(e: MouseEvent) => updateHandle(row, e)}
                    />
                  </el-tooltip>
                ) : null}
                {this.canUpdate(row) ? (
                  <el-tooltip
                    enterable={false}
                    effect="dark"
                    content="删除"
                    placement="top"
                  >
                    <span
                      class="icon operation-icon icon-delete-info"
                      on-click={(e: MouseEvent) => deleteHandle(row, e)}
                    />
                  </el-tooltip>
                ) : null}
                {this.canUnsettle(row) ? (
                  <el-tooltip
                    enterable={false}
                    effect="dark"
                    content="冲销"
                    placement="top"
                  >
                    <span
                      class="icon operation-icon icon-unsettle-info"
                      on-click={(e: MouseEvent) => unsettleHandle(row, e)}
                    />
                  </el-tooltip>
                ) : null}
              </div>
            );
          }
        };
        return column;
      }
      return item;
    });
  }

  private isUpdate = false;
  private showEditManualDetailBox = false;
  private editData: ManulData | null = null;
  private curSelectedRows: ManulData[] = [];
  private selectable(row: ManulData) {
    return !row.status;
  }
  protected onSelectChange(rows: ManulData[]) {
    this.curSelectedRows = rows;
  }
  private createHandle() {
    if (this.loading || !this.hasBelongsPerm("create")) return;
    this.isUpdate = false;
    this.showEditManualDetailBox = true;
  }

  private showTransferManulBox = false;
  private syncTransterVisible(visible: boolean) {
    this.showTransferManulBox = visible;
  }

  private reviewSelected() {
    this.$confirm(
      `确认复核所选${this.curSelectedRows.length}条明细？`,
      "提示",
      { type: "warning" }
    )
      .then(() => {
        this.loading = true;
        return reviewManual({
          reviewMode: 0,
          ids: this.curSelectedRows.map(item => item.subId)
        });
      })
      .then(() => {
        this.$message.success({
          message: "复核成功!",
          showClose: true
        });
        return this.loadData();
      })
      .catch(() => {
        this.loading = false;
      });
  }

  private reviewSearched() {
    this.$confirm(`确认复核所有查询结果中未复核的明细？`, "提示", {
      type: "warning"
    })
      .then(() => {
        this.loading = true;
        return reviewManual({
          reviewMode: 1,
          reviewSearchReq: {
            ...this.searchParams
          }
        });
      })
      .then(() => {
        this.$message.success({
          message: "复核成功!",
          showClose: true
        });
        return this.loadData();
      })
      .catch(() => {
        this.loading = false;
      });
  }

  private canDelete(row: ManulData) {
    return (
      this.hasBelongsPerm("delete", row.belongs) &&
      row.sourceBillType === "LR" &&
      row.status === 0
    );
  }
  private deleteManual(row: ManulData) {
    if (!this.canDelete(row)) {
      return;
    }
    this.$confirm("确认删除该条明细？", "提示", { type: "warning" })
      .then(() => {
        this.loading = true;
        return removeManulLog({ id: row.subId });
      })
      .then(() => {
        this.$message.success({
          message: "删除成功!",
          showClose: true
        });
        return this.loadData();
      })
      .catch(() => {
        this.loading = false;
      });
  }

  private canUpdate(row: ManulData) {
    return (
      this.hasBelongsPerm("update", row.belongs) &&
      row.sourceBillType === "LR" &&
      row.status === 0
    );
  }
  private updateManual(row: ManulData) {
    if (!this.canUpdate(row)) {
      return;
    }
    this.isUpdate = true;
    this.editData = { ...row };
    this.showEditManualDetailBox = true;
  }

  private canUnsettle(row: ManulData) {
    return (
      this.hasBelongsPerm("unSettleLR", row.belongs) &&
      row.sourceBillType === "LR" &&
      row.status === 1 &&
      row.unsettleStatus === 0
    );
  }
  private unsettleManual(row: ManulData) {
    if (!this.canUnsettle(row)) {
      return;
    }
    this.$confirm("确认冲销该笔已复核手工帐？", "提示", {
      type: "warning"
    })
      .then(() => {
        this.loading = true;
        return backSettle({ logId: row.logId });
      })
      .then(() => {
        this.$message.success({
          message: "冲销成功!",
          showClose: true
        });
        return this.loadData();
      })
      .catch(() => {
        this.loading = false;
      });
  }

  protected searchFormData = {
    ...defaultSearchFormData
  };

  protected resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    const businessType = this.BUSINESS_TYPE.map(item => item.id);
    this.searchFormData = {
      ...defaultSearchFormData,
      businessType: businessType
    };
  }

  protected clickSearchHandler(e: MouseEvent) {
    e.stopPropagation();
    this.searchChange({ ...this.getSearchParams() });
  }

  protected getSearchParams() {
    const searchParams = {
      ...this.searchFormData,
      fromDate:
        this.searchFormData.timeRange && this.searchFormData.timeRange[0],
      toDate: this.searchFormData.timeRange && this.searchFormData.timeRange[1],
      timeRange: undefined
    };
    return {
      ...searchParams
    };
  }

  protected loadData() {
    this.loading = true;
    loadManulList({
      ...this.searchParams,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(res => {
        this.curSelected = null;
        this.tableData = res.rows || [];
        this.totalInfo = res.totalInfo || {};
        this.totalSize = res.totalSize || 0;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  protected exportHandle(params: []) {
    return exportManulList({
      ...this.searchParams,
      columnsSettings: params
    });
  }

  private fundCategories: FundCategories[] = [];
  private loadFundCategories() {
    searchFundCategories({
      status: "enable",
      queryBillType: "none"
    }).then(res => {
      this.fundCategories = res.map(item => ({
        ...item,
        name: item.fullName
      }));
    });
  }

  mounted() {
    this.formateCloumns();
    defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
    this.resetParams();
    this.$store.dispatch("admin/baseData/loadAccountList");
    this.loadFundCategories();
  }

  activated() {
    const query = this.$route.query as Dictionary<object>;
    if (query && query.reportSearch && typeof query.reportSearch === "object") {
      this.searchFormData = {
        ...defaultSearchFormData,
        ...query.reportSearch,
        businessType: []
      };
      this.searchChange({
        ...this.getSearchParams()
      });
      delete this.$route.query.reportSearch;
    }
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
        selected-rows={this.curSelectedRows}
        on-selectChange={this.onSelectChange}
        selectable={this.selectable}
        total={this.totalSize}
        current-page={this.page}
        on-pageChange={this.pageChange}
        on-rowOperation={this.updateManual}
        selection-type="multiple"
        show-summary
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        summary-method={(param: any) =>
          this.getSummaries(param, this.totalInfo)
        }
        on={{
          "update:exportTableVisible": this.syncExportVisible
        }}
      />
    );
  }

  protected renderSearch() {
    return (
      <el-form
        class="form-item-small-margin-bottom"
        label-width="60px"
        size="mini"
        label-position="left"
      >
        <el-row gutter={10}>
          <el-col span={7}>
            <el-form-item label-width="100px">
              <ht-select
                slot="label"
                v-model={this.searchFormData.dateType}
                options={DATE_TYPES}
                clearable={false}
                class="date-label"
              />
              <ht-date-range
                v-model={this.searchFormData.timeRange}
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="单号查询" label-width="100px">
              <ht-input v-model={this.searchFormData.billNo} />
            </el-form-item>
            <el-form-item
              prop="cooperatorId"
              label="往来单位"
              label-width="100px"
            >
              <ht-autoselect
                v-model={this.searchFormData.cooperatorId}
                fetch-suggestions={(query: string) =>
                  this.searchLoadAllTypesCooperators(query)
                }
                trigger-on-focus={false}
                placeholder="请选择"
                remote
                clearable
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="收支类型">
              <ht-select
                v-model={this.searchFormData.paymentTypes}
                options={PAYMENT_TYPE}
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="复核状态">
              <ht-select
                v-model={this.searchFormData.statuses}
                options={REVIEW_STATUS}
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="业务类型">
              <ht-select
                v-model={this.searchFormData.businessType}
                options={this.BUSINESS_TYPE}
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="资金账户">
              <ht-select
                v-model={this.searchFormData.fundAccountId}
                options={store.accountList()}
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="账户类型">
              <ht-select
                v-model={this.searchFormData.fundAccountType}
                options={["现金", "银行"]}
                placeholder="请选择"
                id="name"
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="发生公司">
              <ht-select
                v-model={this.searchFormData.companyIds}
                options={store.allCompanies()}
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="收支类目">
              <ht-select
                v-model={this.searchFormData.fundCategoryId}
                options={this.fundCategories}
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="摘要">
              <ht-input
                v-model={this.searchFormData.description}
                name="description"
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                on-click={this.clickSearchHandler}
                loading={this.loading}
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" on-click={this.resetParams}>
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    );
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding button-group flex-container">
          <div>
            <el-button
              type="primary"
              size="mini"
              loading={this.loading}
              disabled={!this.hasBelongsPerm("create")}
              on-click={this.createHandle}
            >
              新增（F2）
            </el-button>
            <el-button
              type="primary"
              size="mini"
              loading={this.loading}
              disabled={
                !this.curSelectedRows.length ||
                !this.hasBelongsPerm(
                  "review",
                  this.curSelectedRows[0] && this.curSelectedRows[0].belongs
                )
              }
              on-click={this.reviewSelected}
            >
              复核（F9）
            </el-button>
            <el-button
              type="primary"
              size="mini"
              loading={this.loading}
              disabled={!this.totalSize || !this.hasBelongsPerm("review")}
              on-click={this.reviewSearched}
            >
              复核全部查询结果
            </el-button>
            <el-button
              type="primary"
              size="mini"
              loading={this.loading}
              disabled={!this.hasBelongsPerm("create")}
              on-click={() => this.syncTransterVisible(true)}
            >
              账户转账
            </el-button>
            <el-button
              type="primary"
              size="mini"
              loading={this.loading}
              disabled={!this.totalSize || !this.hasBelongsPerm("export")}
              on-click={this.showExportDilog}
            >
              导出（Alt+D）
            </el-button>
          </div>

          <video-popover videoUrl={videoUrl} remark={videoPopoverRemark} />
        </div>
        <div class="auto-block">{this.renderContent()}</div>
        <edit-manual-detail-box
          visible={this.showEditManualDetailBox}
          is-update={this.isUpdate}
          edit-data={this.editData}
          on-success={this.loadData}
          on={{
            "update:visible": (visible: boolean) =>
              (this.showEditManualDetailBox = visible)
          }}
        />
        <transfer-manul-box
          visible={this.showTransferManulBox}
          on={{
            "update:visible": this.syncTransterVisible
          }}
          on-success={this.loadData}
        />
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.button-group {
  margin-top: 5px;
}
.flex-container {
  &::v-deep .audit-status {
    .status-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background: $color-danger;
      vertical-align: middle;
      position: relative;
      bottom: 1px;
    }
    &.bill-audit {
      color: $color-text-secondary;
      .status-dot {
        background: $color-text-secondary;
      }
    }
    &.bill-unaudit {
      color: $color-danger;
    }
  }
}
</style>
