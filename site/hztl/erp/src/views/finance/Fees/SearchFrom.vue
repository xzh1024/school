<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import { dateFormat } from "@/utils/date";
import { BILL_STATUS, BILL_TYPES } from "./constants";
import * as store from "@/utils/store";

export interface FormData {
  dateStart?: string; // 费用查询开始日期
  dateEnd?: string; // 费用查询结束日期
  billNo?: string; // 费用单据号
  billTypes?: ("YZ" | "BX" | "YBX") | [];
  companyIds?: number[]; // 发生公司ID
  settleCompanyIds?: number[]; // 结算公司Id
  applyBys?: number[]; // 申请人（员工ID）
  auditBys?: number[]; // 审核人（员工ID）
  settleBys?: number[]; // 结算人（员工ID）
  status?: number[]; // 状态:0-待提交、1-待审核、2-审核驳回、3-待报销(预支)、4-待结算、5-部分结算、6-完成
}

const defaultSearchFormData = {
  timeRange: [dateFormat(new Date()), dateFormat(new Date())],
  billNo: "",
  billTypes: Object.keys(BILL_TYPES),
  companyIds: [],
  settleCompanyIds: [],
  applyBys: [],
  auditBys: [],
  settleBys: [],
  status: BILL_STATUS.map((item, index) => index)
};
const SystemParamsStore = namespace("admin/systemParams");

@Component
export default class Const extends Mixins(SearchMixin) {
  @Prop() readonly loading!: boolean;

  @SystemParamsStore.Getter("billQueryDefaultDateRange")
  private billQueryDefaultDateRange!: [string, string];
  @Watch("billQueryDefaultDateRange")
  private onSumQueryDefaultDateRangeChange() {
    defaultSearchFormData.timeRange = this.billQueryDefaultDateRange;
    this.searchFormData.timeRange = this.billQueryDefaultDateRange;
  }

  private searchFormData = {
    ...defaultSearchFormData
  };

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

  private resetParams() {
    this.searchFormData = {
      ...defaultSearchFormData
    };
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
            <el-form-item label="费用日期">
              <ht-date-range
                v-model={this.searchFormData.timeRange}
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="单号查询">
              <ht-input v-model={this.searchFormData.billNo} />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="单据状态">
              <ht-select
                v-model={this.searchFormData.status}
                options={BILL_STATUS}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="申请类型">
              <ht-select
                v-model={this.searchFormData.billTypes}
                options={BILL_TYPES}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="发生公司">
              <ht-select
                v-model={this.searchFormData.companyIds}
                options={store.allCompanies()}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="结算公司">
              <ht-select
                v-model={this.searchFormData.settleCompanyIds}
                options={store.allCompanies()}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="申请人" label-width="45px">
              <ht-select
                v-model={this.searchFormData.applyBys}
                options={store.allStaffs()}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="审核人" label-width="45px">
              <ht-select
                v-model={this.searchFormData.auditBys}
                options={store.allStaffs()}
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="结算人" label-width="45px">
              <ht-select
                v-model={this.searchFormData.settleBys}
                options={store.allStaffs()}
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
