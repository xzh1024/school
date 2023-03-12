<script lang="tsx">
import { Component, Mixins, Prop } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import * as store from "@/utils/store";

const DATE_TYPES = [
  { id: "createdAt", name: "申请日期" },
  { id: "planDate", name: "完成时间" }
];

@Component({ name: "AuditSearch" })
export default class AuditSearch extends Mixins(SearchMixin) {
  @Prop() protected searchForm!: any;
  @Prop() readonly type!: number;
  @Prop() readonly loading!: boolean;

  private handleSearch() {
    console.log("搜索");
  }
  private handleReset() {
    console.log("重置");
  }

  private statuses = [];
  private createdBys = [];

  get isAuditQuery(): boolean {
    return this.type === 3;
  }

  render() {
    return (
      <el-form
        label-position="left"
        size="mini"
        label-width="88px"
        class="form-item-small-margin-bottom"
      >
        <el-row gutter={10}>
          <el-col span={6}>
            <el-form-item label="申请日期">
              {this.isAuditQuery ? (
                <ht-select
                  slot="label"
                  v-model={this.searchForm.dateQueryType}
                  options={DATE_TYPES}
                  clearable={false}
                  class="date-label"
                />
              ) : (
                ""
              )}

              <ht-date-range
                v-model={this.searchForm.timeRange}
                shortcuts-type="all"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="审批单号">
              <ht-input v-model={this.searchForm.billNo} placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="发起人分公司">
              <ht-select
                v-model={this.searchForm.createdByCompanyIds}
                options={store.allCompanies()}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="业务分公司">
              <ht-select
                v-model={this.searchForm.relatedCompanyIds}
                options={store.allCompanies()}
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="审批发起人" label-width="74px">
              <ht-select
                v-model={this.searchForm.statuses}
                options={this.statuses}
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
              />
            </el-form-item>
            <el-form-item label="审批类型" label-width="74px">
              <ht-autoselect
                v-model={this.searchForm.createdBy}
                options={this.createdBys}
                trigger-on-focus={false}
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                onClick={this.handleSearch}
                loading={this.loading}
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" onClick={this.handleReset}>
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
