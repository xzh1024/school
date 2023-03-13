<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import { PRINT_STATUS } from "@/constants";
import { TRANSFER_BILL_STATUS, TRANSFER_BILL_STATUS_TEXT } from "./constants";
import { TransferListFormData } from "../../interface";
import * as store from "@/utils/store";

const SystemParamsStore = namespace("admin/systemParams");
const defaultSearchFormData: TransferListFormData = {
  timeRange: [],
  billNo: "",
  relatedCompanyIds: [],
  statuses: Object.values(TRANSFER_BILL_STATUS),
  businessManId: undefined,
  createdBy: undefined,
  printStatuses: [0, 1]
};

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
  private searchFormData: TransferListFormData = { ...defaultSearchFormData };

  protected searchChange(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("searchChange", { ...this.getSearchParams() });
  }
  protected getSearchParams() {
    const searchParams = {
      ...this.searchFormData,
      dateStart:
        this.searchFormData.timeRange?.length &&
        this.searchFormData.timeRange[0],
      dateEnd:
        this.searchFormData.timeRange?.length &&
        this.searchFormData.timeRange[1],
      businessManIds: this.searchFormData.businessManId
        ? [this.searchFormData.businessManId]
        : [],
      createdBys: this.searchFormData.createdBy
        ? [this.searchFormData.createdBy]
        : [],
      printStatus:
        this.searchFormData.printStatuses?.length === 1
          ? this.searchFormData.printStatuses[0]
          : undefined
    };
    searchParams.timeRange = undefined;
    return { ...searchParams };
  }

  private resetForm(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultSearchFormData
    };
  }

  mounted() {
    defaultSearchFormData.timeRange = this.billQueryDefaultDateRange;
    this.resetForm();
    this.searchChange();
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
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="单据号">
              <ht-input
                v-model={this.searchFormData.billNo}
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="调入分公司" label-width="73px">
              <ht-select
                v-model={this.searchFormData.relatedCompanyIds}
                options={store.allCompanies()}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="单据状态" label-width="73px">
              <ht-select
                v-model={this.searchFormData.statuses}
                options={TRANSFER_BILL_STATUS_TEXT}
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="业务员" label-width="45px">
              <ht-autoselect
                v-model={this.searchFormData.businessManId}
                options={store.myStaffs()}
                trigger-on-focus={false}
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="制单人" label-width="45px">
              <ht-autoselect
                v-model={this.searchFormData.createdBy}
                options={store.allStaffs()}
                trigger-on-focus={false}
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="打印状态">
              <ht-select
                v-model={this.searchFormData.printStatuses}
                options={PRINT_STATUS}
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                onClick={this.searchChange}
                loading={this.loading}
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" onClick={this.resetForm}>
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
