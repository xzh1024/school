<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import { dateFormat } from "@/utils/date";
import {
  BUSINESS_TYPE,
  DATE_TYPES,
  PAYMENT_TYPE,
  REVIEW_STATUS,
  SearchFormData
} from "./constants";

const defaultFormData = {
  dateType: 1,
  timeRange: [dateFormat(new Date()), dateFormat(new Date())],
  billNo: "",
  cooperatorId: undefined,
  paymentTypes: [0, 1],
  statuses: [1],
  businessType: BUSINESS_TYPE.map(item => item.id),
  description: ""
};
const SystemParamsStore = namespace("admin/systemParams");

@Component
export default class SearchForm extends Mixins(SearchMixin) {
  @SystemParamsStore.Getter("sumQueryDefaultDateRange")
  private sumQueryDefaultDateRange!: [string, string];
  @Watch("sumQueryDefaultDateRange")
  private onSumQueryDefaultDateRangeChange() {
    defaultFormData.timeRange = this.sumQueryDefaultDateRange;
    this.formData.timeRange = this.sumQueryDefaultDateRange;
  }

  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;

  private formData: SearchFormData = { ...defaultFormData };

  @Watch("visible", { immediate: true })
  onVisibleChange(val: boolean) {
    if (!val) {
      return;
    }
    this.resetHandle();
    this.searchHandle();
  }

  public searchHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("search", this.getSearchParams());
  }
  public resetHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.formData = { ...defaultFormData };
  }

  private getSearchParams() {
    const searchParams = {
      ...this.formData,
      fromDate: this.formData.timeRange && this.formData.timeRange[0],
      toDate: this.formData.timeRange && this.formData.timeRange[1],
      timeRange: undefined
    };
    return searchParams;
  }

  mounted() {
    defaultFormData.timeRange = this.sumQueryDefaultDateRange;
    this.resetHandle();
  }

  render() {
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
                v-model={this.formData.dateType}
                options={DATE_TYPES}
                clearable={false}
                class="date-label"
              />
              <ht-date-range
                v-model={this.formData.timeRange}
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="单号查询" label-width="100px">
              <ht-input v-model={this.formData.billNo} />
            </el-form-item>
            <el-form-item
              prop="cooperatorId"
              label="往来单位"
              label-width="100px"
            >
              <ht-autoselect
                v-model={this.formData.cooperatorId}
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
          <el-col span={6}>
            <el-form-item label="收支类型">
              <ht-select
                v-model={this.formData.paymentTypes}
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
                v-model={this.formData.statuses}
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
                v-model={this.formData.businessType}
                options={BUSINESS_TYPE}
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="摘要" label-width="35px">
              <ht-input
                v-model={this.formData.description}
                name="description"
              />
            </el-form-item>
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                onClick={this.searchHandle}
                loading={this.loading}
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" onClick={this.resetHandle}>
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
