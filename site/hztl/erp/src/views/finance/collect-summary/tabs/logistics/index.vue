<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import SearchDetailTable from "@/templates/search-detail-table.vue";
import { dateFormat } from "@/utils/date";
import {
  exportLgSummaryDetail,
  exportLgSummaryList,
  getLgSummaryDetail,
  getLgSummaryList
} from "@/api/finance/summary";
import { TableColumn } from "@/constants/interface";
import { FinanceSummaryData } from "@/constants/finance";
import { LOGISTICS_SUMMARY_LIST, LOGISTICS_SUMMARY_SUB } from "./constants";
import { SummaryInfo } from "../../constants";
import * as store from "@/utils/store";
import Local from "@/utils/localStorage";
import { setTableSort } from "@/utils/tool";
const SystemParamsStore = namespace("admin/systemParams");
const DATA_TYPE = ["业务日期", "结算日期"];
const curDate = new Date();
const defaultSearchFormData = {
  companyIds: [],
  logisticsIds: [],
  cooperatorIds: [],
  timeRange: [
    dateFormat(new Date().setDate(curDate.getDate() - 6)),
    dateFormat(curDate)
  ],
  dateType: 0,
  receivePayType: [],
  businessManId: null,
  settleStatus: []
};

@Component({
  name: "Logistics"
})
export default class LogisticsComponent extends Mixins(
  SearchDetailTable,
  SearchMixin
) {
  @SystemParamsStore.Getter("sumQueryDefaultDateRange")
  private sumQueryDefaultDateRange!: [string, string];
  @Watch("sumQueryDefaultDateRange")
  private onSumQueryDefaultDateRangeChange() {
    defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
    this.searchFormData.timeRange = this.sumQueryDefaultDateRange;
  }

  protected get exportName() {
    return `物流代收汇总（按物流公司汇总）-${dateFormat(curDate)}`;
  }
  protected get exportDetailName() {
    return `物流代收汇总（${this.curSelected?.cooperatorName}）-${dateFormat(
      curDate
    )}`;
  }
  protected tableName = LOGISTICS_SUMMARY_LIST.name;
  protected columns = LOGISTICS_SUMMARY_LIST.columns;
  protected detailTableName = LOGISTICS_SUMMARY_SUB.name;
  protected detailColumns = LOGISTICS_SUMMARY_SUB.columns;

  private formateDetailCloumns() {
    this.detailColumns = LOGISTICS_SUMMARY_SUB.columns.map(item => {
      const showDetail = (curData: FinanceSummaryData, e: MouseEvent) => {
        e && e.stopPropagation();
        this.showDetail(curData);
      };
      if (item.type === "controls") {
        const column: TableColumn<FinanceSummaryData> = {
          ...item,
          render: (value, row) => (
            <a
              class="ht-link text-font-primary"
              on-click={(e: MouseEvent) => showDetail(row, e)}
            >
              查看
            </a>
          )
        };
        return column;
      }
      return item;
    });
  }

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
    this.searchChange({ ...this.getSearchParams() });
  }

  protected getSearchParams() {
    const searchParams = {
      ...this.searchFormData,
      dateStart:
        this.searchFormData.timeRange && this.searchFormData.timeRange[0],
      dateEnd:
        this.searchFormData.timeRange && this.searchFormData.timeRange[1],
      timeRange: undefined
    };
    return {
      ...searchParams,
      businessType: 1,
      cooperatorType: 0
    };
  }

  protected loadData() {
    this.loading = true;
    getLgSummaryList({
      ...this.searchParams,
      page: this.page,
      sort: this.sort,
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
    return exportLgSummaryList({
      ...this.searchParams,
      columnsSettings: params
    });
  }

  protected loadDetailTable() {
    if (!this.curSelected) {
      return;
    }
    this.setSortData();
    this.detailLoading = true;
    getLgSummaryDetail({
      ...this.searchParams,
      sort: this.detailSort,
      cooperatorId: this.curSelected.cooperatorId,
      page: this.detailPage,
      pageSize: this.pageSize
    })
      .then(res => {
        this.detailTotalInfo = res.totalInfo;
        this.detailTotalSize = res.totalSize || 0;
        this.detailTableData = res.rows || [];
        this.detailLoading = false;
      })
      .catch(() => {
        this.detailLoading = false;
      });
  }

  protected detailExportHandle(params: []) {
    return exportLgSummaryDetail({
      ...this.searchParams,
      cooperatorId: this.curSelected.cooperatorId,
      columnsSettings: params
    });
  }

  protected detailTableRowOperation(curData: FinanceSummaryData) {
    this.showDetail(curData);
  }

  protected showDetail(curData: FinanceSummaryData) {
    const summaryInfo: SummaryInfo = {
      timeRange: [this.searchParams.dateStart, this.searchParams.dateEnd],
      companyIds: this.searchParams.companyIds,
      cooperatorNo: curData.cooperatorNo,
      cooperatorName: curData.cooperatorName,
      logisticsNo: this.curSelected.cooperatorNo,
      logisticsName: this.curSelected.cooperatorName
    };
    this.$emit("show-detail", summaryInfo, {
      ...this.searchParams,
      cooperatorId: curData.cooperatorId,
      logisticsId: this.curSelected.cooperatorId
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
    this.formateDetailCloumns();
  }

  protected renderSearch() {
    return (
      <el-form
        label-position="left"
        size="mini"
        label-width="80px"
        class="form-item-small-margin-bottom"
      >
        <el-row gutter={10}>
          <el-col span={7}>
            <el-form-item label-width="95px">
              <ht-select
                slot="label"
                v-model={this.searchFormData.dateType}
                options={DATA_TYPE}
                clearable={false}
                class="date-label"
                filterable
              />
              <ht-date-range v-model={this.searchFormData.timeRange} />
            </el-form-item>
            <el-form-item label="往来单位" label-width="95px">
              <ht-select
                v-model={this.searchFormData.cooperatorIds}
                attrs={{
                  "remote-method": (query: string) =>
                    this.searchLoadAllTypesCooperators(query),
                  filterable: true,
                  multiple: true,
                  "collapse-tags": true
                }}
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="结算状态">
              <ht-select
                v-model={this.searchFormData.settleStatus}
                options={["未结清", "已结清"]}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="物流公司">
              <ht-select
                v-model={this.searchFormData.logisticsIds}
                attrs={{
                  "remote-method": (query: string) =>
                    this.searchLoadAllTypesCooperators(query),
                  filterable: true,
                  multiple: true,
                  "collapse-tags": true
                }}
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="收付类型">
              <ht-select
                v-model={this.searchFormData.receivePayType}
                options={["应收", "应付"]}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="开单业务员">
              <ht-select
                v-model={this.searchFormData.businessManId}
                options={store.allStaffs()}
                filterable
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="业务公司">
              <ht-select
                v-model={this.searchFormData.companyIds}
                options={store.allCompanies()}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
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
    return this.renderContent();
  }
}
</script>
