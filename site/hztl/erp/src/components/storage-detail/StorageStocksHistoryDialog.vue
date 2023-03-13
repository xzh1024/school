<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { pick } from "lodash";
import SearchMixin from "@/mixins/searchMixin";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { BILL_TYPE } from "@/constants";
import { STORAGE_STOCKS_HISTORY } from "./constants";
import { fetchStocksHistoryList, StockFilter } from "./services";
import * as store from "@/utils/store";

const SystemParamsStore = namespace("admin/systemParams");

interface SearchForm {
  billTypes: string[];
  timeRange?: [string, string];
}
const defaultSearchFormData: SearchForm = {
  timeRange: undefined,
  billTypes: []
};

@Component
export default class StorageStocksHistoryDialog extends Mixins(
  SearchMixin,
  PaginationDataMixin
) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly stockFilter!: StockFilter;

  @SystemParamsStore.Getter("sumQueryDefaultDateRange")
  private sumQueryDefaultDateRange!: [string, string];
  @Watch("sumQueryDefaultDateRange")
  private onSumQueryDefaultDateRangeChange() {
    defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
    this.searchFormData.timeRange = this.sumQueryDefaultDateRange;
  }

  private searchFormData = {
    ...defaultSearchFormData
  };

  private get BILL_TYPES() {
    const extend = store.isYx()
      ? {
          LL: "维修领料单",
          TL: "维修退料单"
        }
      : {};
    return {
      ...pick(
        BILL_TYPE,
        "KD",
        "RD",
        "KT",
        "RT",
        "CG",
        "CT",
        "XS",
        "XT",
        "JJ",
        "YC",
        "PD"
      ),
      ...extend
    };
  }

  @Watch("visible")
  public onVisibleChange() {
    if (this.visible) {
      defaultSearchFormData.timeRange = this.sumQueryDefaultDateRange;
      this.resetParams();
      this.pageChange(1);
    }
  }

  protected searchData(e?: MouseEvent) {
    e?.stopPropagation();
    this.pageChange(1);
  }

  private getSearchParams() {
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
    return fetchStocksHistoryList({
      ...this.stockFilter,
      ...this.getSearchParams(),
      page: this.page,
      pageSize: this.pageSize
    });
  }

  private resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultSearchFormData
    };
  }

  private closeDialog() {
    this.$emit("close");
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="库存变动历史"
        width="1000px"
      >
        <div>
          <el-form
            label-position="left"
            size="mini"
            label-width="80px"
            class="form-item-small-margin-bottom"
          >
            <el-row gutter={10}>
              <el-col span={10}>
                <el-form-item label="单据日期">
                  <ht-date-range
                    v-model={this.searchFormData.timeRange}
                    shortcuts-type="all"
                  />
                </el-form-item>
              </el-col>
              <el-col span={7}>
                <el-form-item label="单据类型">
                  <ht-select
                    v-model={this.searchFormData.billTypes}
                    options={this.BILL_TYPES}
                    filterable
                    multiple
                    collapse-tags
                  />
                </el-form-item>
              </el-col>
              <el-col span={7}>
                <div style="text-align: right;">
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={this.searchData}
                    loading={this.loading}
                  >
                    查询（F5）
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={this.resetParams}
                  >
                    重置（F6）
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

          <ht-setting-table
            table-name={STORAGE_STOCKS_HISTORY.name}
            columns={STORAGE_STOCKS_HISTORY.columns}
            pagination
            autofocus
            current-page={this.page}
            height="400px"
            total={this.totalSize}
            data={this.tableData}
            loading={this.loading}
            onPageChange={this.pageChange}
          />
        </div>
      </ht-dialog>
    );
  }
}
</script>
