<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import SearchTable from "@/templates/search-table.vue";
import {
  SummaryListParams,
  exportLgSummaryDetail3,
  getLgSummaryDetail3
} from "@/api/finance/summary";
import { dateFormat } from "@/utils/date";
import { FinanceSummaryDetail } from "@/constants/finance";
import { COLLECT_SUMMARY_DETAIL } from "./collect-detail";
import { SummaryInfo } from "../constants";
import * as store from "@/utils/store";

function formateDateRange(dateRange: string[]) {
  if (!dateRange || !dateRange.length) {
    return "";
  }
  const date = [...dateRange];
  if (!date[0]) {
    date[0] = dateFormat(new Date(0));
  }
  if (!date[1]) {
    date[1] = dateFormat(new Date());
  }
  return date.join("-");
}

@Component({
  name: "CollectDetail"
})
export default class CollectDetail extends Mixins(SearchTable, SearchMixin) {
  @Prop() protected params!: SummaryListParams;
  @Prop() protected summaryInfo!: SummaryInfo;
  @Prop() protected visible!: boolean;

  protected get exportName() {
    return `往来业务明细-${dateFormat(new Date())}`;
  }
  protected tableName = COLLECT_SUMMARY_DETAIL.name;
  protected columns = COLLECT_SUMMARY_DETAIL.columns;
  protected tableData: FinanceSummaryDetail[] = [];

  @Watch("visible")
  protected onVisibleChange(newVal: boolean) {
    if (newVal && this.params) {
      this.pageChange(1);
    }
  }
  protected loadData() {
    this.loading = true;
    getLgSummaryDetail3({
      ...this.params,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(res => {
        this.tableData = res.rows || [];
        this.totalSize = res.totalSize;
        this.totalInfo = res.totalInfo;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  protected updateVisible(value: boolean) {
    this.$emit("visibleUpdate", value);
  }

  protected exportHandle(params: []) {
    return exportLgSummaryDetail3({
      ...this.params,
      columnsSettings: params
    });
  }

  private formateCompanies(ids: number[]) {
    if (!ids || !ids.length || ids.length === store.allCompanies().length) {
      return "全部";
    } else {
      return ids
        .map(id => {
          const cur = store.allCompanies().find(item => item.id === id);
          return cur && cur.name;
        })
        .toString();
    }
  }

  render() {
    return (
      <ht-dialog
        title="往来业务明细"
        visible={this.visible}
        on={{ "update:visible": this.updateVisible }}
        width="1200px"
      >
        <div class="flex-container" style={{ height: "400px" }}>
          <div class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding">
            <div class="ht-page-title page-title-divider">物流代收信息</div>
            <el-form
              size="mini"
              label-position="left"
              label-width="140px"
              class="search-box compact-form auto-block ignore-hotkeys"
            >
              <el-form-item label="业务公司">
                <span
                  title={this.formateCompanies(this.summaryInfo?.companyIds)}
                  class="form-value"
                >
                  {this.formateCompanies(this.summaryInfo?.companyIds)}
                </span>
              </el-form-item>
              <el-form-item label="业务日期">
                <span
                  title={formateDateRange(this.summaryInfo?.timeRange)}
                  class="form-value"
                >
                  {formateDateRange(this.summaryInfo?.timeRange)}
                </span>
              </el-form-item>
              <el-form-item label="往来单位编码">
                <span title={this.summaryInfo?.cooperatorNo} class="form-value">
                  {this.summaryInfo?.cooperatorNo}
                </span>
              </el-form-item>
              <el-form-item label="往来单位">
                <span
                  title={this.summaryInfo?.cooperatorName}
                  class="form-value"
                >
                  {this.summaryInfo?.cooperatorName}
                </span>
              </el-form-item>
              <el-form-item label="物流公司单位编码">
                <span title={this.summaryInfo?.logisticsNo} class="form-value">
                  {this.summaryInfo?.logisticsNo}
                </span>
              </el-form-item>
              <el-form-item label="物流公司">
                <span
                  title={this.summaryInfo?.logisticsName}
                  class="form-value"
                >
                  {this.summaryInfo?.logisticsName}
                </span>
              </el-form-item>
            </el-form>
          </div>

          <div class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex">
            <div class="ht-page-title page-title-divider">交易详情</div>
            <ht-setting-table
              class="auto-block"
              v-loading={this.loading}
              pagination
              disabledHotkeys
              data={this.tableData}
              columns={this.columns}
              table-name={this.tableName}
              export-table-visible={this.exportVisible}
              file-name={this.exportName}
              end-export-func={this.exportHandle}
              total={this.totalSize}
              current-page={this.page}
              on-pageChange={this.pageChange}
              show-summary
              summary-method={(param: any) =>
                this.getSummaries(param, this.totalInfo)
              }
              on={{
                "update:exportTableVisible": this.syncExportVisible
              }}
            />
          </div>
        </div>
        <div class="dialog-footer-align" style="margin: 10px 0 5px 0">
          <el-button
            type="primary"
            size="mini"
            plain
            onClick={this.showExportDilog}
          >
            导出
          </el-button>
        </div>
      </ht-dialog>
    );
  }
}
</script>
