<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import { FormData, MergeLogListFilters } from "./constants";
import * as store from "@/utils/store";

const SystemParamsStore = namespace("admin/systemParams");

export const defaultFormData: FormData = {
  timeRange: [],
  name: "",
  createdBy: []
};

@Component
export default class SearchForm extends Mixins(SearchMixin) {
  @SystemParamsStore.Getter("sumQueryDefaultDateRange")
  private sumQueryDefaultDateRange!: [string, string];
  @Watch("sumQueryDefaultDateRange")
  private onBillQueryDefaultDateRangeChange() {
    defaultFormData.timeRange = this.sumQueryDefaultDateRange;
    this.formData.timeRange = this.sumQueryDefaultDateRange;
  }

  private formData = { ...defaultFormData };

  public searchHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("searchChange", { ...this.getParams() });
  }

  protected getParams() {
    const params: MergeLogListFilters = {
      ...this.formData,
      startDate: this.formData.timeRange?.length
        ? this.formData.timeRange[0]
        : "",
      endDate: this.formData.timeRange?.length ? this.formData.timeRange[1] : ""
    };
    return { ...params, timeRange: undefined };
  }

  public resetHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.formData = { ...defaultFormData };
  }

  mounted() {
    defaultFormData.timeRange = this.sumQueryDefaultDateRange;
    this.resetHandle();
    this.searchHandle();
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
            <el-form-item label="合并日期">
              <ht-date-range
                v-model={this.formData.timeRange}
                shortcuts-type="all"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="单位名称">
              <ht-input v-model={this.formData.name} placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="合并人" label-width="45px">
              <ht-select
                v-model={this.formData.createdBy}
                options={store.allStaffs()}
                filterZero
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label-width="0">
              <el-button type="primary" size="mini" onClick={this.searchHandle}>
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" onClick={this.resetHandle}>
                重置（F6）
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    );
  }
}
</script>
