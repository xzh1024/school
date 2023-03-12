<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchMixin from "@/mixins/searchMixin";
import { QTY_LIMIT_OPS } from "@/constants";
import { TRANSFER_BILL_STATUS, TRANSFER_BILL_STATUS_TEXT } from "./constants";
import { TransferListFormData } from "../../interface";
import * as store from "@/utils/store";

export interface FormData
  extends Partial<
    Pick<
      TransferListFormData,
      | "dateQueryType"
      | "timeRange"
      | "billNo"
      | "relatedCompanyIds"
      | "statuses"
      | "businessManId"
      | "createdBy"
    >
  > {
  companyIds?: number[]; // 业务公司ID
  key?: string; // 过滤指标,目前仅申请单列表使用 申请数量:qty 待转调拨出库数量:onTransQty 已出库数量:outQty 待出库数量:waitOutQty 待交货数量:waitDeliverQty
  op?: string; // 过滤符号,目前仅申请单列表使用
  value?: number; // 过滤数值,目前仅申请单列表使用
}

const SystemParamsStore = namespace("admin/systemParams");
const DATE_TYPES = [
  { id: "createdAt", name: "申请日期" },
  { id: "planDate", name: "预期到货日期" }
];
const QTY_LIMIT_TYPES = [
  { id: "qty", name: "申请数量" },
  { id: "onTransQty", name: "待转调拨出库数量" },
  { id: "outQty", name: "已出库数量" },
  { id: "waitOutQty", name: "待出库数量" },
  { id: "waitDeliverQty", name: "待交货数量" }
];
const defaultSearchFormData: FormData = {
  dateQueryType: "createdAt",
  timeRange: [],
  billNo: "",
  companyIds: [],
  relatedCompanyIds: [],
  statuses: Object.values(TRANSFER_BILL_STATUS),
  businessManId: undefined,
  createdBy: undefined,
  key: "onTransQty",
  op: ">",
  value: undefined
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
  private searchFormData: FormData = { ...defaultSearchFormData };

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
        : []
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
            <el-form-item label="单据日期" label-width="105px">
              <ht-select
                slot="label"
                v-model={this.searchFormData.dateQueryType}
                options={DATE_TYPES}
                clearable={false}
                class="date-label"
              />
              <ht-date-range
                v-model={this.searchFormData.timeRange}
                shortcuts-type="all"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="单据号" label-width="105px">
              <ht-input
                v-model={this.searchFormData.billNo}
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="调入分公司" label-width="73px">
              <ht-select
                v-model={this.searchFormData.companyIds}
                options={store.allCompanies()}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="调出分公司" label-width="73px">
              <ht-select
                v-model={this.searchFormData.relatedCompanyIds}
                options={store.allCompanies()}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="单据状态">
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
            <el-form-item label="制单人">
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
            <el-form-item label="请调人" label-width="45px">
              <ht-autoselect
                v-model={this.searchFormData.businessManId}
                options={store.myStaffs()}
                trigger-on-focus={false}
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label-width="133px">
              <ht-select
                slot="label"
                v-model={this.searchFormData.key}
                options={QTY_LIMIT_TYPES}
                clearable={false}
                class="date-label"
              />
              <ht-input
                v-model={this.searchFormData.value}
                placeholder="数量"
                type="number"
              >
                <ht-select
                  slot="prepend"
                  v-model={this.searchFormData.op}
                  clearable={false}
                  options={QTY_LIMIT_OPS}
                  style="width: 75px;"
                />
              </ht-input>
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
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
