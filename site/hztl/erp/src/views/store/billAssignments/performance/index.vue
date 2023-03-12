<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchDetailTable from "./templates/search-detail-table.vue";
import { dateFormat } from "@/utils/date";
import { SUMMARY_DETAIL, SUMMARY_LIST } from "./constants";
import performanceService from "./services/performanceService";
import {
  SummaryModel,
  SummaryDetailModel,
  SelectSearchModel,
  PersonModel,
  WarehousesUsersModle,
  ExportDataModel
} from "./interface";
import {
  OUT_OR_IN_TYPE,
  BILL_STATUS,
  SOURCE_BILL_TYPES
} from "./interface/enum";
import { IN_INFO, OUT_INFO } from "./interface/constants";
import { namespace } from "vuex-class";
import * as store from "@/utils/store";

const SystemParamsStore = namespace("admin/systemParams");
const DATA_TYPE = ["出/入库日期", "业务日期"];
const curDate = new Date();
const defaultSearchFormData = {
  dateType: 0, // 日期类型：0-出入库日期，1-业务日期
  dateStart: "",
  dateEnd: "",
  timeRange: ["", ""],
  staffs: [],
  storageCompanyIds: [],
  billType: [],
  status: Object.keys(BILL_STATUS).map(item => Number(item)),
  billNo: "", // 单据号：出入库单号/来源业务单号
  warehouseIds: [],
  companyIds: [],
  sourceBillTypes: [],
  page: 0,
  pageSize: 0
};

@Component({
  name: "Performance"
})
export default class Performance extends Mixins(
  SearchDetailTable,
  SearchMixin,
  HotkeyMixin
) {
  protected tableName = SUMMARY_LIST.name;
  protected columns = SUMMARY_LIST.columns;
  protected detailTableName = SUMMARY_DETAIL.name;
  protected detailColumns = SUMMARY_DETAIL.columns;
  protected curSelected: SummaryModel | null = null;
  protected inInfo = IN_INFO;
  protected outInfo = OUT_INFO;

  @SystemParamsStore.Getter("sumQueryDefaultDateRange")
  protected sumQueryDefaultDateRange!: [string, string];
  @Watch("sumQueryDefaultDateRange")
  private onSumQueryDefaultDateRangeChange() {
    defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
    this.searchFormData.timeRange = this.sumQueryDefaultDateRange;
  }

  protected get exportName() {
    return `人员绩效查询汇总-${dateFormat(curDate)}`;
  }
  protected get exportDetailName() {
    return `人员绩效查询明细-${dateFormat(curDate)}`;
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
    this.searchChange({
      ...this.getSearchParams()
    });
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
      businessType: 0
    };
  }

  protected loadData() {
    if (
      !this.hasAutoPerm("performance.our.read") &&
      !this.hasAutoPerm("performance.rests.read")
    )
      return;
    this.loading = true;
    performanceService
      .getSummaryList({
        ...this.searchParams,
        page: this.page,
        pageSize: this.pageSize
      })
      .then(res => {
        const tableData = res.rows || [];
        tableData.forEach((item: SummaryModel) => {
          item.belongs =
            this.hasAutoPerm("performance.our.export") ||
            this.hasAutoPerm("performance.rests.export");
        });
        this.tableData = tableData;
        if (this.tableData.length) {
          this.curSelected = this.tableData[0];
        }
        this.totalInfo = res.totalInfo || {};
        this.totalSize = res.totalSize || 0;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  protected exportHandle(params: []) {
    let list: ExportDataModel[] = [];
    params.forEach((item: ExportDataModel) => {
      if (item.prop === "inInfo") {
        list = list.concat(this.inInfo);
      } else if (item.prop === "outInfo") {
        list = list.concat(this.outInfo);
      } else {
        list.push(item);
      }
    });
    return performanceService.exportSummaryList({
      ...this.searchParams,
      columnsSettings: list
    });
  }

  protected loadDetailTable() {
    if (!this.curSelected) {
      return;
    }
    this.detailLoading = true;
    performanceService
      .getSummaryDetail({
        ...this.searchParams,
        companyId: this.curSelected.companyId,
        staffId: this.curSelected.staffId,
        page: this.detailPage,
        pageSize: this.pageSize
      })
      .then(res => {
        this.detailTotalInfo = res.totalInfo;
        this.detailTotalSize = res.totalSize || 0;
        const detailTableData = res.rows || [];
        detailTableData.forEach((item: SummaryDetailModel) => {
          item.belongs =
            this.hasAutoPerm("performance.our.export") ||
            this.hasAutoPerm("performance.rests.export");
        });
        this.detailTableData = detailTableData;
        this.detailLoading = false;
      })
      .catch(() => {
        this.detailLoading = false;
      });
  }

  protected detailExportHandle(params: []) {
    return performanceService.exportSummaryDetail({
      ...this.searchParams,
      companyId: this.curSelected?.companyId,
      staffId: this.curSelected?.staffId,
      columnsSettings: params
    });
  }

  private storageCompanyOptions: PersonModel[] = [];
  private warehouseOptions: PersonModel[] = [];
  private storageUserOptions: PersonModel[] = [];
  private async getStorageCompany(query = "") {
    const params: SelectSearchModel = { name: query };
    performanceService.getStorageCompany(params).then((res: PersonModel[]) => {
      this.storageCompanyOptions = res || [];
    });
  }
  private async getWarehouses(query = "") {
    const params: SelectSearchModel = { name: query };
    performanceService.getWarehouses(params).then((res: PersonModel[]) => {
      this.warehouseOptions = res || [];
    });
  }
  private async getStorageUsers() {
    const params: WarehousesUsersModle = {
      name: "",
      roleCodes: ["warehousePartManager"]
    };
    performanceService.getWarehousesUsers(params).then((res: PersonModel[]) => {
      this.storageUserOptions = res || [];
    });
  }

  created() {
    if (
      this.hasAutoPerm("performance.our.read") ||
      this.hasAutoPerm("performance.rests.read")
    ) {
      this.getStorageCompany();
      this.getWarehouses();
      this.getStorageUsers();
    }
  }

  mounted() {
    defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
    this.resetParams();
    this.searchChange({
      ...this.getSearchParams()
    });
  }

  protected renderSearch() {
    return (
      <el-form
        label-position="left"
        size="mini"
        label-width="60px"
        class="form-item-small-margin-bottom"
      >
        <el-row gutter={10}>
          <el-col span={5}>
            <el-form-item label-width="98px">
              <ht-select
                slot="label"
                v-model={this.searchFormData.dateType}
                options={DATA_TYPE}
                clearable={false}
                class="date-label"
              />
              <ht-date-range
                v-model={this.searchFormData.timeRange}
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="单据号" label-width="98px">
              <ht-input v-model={this.searchFormData.billNo} clearable />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="仓储人员">
              <ht-select
                v-model={this.searchFormData.staffs}
                options={this.storageUserOptions}
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="仓库">
              <ht-select
                v-model={this.searchFormData.warehouseIds}
                options={this.warehouseOptions}
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="仓储公司">
              <ht-select
                v-model={this.searchFormData.storageCompanyIds}
                options={this.storageCompanyOptions}
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="业务公司">
              <ht-select
                v-model={this.searchFormData.companyIds}
                options={store.allCompanies()}
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="出入库类型" label-width="95px">
              <ht-select
                v-model={this.searchFormData.billType}
                options={OUT_OR_IN_TYPE}
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="业务单据类型" label-width="95px">
              <ht-select
                v-model={this.searchFormData.sourceBillTypes}
                options={SOURCE_BILL_TYPES}
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="单据状态">
              <ht-select
                v-model={this.searchFormData.status}
                options={BILL_STATUS}
                clearable
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
