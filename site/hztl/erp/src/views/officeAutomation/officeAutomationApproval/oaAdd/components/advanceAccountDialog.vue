<template>
  <ht-dialog
    :visible.sync="visible"
    title="待报销预支款"
    width="936px"
    append-to-body
    v-on="$listeners"
    @closed="closed"
  >
    <ht-card>
      <el-form
        ref="ruleForm"
        :model="searchForm"
        :show-message="false"
        label-width="60px"
        label-position="right"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label-width="88px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                :options="applyAts"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range
                v-model="searchForm.timeRange"
                shortcuts-type="all"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收支类目">
              <ht-select
                v-model="searchForm.fundCategoryIds"
                :options="fundCategoryOptions"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click.stop="handleSearch">
              查询（F5）
            </el-button>
            <el-button type="primary" size="mini" @click.stop="handleReset">
              重置（F6）
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card style="margin-top: 10px;" class="auto-card">
      <ht-setting-table
        :loading="loading"
        :data="tableData"
        :table-name="advanceAccountColumn.name"
        :columns="advanceAccountColumn.columns"
        :total="totalSize"
        :current-page="page"
        :selectedRows="selections"
        autofocus
        pagination
        @pageChange="handlePageChange"
        @selectChange="selectChangeHandler"
      />
    </ht-card>
    <div style="margin-top: 10px;" class="dialog-footer-align">
      <el-button
        type="primary"
        size="mini"
        :disabled="!curData"
        @click="handleSure"
      >
        报销选中预支款（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleCancel">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Emit } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { BILL_TYPE, APPROVAL_STATUS, APPLY_AT_TYPES } from "../../constant";
import { ADVANCE_ACCOUNT_COLUMN } from "../../constant/tableColumns";
import {
  TagModel,
  OptionModel,
  FeeApplicationQueryParams,
  FeeApplicationModel,
  FundCategoriesOptionModel
} from "../../constant/interfaces";
import { OfficeAutomationService } from "../../constant/services";
const officeAutomationService = new OfficeAutomationService();

const defaultSearchForm: FeeApplicationQueryParams = {
  dateType: APPLY_AT_TYPES[0].id, // 日期类型：apply：申请时间，finish：完成时间
  timeRange: [], // 申请时间
  fundCategoryIds: [], // 收支类目
  billTypes: [BILL_TYPE.YZ],
  statuses: [APPROVAL_STATUS.toReimburse]
};

@Component({ name: "AdvanceAccountDialog" })
export default class AdvanceAccountDialog extends Mixins(
  SearchMixin,
  PaginationDataMixin
) {
  // 显示‘预支报销款’弹框
  @Emit("showAdvanceReimbursementDialog")
  protected showAdvanceReimbursementDialog(id: number) {
    return id;
  }
  protected searchForm: FeeApplicationQueryParams = { ...defaultSearchForm };

  public visible = false;

  protected get curData(): FeeApplicationModel | undefined {
    return this.selections[0];
  }

  public tableData: FeeApplicationModel[] = [];
  public selections: FeeApplicationModel[] = [];
  public page = 1;
  public totalPage = 0;

  public async loadData() {
    const searchForm: FeeApplicationQueryParams = this.searchForm;
    const params = {
      ...searchForm,
      fromDate: searchForm.timeRange[0] || "",
      toDate: searchForm.timeRange[1] || "",
      page: this.page,
      pageSize: this.pageSize
    } as FeeApplicationQueryParams;
    const data = await officeAutomationService.getFeeApplications(params);
    return data;
  }

  protected fundCategoryOptions: OptionModel[] = [];
  // 获取收支类目选项
  async getFundCategoriesOptions(query = "") {
    const options =
      (await officeAutomationService.getFundCategoriesOptions(query)) || [];
    this.fundCategoryOptions = options.map(
      (item: FundCategoriesOptionModel) => {
        return {
          id: item.id,
          name: item.fullName
        };
      }
    );
  }

  protected applyAts: TagModel[] = APPLY_AT_TYPES;

  protected handleSure() {
    if (this.curData) {
      this.showAdvanceReimbursementDialog(this.curData.id || 0);
      this.handleCancel();
    }
  }

  protected handleCancel() {
    this.visible = false;
  }

  public show() {
    this.getFundCategoriesOptions();
    this.handleSearch();
    this.visible = true;
  }

  protected handleSearch() {
    this.refreshData();
  }

  protected handleReset() {
    this.searchForm = { ...defaultSearchForm };
  }

  protected closed() {
    this.searchForm = { ...defaultSearchForm };
  }

  protected advanceAccountColumn = ADVANCE_ACCOUNT_COLUMN;

  public handlePageChange(page: number) {
    this.page = page;
  }
  private selectChangeHandler(data: FeeApplicationModel[]) {
    this.selections = data;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  background-color: #e0e0e0;
  height: 500px;
  display: flex;
  flex-direction: column;
}
</style>
