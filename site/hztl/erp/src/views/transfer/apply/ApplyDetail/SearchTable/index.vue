<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsPartDetail,
  updateStaffSystemParamsDetail
} from "@/api/base/base";
import ModeSetBox from "./ModeSetBox.vue";
import SearchPartsDialog, { SearchFormData } from "./SearchPartsDialog.vue";
import { APPLY_SEARCH_TABLE } from "./constants";
import { TransferApplySearchData } from "./interface";
import { fetchApplySearchList } from "./services";
import ApplyOperationMixin from "../../mixins/ApplyOperationMixin";
import { TYPE } from "../../constants";
import { TRANSF_MODE_OPTIONS } from "@/constants";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component({
  name: "searchTable",
  components: {
    SearchPartsDialog,
    ModeSetBox
  }
})
export default class TransferApply extends Mixins(
  ApplyOperationMixin,
  PaginationDataMixin
) {
  @Prop() readonly billId!: number;
  @Prop() readonly relatedCompanyId!: number;
  @Prop() readonly companyId!: number;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly mode!: number | null;

  protected tableData: TransferApplySearchData[] = [];
  protected selections: TransferApplySearchData[] = [];
  private localMode = this.mode;
  private sort = "";
  private tableName = APPLY_SEARCH_TABLE.name;
  @Watch("relatedCompanyId")
  onRelatedCompanyChange(val: number) {
    // 搜索数据与公司关联，如果搜索结果不是调出公司则清除数据
    if (val !== this.searchFormData?.allocOutCompanyId) {
      this.initData();
    }
  }

  public initData() {
    this.tableData = [];
    this.selections = [];
    this.totalSize = 0;
    this.hasSearched = false;
    this.searchFormData = null;
    this.setSortData();
  }
  private setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
  }
  private selectChangeHandler(data: TransferApplySearchData[]) {
    this.selections = data;
    this.$emit("partSelectChange", this.selections);
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
  @Watch("mode")
  onModeChange() {
    this.localMode = this.mode;
  }
  private searchFormData: (SearchFormData & { sort?: string }) | null = null;
  private searchChange(data: SearchFormData | null) {
    if (!data) {
      return;
    }
    this.hasSearched = true;
    this.searchFormData = {
      ...data,
      filterZero: this.filterZero,
      sort: this.sort
    };
    this.$emit("searchDataChange", {
      relatedCompanyId: data.allocOutCompanyId
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
    return fetchApplySearchList({
      ...this.searchFormData,
      mode: this.mode,
      page: this.page,
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

  private createBill() {
    if (this.createDisabled) {
      return;
    }
    this.goDetail();
    this.initData();
    this.$emit("create");
  }

  private showSearch() {
    this.searchVisible = true;
  }

  private addPartHandle(row: TransferApplySearchData) {
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
    const addPartHandle = (row: TransferApplySearchData, e: MouseEvent) => {
      e.stopPropagation();
      this.addPartHandle(row);
    };
    return APPLY_SEARCH_TABLE.columns
      .filter(item => {
        if (this.canEdit || item.prop !== "controls") {
          if (this.mode === undefined) return true;
          switch (this.mode) {
            case 2:
              return true;
            case 3:
              return item.prop !== "outWarehouseName";
            case 4:
              return (
                item.prop !== "outWarehouseName" && item.prop !== "property"
              );
            default:
              return true;
          }
        } else {
          return false;
        }
      })
      .map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value: null, row: TransferApplySearchData) => {
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
  }

  private modeSetBoxVisible = false;
  private showModeSetBox() {
    this.modeSetBoxVisible = true;
  }
  private handleModeChange(value: number) {
    this.$emit("modeChange", value);
    updateStaffSystemParamsDetail({
      module: "allocation",
      type: "allocApplyMode",
      value
    });
    if (this.hasSearched) {
      this.$nextTick(() => {
        this.refreshData();
      });
    }
  }
  handleSortChange(sort: any) {
    if (!this.searchFormData) return;
    this.sort = setTableSort(sort);
    this.searchFormData.sort = this.sort;
    this.pageChange(1);
  }
  mounted() {
    this.getFilterZero();
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
            {
              // <el-button
              //   type="primary"
              //   size="mini"
              //   disabled={!!this.billId}
              //   onClick={this.showModeSetBox}
              //   loading={this.loading}
              //   >
              //   申请模式设置
              // </el-button>
            }
            <div class="inline-block m-l-6">
              <div class="inline-block m-l-6">查询模式：</div>
              <div class="inline-block m-l-4">
                <ht-autoselect
                  size="mini"
                  style="width:260px;"
                  v-model={this.localMode}
                  options={TRANSF_MODE_OPTIONS}
                  trigger-on-focus={false}
                  placeholder="请选择"
                  onChange={this.handleModeChange}
                  highlight-first-item
                />
              </div>
            </div>
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
            <el-link underline={false} onClick={this.gotoList}>
              返回列表
              <span class="el-icon-arrow-right" />
            </el-link>
          </div>
        </div>
        <ht-setting-table
          class="auto-block flex-block-margin"
          table-name={APPLY_SEARCH_TABLE.name}
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
          onRowOperation={this.addPartHandle}
          onSort-change={this.handleSortChange}
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
