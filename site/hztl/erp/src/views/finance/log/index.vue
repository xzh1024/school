<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchDetailTable from "@/templates/search-detail-table.vue";
import { dateFormat } from "@/utils/date";
import {
  exportLogDetail,
  exportLogList,
  loadLog,
  loadLogDetail
} from "@/api/finance/log";
import { FinanceLogDetail } from "@/constants/finance";
import { FINANCE_LOG_LIST } from "./log-list";
import { FINANCE_LOG_DETAIL } from "./log-detail";
import * as store from "@/utils/store";
import Local from "@/utils/localStorage";
import { setTableSort } from "@/utils/tool";
const DATA_TYPE = ["登记日期", "收/付款日期", "票据日期", "复核日期"];

const fundAccountTypes = [
  { id: "现金", name: "现金" },
  { id: "银行", name: "银行" },
  { id: null, name: "全部" }
];

const curDate = new Date();
const defaultSearchFormData = {
  companyIds: [],
  byCompanyIds: [],
  timeRange: [
    dateFormat(new Date().setDate(curDate.getDate() - 6)),
    dateFormat(curDate)
  ],
  dateType: 1,
  fundAccountType: "",
  isIncludeUnreview: false
};
const SystemParamsStore = namespace("admin/systemParams");

@Component({
  name: "ManulSum"
})
export default class ManulSum extends Mixins(
  SearchDetailTable,
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
    return `出纳记账汇总-${dateFormat(new Date())}`;
  }
  protected get exportDetailName() {
    return `出纳记账汇总（${this.curSelected?.companyName}-${
      this.curSelected?.fundAccountName
    }）-${dateFormat(new Date())}`;
  }
  protected tableName = FINANCE_LOG_LIST.name;
  protected columns = FINANCE_LOG_LIST.columns;
  protected detailTableName = FINANCE_LOG_DETAIL.name;
  protected detailColumns = FINANCE_LOG_DETAIL.columns;

  protected searchFormData = {
    ...defaultSearchFormData
  };

  protected resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultSearchFormData
    };
  }

  protected clickSearchHandler(e: MouseEvent) {
    e.stopPropagation();
    this.searchChange({
      ...this.getSearchParams()
    });
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
    loadLog({
      ...this.searchParams,
      sort: this.sort,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(res => {
        this.curSelected = null;
        this.totalInfo = res.totalInfo;
        this.tableData = res.rows || [];
        this.totalSize = res.totalSize || 0;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
  protected exportHandle(params: []) {
    return exportLogList({
      ...this.searchParams,
      columnsSettings: params
    });
  }

  protected loadDetailTable() {
    if (!this.curSelected) {
      return;
    }
    this.detailLoading = true;
    loadLogDetail({
      ...this.searchParams,
      sort: this.detailSort,
      byCompanyId: this.curSelected.byCompanyId,
      fundAccountId: this.curSelected.fundAccountId,
      page: this.detailPage,
      pageSize: this.pageSize
    })
      .then(res => {
        this.detailTotalInfo = res.totalInfo;
        this.detailTotalSize = res.totalSize || 0;
        this.detailTableData =
          [
            {
              digest: "上期结余",
              balance: this.detailTotalInfo.previousBalance
            },
            ...res.rows
          ] || [];
        this.detailLoading = false;
      })
      .catch(() => {
        this.detailLoading = false;
      });
  }

  private formatDetailIndex(index: number, row: FinanceLogDetail) {
    if (row.digest === "上期结余") {
      return "";
    }
    return (this.detailPage - 1) * this.pageSize + index;
  }

  protected detailExportHandle(params: []) {
    return exportLogDetail({
      ...this.searchParams,
      byCompanyId: this.curSelected.byCompanyId,
      fundAccountId: this.curSelected.fundAccountId,
      columnsSettings: params
    });
  }
  private setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
    if (storage.defaultSort && storage.defaultSort[this.detailTableName]) {
      this.detailSort = setTableSort(storage.defaultSort[this.detailTableName]);
    }
  }
  mounted() {
    this.setSortData();
    defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
    this.resetParams();
    this.searchChange({
      ...this.getSearchParams()
    });
  }
  protected detailSort = "";
  private handleDetailSort(column: any) {
    this.detailPage = 1;
    this.detailSort = setTableSort(column);
    if (this.detailTableData?.length) {
      this.loadDetailTable();
    }
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
        onSort-change={this.handleDetailSort}
        formatIndex={this.formatDetailIndex}
        on={{
          "update:exportTableVisible": this.syncDetailExportVisible
        }}
        on-rowOperation={this.detailTableRowOperation}
        show-summary
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                !this.hasBelongsPerm("export", this.curSelected.belongs)
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

  protected renderSearch() {
    return (
      <el-form
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row gutter={5}>
          <el-col span={7}>
            <el-form-item label-width="105px">
              <ht-select
                slot="label"
                v-model={this.searchFormData.dateType}
                options={DATA_TYPE}
                clearable={false}
                class="date-label"
                filterable
              />
              <ht-date-range
                v-model={this.searchFormData.timeRange}
                shortcuts-type="all"
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="记账公司" label-width="80px">
              <ht-select
                v-model={this.searchFormData.byCompanyIds}
                options={store.allCompanies()}
                attrs={{
                  filterable: true,
                  multiple: true,
                  "has-selecte-all-val": true,
                  "collapse-tags": true
                }}
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="账户类型" label-width="75px">
              <ht-select
                v-model={this.searchFormData.fundAccountType}
                options={fundAccountTypes}
              />
            </el-form-item>
          </el-col>
          <el-col span={2}>
            <el-form-item label="含未复核" label-width="75px">
              <el-switch v-model={this.searchFormData.isIncludeUnreview} />
            </el-form-item>
          </el-col>
          <el-col span={5}>
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
    return this.renderContent();
  }
}
</script>
