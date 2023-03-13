<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import { TRANSFER_BILL_STATUS, TRANSFER_BILL_STATUS_TEXT } from "./constants";
import * as store from "@/utils/store";

export interface FormData {
  timeRange?: [string, string];
  dateStart?: string;
  dateEnd?: string;
  billNo?: string;
  relatedCompanyIds?: number[];
  businessManIds?: number[];
  billTypes?: ("YZ" | "BX" | "YBX") | [];
  companyIds?: number[];
  createdBys?: number[];
  printStatus?: number;
  statuses?: string[];
}
const defaultSearchFormData: FormData = {
  timeRange: undefined,
  billNo: "",
  relatedCompanyIds: [],
  createdBys: [],
  businessManIds: [],
  printStatus: undefined,
  statuses: Object.values(TRANSFER_BILL_STATUS)
};
const SystemParamsStore = namespace("admin/systemParams");

@Component
export default class SearchFrom extends Mixins(SearchMixin) {
  @SystemParamsStore.Getter("billQueryDefaultDateRange")
  private billQueryDefaultDateRange!: [string, string];
  @Watch("billQueryDefaultDateRange")
  private onBillQueryDefaultDateRangeChange() {
    defaultSearchFormData.timeRange = this.billQueryDefaultDateRange;
    this.searchFormData.timeRange = this.billQueryDefaultDateRange;
  }

  @Prop() readonly loading!: boolean;
  private searchFormData = {
    ...defaultSearchFormData
  };
  private printStatus = [
    {
      id: 0,
      name: "已打印"
    },
    {
      id: 1,
      name: "未打印"
    }
  ];
  protected searchData(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("searchChange", { ...this.getSearchParams() });
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
      ...searchParams
    };
  }
  private resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultSearchFormData
    };
    this.searchData();
  }

  mounted() {
    defaultSearchFormData.timeRange = this.billQueryDefaultDateRange;
    this.resetParams();
    this.searchData();
  }

  render() {
    return (
      <el-form
        label-position="left"
        size="mini"
        label-width="60px"
        class="form-item-small-margin-bottom"
      >
        <el-row gutter={10}>
          <el-col span={6}>
            <el-form-item label="单据日期">
              <ht-date-range
                v-model={this.searchFormData.timeRange}
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="单据号">
              <ht-input v-model={this.searchFormData.billNo} />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="调出分公司" label-width="73px">
              <ht-select
                v-model={this.searchFormData.relatedCompanyIds}
                options={store.allCompanies()}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="单据状态" label-width="73px">
              <ht-select
                v-model={this.searchFormData.statuses}
                options={TRANSFER_BILL_STATUS_TEXT}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="业务员" label-width="45px">
              <ht-select
                v-model={this.searchFormData.businessManIds}
                options={store.myStaffs()}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="制单人" label-width="45px">
              <ht-select
                v-model={this.searchFormData.createdBys}
                options={store.allStaffs()}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="打印状态">
              <ht-select
                v-model={this.searchFormData.printStatus}
                options={this.printStatus}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                on-click={this.searchData}
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
}
</script>
