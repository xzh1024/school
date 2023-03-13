<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import AuditTable from "../components/auditTable.vue";
import AuditInfo from "../components/auditInfo.vue";
import { QUERY_TYPE, BILL_TYPES } from "../constant";
import {
  FeeApplicationQueryParams,
  FeeApplicationModel
} from "../constant/interfaces";
import { namespace } from "vuex-class";
import * as store from "@/utils/store";

const SystemParamsStore = namespace("admin/systemParams");

const defaultSearchForm: FeeApplicationQueryParams = {
  type: QUERY_TYPE.toProcess,
  timeRange: [],
  dateType: "apply",
  billNo: "",
  createdByCompanyIds: [],
  companyIds: [],
  billTypes: BILL_TYPES.map(item => item.id),
  applicantId: null
};

@Component({
  name: "OaToProcess",
  components: {
    AuditTable,
    AuditInfo
  }
})
export default class OaToProcess extends Mixins(SearchMixin) {
  @SystemParamsStore.Getter("billQueryDefaultDateRange")
  private billQueryDefaultDateRange!: [string, string];
  @Watch("billQueryDefaultDateRange", { immediate: true, deep: true })
  private onBillQueryDefaultDateRange(val: [string, string]) {
    defaultSearchForm.timeRange = val;
    this.searchForm.timeRange = val;
  }

  get auditTable(): AuditTable {
    return this.$refs.auditTable as AuditTable;
  }

  protected type = QUERY_TYPE.toProcess;
  protected searchForm = { ...defaultSearchForm };

  private handleSearch() {
    this.auditTable.refreshData();
  }

  private handleReset() {
    this.searchForm = { ...defaultSearchForm };
  }

  protected rowData = {};
  protected updateRowData(data: FeeApplicationModel) {
    this.rowData = data;
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          <el-form
            label-position="left"
            size="mini"
            label-width="60px"
            class="form-item-small-margin-bottom"
          >
            <el-row gutter={20}>
              <el-col span={6}>
                <el-form-item label="申请日期">
                  <ht-date-range
                    v-model={this.searchForm.timeRange}
                    shortcuts-type="all"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
                <el-form-item label="审批单号">
                  <ht-input
                    v-model={this.searchForm.billNo}
                    placeholder="请输入"
                    clearable={true}
                  />
                </el-form-item>
              </el-col>
              <el-col span={7}>
                <el-form-item label="发起人分公司" label-width="88px">
                  <ht-select
                    v-model={this.searchForm.createdByCompanyIds}
                    options={store.allCompanies()}
                    filterable
                    multiple
                    has-selecte-all-val
                    collapse-tags
                  />
                </el-form-item>
                <el-form-item label="业务分公司" label-width="88px">
                  <ht-select
                    v-model={this.searchForm.companyIds}
                    options={store.allCompanies()}
                    filterable
                    multiple
                    has-selecte-all-val
                    collapse-tags
                  />
                </el-form-item>
              </el-col>
              <el-col span={6}>
                <el-form-item label="发起人">
                  <ht-autoselect
                    v-model={this.searchForm.applicantId}
                    options={store.allStaffs()}
                    trigger-on-focus={false}
                    clearable
                    filterZero
                    highlight-first-item
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item label="审批类型">
                  <ht-select
                    v-model={this.searchForm.billTypes}
                    options={BILL_TYPES}
                    clearable
                    collapse-tags
                    filterable
                    multiple
                    has-selecte-all-val
                  />
                </el-form-item>
              </el-col>
              <el-col span={5}>
                <el-form-item class="placeholder-form-item">
                  <br class="placeholder-form-item" />
                </el-form-item>
                <div style="text-align: right;">
                  <el-button
                    type="primary"
                    size="mini"
                    onClick={this.handleSearch}
                  >
                    查询（F5）
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    onClick={this.handleReset}
                  >
                    重置（F6）
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="auto-block flex-block-bg flex-block-margin">
          <ht-resize-columns
            directionContrary
            defaultLen={420}
            scopedSlots={{
              block1: () => (
                <audit-table
                  ref="auditTable"
                  type={this.type}
                  searchForm={this.searchForm}
                  onUpdateRowData={this.updateRowData}
                />
              ),
              block2: () => (
                <audit-info
                  type={this.type}
                  rowData={this.rowData}
                  onUpdate={this.handleSearch}
                />
              )
            }}
          />
        </div>
      </div>
    );
  }
}
</script>
