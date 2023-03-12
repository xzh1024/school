<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import {
  FeesData,
  changeFeesStatus,
  deleteFees,
  loadFeesist
} from "@/api/finance/fees";
import { dateFormatToSecond } from "@/utils/date";
import { SettleDialog } from "@/components/business";
import SearchFrom from "./SearchFrom.vue";
import FeesTable from "./FeesTable.vue";
import FeesDialog, { FeesFormData } from "./FeesDialog.vue";
import AdvanceFeesDialog, {
  AdvanceFeesFormData
} from "./AdvanceFeesDialog.vue";
import BtnDisableMixin from "./BtnDisableMixin";
import { FEES_BILL_STATUS } from "./constants";

@Component({
  name: "fees",
  components: {
    SearchFrom,
    FeesTable,
    FeesDialog,
    AdvanceFeesDialog
  }
})
export default class Fees extends Mixins(HotkeyMixin, BtnDisableMixin) {
  private feesVisible = false;
  private advanceFeesVisible = false;
  private loading = false;
  private page = 1;
  private searchFormData!: FormData;
  private get pageSize() {
    return (this.$store && this.$store.state.admin.table.pageSize) || 20;
  }
  private selections: FeesData[] = [];
  public get curData() {
    return this.selections.length === 1 ? this.selections[0] : undefined;
  }
  @Watch("pageSize")
  onPageSizeChange() {
    this.pageChange(1);
  }
  private tableData: FeesData[] = [];
  private totalSize = 0;
  private searchChange(data: FormData) {
    this.searchFormData = data;
    this.pageChange(1);
  }

  private pageChange(page: number) {
    this.page = page;
    this.loadData();
  }

  private selectChangeHandler(data: FeesData[]) {
    this.selections = data;
  }

  private loadData() {
    this.loading = true;
    loadFeesist({
      ...this.searchFormData,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(res => {
        this.totalSize = res.totalSize;
        const lastSelections = this.selections;
        this.tableData = res.rows || [];
        let selections = this.tableData.filter(item =>
          lastSelections.find(select => select.id === item.id)
        );
        if (!selections.length && this.tableData.length) {
          selections = [this.tableData[0]];
        }
        this.selections = selections;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private editData?: FeesFormData;
  private editAdvanceData?: AdvanceFeesFormData;
  private createFees() {
    if (this.createDisabled) {
      return;
    }
    this.feesVisible = true;
    this.editData = undefined;
  }

  private editFees() {
    if (!this.curData) {
      return;
    }
    if (this.curData.billType === "YBX") {
      this.advanceFeesVisible = true;
      this.editAdvanceData = {
        id: this.curData.id,
        rejectReason: this.curData.rejectReason,
        billType: this.curData.billType,
        applyAt: this.curData.applyAt,
        applyAmount: this.curData.applyAmount,
        applyReason: this.curData.applyReason,
        status: this.curData.status,
        belongs: this.curData.belongs,
        billNo: this.curData.billNo,
        advanceBillId: this.curData.advanceBillId,
        advanceBillNo: this.curData.advanceBillNo,
        advanceAmount: this.curData.advanceAmount
      };
    } else {
      this.feesVisible = true;
      this.editData = {
        id: this.curData.id,
        rejectReason: this.curData.rejectReason,
        billType: this.curData.billType,
        applyAt: this.curData.applyAt,
        applyAmount: this.curData.applyAmount,
        applyReason: this.curData.applyReason,
        status: this.curData.status,
        belongs: this.curData.belongs,
        billNo: this.curData.billNo
      };
    }
  }

  private advanceFees(row: FeesData) {
    this.advanceFeesVisible = true;
    this.editAdvanceData = {
      rejectReason: row.rejectReason,
      billType: "YBX",
      applyAt: dateFormatToSecond(new Date()),
      applyAmount: row.applyAmount,
      applyReason: row.applyReason,
      advanceBillId: row.id,
      advanceBillNo: row.billNo,
      advanceAmount: row.applyAmount
    };
  }

  private closeEdit() {
    this.feesVisible = false;
    this.advanceFeesVisible = false;
    this.loadData();
  }

  private deleteFees() {
    if (!this.curData || this.delDisabled) {
      return;
    }
    this.$confirm("确认删除当前费用？", "提示")
      .then(() => {
        this.loading = true;
        return deleteFees(this.curData!.id);
      })
      .then(() => {
        return this.pageChange(this.page);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private submit() {
    if (!this.curData) {
      return;
    }
    this.loading = true;
    changeFeesStatus({
      id: this.curData.id,
      status: FEES_BILL_STATUS.submited
    })
      .then(() => {
        this.$message.success({
          message: "提交成功!",
          showClose: true
        });
        return this.loadData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private recall() {
    if (!this.curData || this.recallDisabled) {
      return;
    }
    this.loading = true;
    changeFeesStatus({
      id: this.curData.id,
      status: FEES_BILL_STATUS.unSubmit
    })
      .then(() => {
        this.$message.success({
          message: "撤回成功!",
          showClose: true
        });
        return this.loadData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private audit() {
    if (this.createDisabled) {
      return;
    }
    this.$promiseDialog({
      title: "审核",
      model: {
        rejectReason: "",
        status: FEES_BILL_STATUS.unSettlement
      },
      width: "400px",
      beforeConfirm: data => {
        if (data?.status === FEES_BILL_STATUS.rejected && !data?.rejectReason) {
          this.$message.error({
            message: "请填写驳回原因！",
            showClose: true
          });
          return false;
        }
        return true;
      },
      contentRender: data => (
        <el-form size="mini">
          <el-form-item>
            <el-radio-group v-model={data.status}>
              <el-radio label={FEES_BILL_STATUS.unSettlement}>通过</el-radio>
              <el-radio label={FEES_BILL_STATUS.rejected}>驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          {data.status === FEES_BILL_STATUS.rejected && (
            <el-form-item>
              <ht-input
                v-model={data.rejectReason}
                rows={4}
                type="textarea"
                size="medium"
                maxlength={100}
                placeholder="请填写驳回原因！"
              />
            </el-form-item>
          )}
        </el-form>
      )
    })
      .then(res => {
        this.loading = true;
        return changeFeesStatus({
          id: this.curData!.id,
          ...res
        });
      })
      .then(() => {
        this.$message.success({
          message: "提交成功!",
          showClose: true
        });
        return this.loadData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private settleVisible = false;
  private changeSettleVisible(value: boolean) {
    if (this.settleDisabled) {
      return;
    }
    this.settleVisible = value;
  }

  private get settlData() {
    return {
      ...this.curData,
      amount: this.curData?.unSettleAmount
    };
  }

  private get settleInformation() {
    if (!this.curData) {
      return [];
    }
    return [
      { name: "单号", content: this.curData.billNo },
      {
        name: "申请人",
        content: this.curData.applyByName
      },
      {
        type: "amount"
      },
      {
        type: "settledAmount"
      },
      // {
      //   type: "discountAmount"
      // },
      {
        type: "unSettledAmount"
      }
    ];
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btn-group">
          <el-button
            type="primary"
            size="mini"
            disabled={this.createDisabled}
            onClick={this.createFees}
            loading={this.loading}
          >
            新增（F2）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={this.editFees}
            disabled={!this.curData}
            loading={this.loading}
          >
            编辑（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={this.delDisabled}
            onClick={this.deleteFees}
            loading={this.loading}
          >
            删除（F4）
          </el-button>
          <el-button
            type="primary"
            loading={this.loading}
            size="mini"
            disabled={this.submitDisabled}
            onClick={this.submit}
          >
            提交（F9）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.recall}
            disabled={this.recallDisabled}
          >
            撤回（F9）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            onClick={this.audit}
            disabled={this.auditDisabled}
          >
            审核（F7）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            loading={this.loading}
            disabled={this.settleDisabled}
            onClick={() => this.changeSettleVisible(true)}
          >
            结算（F7）
          </el-button>
        </div>
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          <search-from
            loading={this.loading}
            onSearchChange={this.searchChange}
          />
        </div>
        <div class="auto-block flex-block-bg flex-block-margin">
          <fees-table
            pagination
            autofocus
            current-page={this.page}
            total={this.totalSize}
            data={this.tableData}
            loading={this.loading}
            selectedRows={this.selections}
            onSelectChange={this.selectChangeHandler}
            onPageChange={this.pageChange}
            onAdvanceFees={this.advanceFees}
            onRowOperation={this.editFees}
            onRowDelete={this.deleteFees}
          />
        </div>
        <fees-dialog
          visible={this.feesVisible}
          data={this.editData}
          onVisibleChange={this.closeEdit}
        />
        <advance-fees-dialog
          visible={this.advanceFeesVisible}
          data={this.editAdvanceData}
          onVisibleChange={this.closeEdit}
        />
        <SettleDialog
          visible={this.settleVisible}
          informationList={this.settleInformation}
          settlData={this.settlData}
          companyId={this.curData?.companyId}
          onVisibleChange={this.changeSettleVisible}
          onSettleSuccess={this.loadData}
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
