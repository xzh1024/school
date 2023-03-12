<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { OUT_SEARCH_TABLE } from "./constants";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { getExtraColumns } from "@/views/sales/util/extraColumns";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsPartDetail
} from "@/api/base/base";
import SearchPartsDialog, { SearchFormData } from "./SearchPartsDialog.vue";
import { fetchSearchList } from "./services";
import { TransferOutSearchData } from "./interface";
import OutOperationMixin from "../../mixins/OutOperationMixin";
import { TYPE } from "../../constants";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component({
  name: "searchTable",
  components: {
    SearchPartsDialog
  }
})
export default class TransferOut extends Mixins(
  OutOperationMixin,
  PaginationDataMixin
) {
  @Prop() readonly billId!: number;
  @Prop() readonly relatedCompanyId!: number;
  @Prop() readonly companyId!: number;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly mode!: number;

  protected tableData: TransferOutSearchData[] = [];
  protected selections: TransferOutSearchData[] = [];

  private sort = "";
  private tableName = OUT_SEARCH_TABLE.name;
  @Watch("relatedCompanyId")
  onRelatedCompanyChange(val: number) {
    // 搜索数据与公司关联，如果搜索结果不是调入公司则清除数据
    if (val !== this.searchFormData?.relatedCompanyId) {
      this.initData();
    }
  }

  public initData() {
    this.tableData = [];
    this.selections = [];
    this.totalSize = 0;
    this.hasSearched = false;
    this.searchFormData = null;
  }

  private selectChangeHandler(data: TransferOutSearchData[]) {
    this.selections = data;
    this.$emit("partSelectChange", this.selections);
  }

  @Watch("mode")
  private onModeChange() {
    if (this.hasSearched) {
      this.refreshData();
    }
  }

  private filterZero = true;
  @Watch("filterZero")
  onFilterZeroChange() {
    this.searchChange(this.searchFormData);
    updateStaffSystemParamsPartDetail({
      module: "common",
      type: "filterZeroQty",
      value: {
        [TYPE]: this.filterZero
      }
    });
  }

  private searchFormData: (SearchFormData & { sort?: string }) | null = null;
  private searchChange(data: SearchFormData | null) {
    if (!data) {
      return;
    }
    this.hasSearched = true;
    this.searchFormData = { ...data, filterZero: this.filterZero };
    this.$emit("searchDataChange", {
      relatedCompanyId: data.relatedCompanyId
    });
    this.close();
    this.pageChange(1);
  }
  private getFilterZero() {
    this.loading = true;
    getStaffSystemParamsDetail({
      module: "common",
      type: "filterZeroQty"
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res.value) {
          this.filterZero = res.value[TYPE] || false;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  protected loadData() {
    this.loading = true;
    return fetchSearchList({
      ...this.searchFormData,
      mode: this.mode,
      page: this.page,
      sort: this.sort,
      pageSize: this.pageSize
    }).finally(() => {
      this.loading = false;
    });
  }

  private searchVisible = false;
  private hasSearched = false;

  private close() {
    this.searchVisible = false;
  }

  private setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
  }
  private handleSortChange(column: any) {
    this.sort = setTableSort(column);
    if (this.tableData?.length && this.searchFormData) {
      this.searchFormData.sort = this.sort;
      this.pageChange(1);
    }
  }

  private createBill() {
    this.$router.push({
      path: "./outDetail"
    });
    this.initData();
    this.$emit("create");
  }

  private showSearch() {
    this.searchVisible = true;
  }

  private addPartHandle(row: TransferOutSearchData) {
    if (Number(row.allocOutUsableQty || 0) > 0 && this.canEdit) {
      this.$emit("selectPart", row);
    } else {
      this.$message.warning({
        message: "当前状态不可添加明细",
        showClose: true
      });
    }
  }

  get columns() {
    const addPartHandle = (row: TransferOutSearchData, e: MouseEvent) => {
      e.stopPropagation();
      this.addPartHandle(row);
    };
    const columns = OUT_SEARCH_TABLE.columns
      .filter(item => this.canEdit || item.prop !== "controls")
      .map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value: null, row: TransferOutSearchData) => {
              return Number(row.allocOutUsableQty || 0) > 0 ? (
                <el-tooltip enterable={false} content="添加" placement="top">
                  <span
                    class="icon operation-icon icon-add-info"
                    on-click={(e: MouseEvent) => addPartHandle(row, e)}
                  />
                </el-tooltip>
              ) : null;
            }
          };
        }
        return item;
      });
    columns.splice(
      columns.findIndex(item => item.prop === "untaxedPurchasePrice"),
      0,
      ...getExtraColumns(this.mode)
    );
    return columns;
  }

  private returnBack() {
    this.$router.push({
      path: "./outList"
    });
  }

  mounted() {
    this.getFilterZero();
    this.setSortData();
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-container flex-block-bg flex-block-padding btn-group">
          <div class="auto-block">
            <el-button
              type="primary"
              size="mini"
              disabled={this.createDisabled}
              onClick={this.createBill}
              loading={this.loading}
            >
              开单（F2）
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={this.showSearch}
              loading={this.loading}
            >
              查询（Ins）
            </el-button>
            {this.$slots.button}
            <el-checkbox
              v-model={this.filterZero}
              v-loading={this.loading}
              disabled={this.loading}
              style="margin-left: 10px;"
            >
              过滤零库存（Alt+O）
            </el-checkbox>
          </div>
          <div>
            <el-link underline={false} onClick={this.returnBack}>
              返回列表
              <span class="el-icon-arrow-right" />
            </el-link>
          </div>
        </div>
        <ht-setting-table
          class="auto-block flex-block-margin"
          table-name={OUT_SEARCH_TABLE.name}
          columns={this.columns}
          pagination
          autofocus
          current-page={this.page}
          total={this.totalSize}
          data={this.tableData}
          loading={this.loading}
          selectedRows={this.selections}
          onSelectChange={this.selectChangeHandler}
          onPageChange={this.pageChange}
          onSort-change={this.handleSortChange}
          onRowOperation={this.addPartHandle}
        />
        <search-parts-dialog
          visible={this.searchVisible}
          onClose={this.close}
          relatedCompanyId={this.relatedCompanyId}
          companyId={this.companyId}
          onSearchChange={this.searchChange}
          disabledRelatedCompany={!!this.billId}
          relatedCompanies={this.relatedCompanies}
        />
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
.btn-group {
  margin-top: 5px;
}
</style>
