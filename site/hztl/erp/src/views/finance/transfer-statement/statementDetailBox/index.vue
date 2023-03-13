<template>
  <ht-dialog
    v-bind="$attrs"
    title="对账单详情"
    width="1300px"
    top="7vh"
    class="dialog-body"
    v-on="$listeners"
  >
    <!-- 调拨对账 -->
    <div class="container-box" style="height: 650px; padding-bottom: 5px;">
      <div class="header">
        <el-button
          :disabled="!canClick || !canSupplement"
          type="primary"
          size="mini"
          @click="handleShowSupplementBox"
        >
          补充登记
        </el-button>
        <el-button
          :disabled="!canClick || !canCommit"
          :loading="commitLoading"
          type="primary"
          size="mini"
          @click="updateBillStatus('commit')"
        >
          {{ OPERATIONS.commit }}（F9）
        </el-button>
        <el-button
          :disabled="!canClick || !canRevoke"
          :loading="revokeLoading"
          type="primary"
          size="mini"
          @click="updateBillStatus('revoke')"
        >
          {{ OPERATIONS.revoke }}（F9）
        </el-button>
        <el-button
          :disabled="!canClick || !canPay"
          type="primary"
          size="mini"
          @click="paySelected(0)"
        >
          支付（F7）
        </el-button>
        <el-button
          :disabled="!canClick || !canPayComfirm"
          type="primary"
          size="mini"
          @click="paySelected(1)"
        >
          收款确认（F7）
        </el-button>
        <el-button
          :disabled="!canClick || !canPrint"
          type="primary"
          size="mini"
          @click="printHandle"
        >
          打印（F11）
        </el-button>
      </div>

      <ht-card no-background no-padding class="auto-card">
        <el-row :gutter="5" style="height: 100%;">
          <el-col :span="6" style="display: flex; height: 100%;">
            <ht-card no-padding title="对账信息" class="auto-card">
              <StatementInfo :info-data="infoData" />
            </ht-card>
          </el-col>
          <el-col :span="18" style="height: 100%;">
            <ht-card style="margin-bottom: 5px;">
              <el-form
                :model="ruleForm"
                :show-message="false"
                class="form-item-small-margin-bottom"
                label-position="left"
                label-width="60px"
                size="mini"
              >
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="对账日期" prop="billDate">
                      <el-date-picker
                        v-model="ruleForm.billDate"
                        disabled
                        placeholder="请选择日期"
                        value-format="yyyy-MM-dd"
                        @change="updatePaymentStatement"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label-width="75px"
                      label="预结算日期"
                      prop="preClearingDate"
                    >
                      <el-date-picker
                        v-model="ruleForm.preClearingDate"
                        :disabled="!canEdit"
                        placeholder="请选择日期"
                        value-format="yyyy-MM-dd"
                        @change="updatePaymentStatement"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label-width="45px"
                      label="经办人"
                      prop="handledBy"
                    >
                      <ht-autoselect
                        v-model="ruleForm.handledBy"
                        v-delay-focus="autoFocus"
                        :disabled="!canEdit"
                        :options="store().allStaffs()"
                        :default-value.sync="ruleForm.handledByName"
                        :trigger-on-focus="false"
                        placeholder="请选择"
                        clearable
                        filter-zero
                        highlight-first-item
                        @change="updatePaymentStatement"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="对方对账" prop="peerPaymenter">
                      <ht-input
                        v-model="ruleForm.peerPaymenter"
                        disabled
                        maxlength="50"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="备注" prop="remark">
                    <ht-input
                      v-model="ruleForm.remark"
                      :disabled="!canEdit"
                      maxlength="200"
                      @change="updatePaymentStatement"
                    />
                  </el-form-item>
                </el-row>
              </el-form>
            </ht-card>
            <resize-box :default-len="190" direction-contrary is-column>
              <template v-slot:block1>
                <ht-card no-padding class="table-container">
                  <ht-tabs v-model="activeTab" :tabs="tabs" />
                  <detail-table
                    :loading="loading"
                    :table-data="detailsTableData"
                    :selected-rows.sync="selectedDetailsTableRows"
                    :can-edit="canEdit"
                    height="calc(100% - 34px)"
                    @remove-row="removeStatement"
                  />
                </ht-card>
              </template>
              <template v-slot:block2>
                <ht-card title="结算明细" no-padding class="table-container">
                  <settle-detail
                    :loading="loading"
                    :table-data="settleDetailsTable"
                    :selected-rows.sync="selectedSettleDetailsRows"
                    height="calc(100% - 38px)"
                  />
                </ht-card>
              </template>
            </resize-box>
          </el-col>
        </el-row>
      </ht-card>

      <payBox
        :visible.sync="showPayDialog"
        :pay-data="payData"
        @settle-res="handlePayDialogClose"
      />
      <SupplementBox
        :visible.sync="supplementBoxvisible"
        :supplement="supplement"
        :settlementType="2"
        @sure="handleSupplementSure"
      />
    </div>
  </ht-dialog>
</template>

<script>
import {
  commitPaymentStatement,
  loadPaymentStatementDetail,
  removePaymentStatement,
  createTransferSupplement,
  revokePaymentStatement,
  updatePaymentStatement
} from "@/api/finance/payment";
import { precisionsFixed, searchMixin } from "@/mixins";
import ResizeBox from "@/components/resizeBox";
import DetailTable from "./DetailTable";
import SettleDetail from "./SettleDetail";
import StatementInfo from "./StatementInfo";
import { OPERATIONS } from "../../constans/index";
import SupplementBox from "../../components/SupplementBox";
import payBox from "../../components/payBox";
import { openNewWindow } from "@/utils/tool";
import * as store from "@/utils/store";

const defaultRuleForm = {
  billDate: null,
  preClearingDate: null,
  handledBy: null,
  handledByName: null
};

export default {
  name: "TransferDetailBox",
  components: {
    ResizeBox,
    StatementInfo,
    DetailTable,
    SettleDetail,
    payBox,
    SupplementBox
  },
  mixins: [precisionsFixed, searchMixin],
  props: {
    billId: {
      type: Number,
      default: null
    },
    isCreate: Boolean
  },
  data() {
    return {
      OPERATIONS,
      commitLoading: false,
      revokeLoading: false,
      revokeConfirmLoading: false,
      autoFocus: true,
      payData: {},
      actions: {},
      ruleForm: { ...defaultRuleForm },
      infoData: {},
      activeTab: 0,
      stetementInData: [],
      stetementOutData: [],
      selectedDetailsTableRows: [],
      cacheInTableRows: [],
      cacheOutTableRows: [],
      detailsTableData: [],
      selectedSettleDetailsRows: [],
      settleDetailsTable: [],
      loading: false,
      showPayDialog: false,
      isHandleSearch: false,
      supplementBoxvisible: false,
      supplement: {}
    };
  },
  computed: {
    canClick() {
      return (
        !this.commitLoading && !this.revokeLoading && !this.revokeConfirmLoading
      );
    },
    canSupplement() {
      return this.actions.supplement;
    },
    canEdit() {
      return this.actions.edit;
    },
    canCommit() {
      return this.actions.submit;
    },
    canRevoke() {
      return this.actions.revoke;
    },
    canPay() {
      return this.actions.pay;
    },
    canPayComfirm() {
      return this.actions.receive;
    },
    canPrint() {
      return this.actions.print;
    },
    tabs() {
      return [
        {
          id: 0,
          name: "应收款",
          render: name => (
            <span>
              {name}
              {this.stetementInData.length ? (
                <span class="danger-text">({this.stetementInData.length})</span>
              ) : null}
            </span>
          )
        },
        {
          id: 1,
          name: "应付款",
          render: name => (
            <span>
              {name}
              {this.stetementOutData.length ? (
                <span class="danger-text">
                  ({this.stetementOutData.length})
                </span>
              ) : null}
            </span>
          )
        }
      ];
    }
  },
  watch: {
    "$attrs.visible": {
      handler(val, oldVal) {
        if (val) {
          this.loadData().finally(() => {
            if (this.canEdit) {
              this.autoFocus = true;
            } else {
              this.setScopeFocus();
            }
          });
        } else if (oldVal) {
          this.activeTab = 0;
          this.autoFocus = false;
        }
      },
      immediate: true
    },
    activeTab(value) {
      if (value === 1) {
        this.cacheInTableRows = [...this.selectedDetailsTableRows];
        this.detailsTableData = [...this.stetementOutData];
        this.selectedDetailsTableRows = this.cacheOutTableRows.length
          ? [...this.cacheOutTableRows]
          : this.detailsTableData.length
          ? [this.detailsTableData[0]]
          : [];
      } else if (value === 0) {
        this.cacheOutTableRows = [...this.selectedDetailsTableRows];
        this.detailsTableData = [...this.stetementInData];
        this.selectedDetailsTableRows = this.cacheInTableRows.length
          ? [...this.cacheInTableRows]
          : this.detailsTableData.length
          ? [this.detailsTableData[0]]
          : [];
      }
    },
    selectedDetailsTableRows(value) {
      if (value.length) {
        this.selectedSettleDetailsRows = [];
      }
    },
    selectedSettleDetailsRows(value) {
      if (value.length) {
        this.selectedDetailsTableRows = [];
      }
    }
  },
  methods: {
    store() {
      return store;
    },
    setScopeFocus() {
      let selectedRow;
      if (this.selectedDetailsTableRows.length) {
        selectedRow = this.detailsTableData.find(
          item => item.id === this.selectedDetailsTableRows[0].id
        );
      }
      this.selectedDetailsTableRows = selectedRow
        ? [selectedRow]
        : this.detailsTableData.length
        ? [this.detailsTableData[0]]
        : [];
      if (!this.selectedSettleDetailsRows.length) {
        let selectedRow;
        if (this.selectedSettleDetailsRows.length) {
          selectedRow = this.settleDetailsTable.find(
            item => item.id === this.selectedSettleDetailsRows[0].id
          );
        }
        this.selectedSettleDetailsRows = selectedRow
          ? [selectedRow]
          : this.settleDetailsTable.length
          ? [this.settleDetailsTable[0]]
          : [];
      }
    },
    loadData() {
      this.loading = true;
      return loadPaymentStatementDetail({ statementId: this.billId }, "db")
        .then(res => {
          this.actions = res.actions;
          this.ruleForm = {
            billDate: res.billDate,
            preClearingDate: res.preClearingDate,
            handledBy: res.handledBy,
            handledByName: res.handledByName,
            peerPaymenter: res.peerPaymenter,
            remark: res.remark
          };

          this.supplement = {
            settleCooperatorId: res.relatedCompanyId,
            settleCooperatorName: res.relatedCompanyName
          };

          this.infoData = {
            billNo: res.billNo,
            id: res.id,
            status: res.status,
            createCompanyName: res.createCompanyName,
            relatedCompanyName: res.relatedCompanyName,
            timRange: `${res.minBillDate} 至 ${res.maxBillDate}`,
            lastWaitSettledAmount: res.lastWaitSettledAmount,
            amount: res.amount,
            settledAmount: res.settledAmount,
            unSettledAmount: res.unSettledAmount,
            sumUnSettledAmount: res.sumUnSettledAmount,
            createdByName: res.createdByName,
            createdAt: res.createdAt,
            confirmedByName: res.confirmedByName,
            billDate: res.billDate,
            updatedByName: res.updatedByName,
            updatedAt: res.updatedAt,
            auditByName: res.auditByName,
            auditAt: res.auditAt,
            createLastSettleByName: res.createLastSettleByName,
            createLastSettleAt: res.createLastSettleAt,
            relatedLastSettleByName: res.relatedLastSettleByName,
            relatedLastSettleAt: res.relatedLastSettleAt
          };

          this.payData = {
            statementId: res.id,
            rpType: 0
          };

          this.settleDetailsTable = res.settleDetails || [];

          if (res.details && res.details.length) {
            this.stetementOutData = res.details.filter(
              item => item.paymentType === 1
            );
            this.stetementInData = res.details.filter(
              item => item.paymentType === 0
            );
            if (this.stetementInData.length === 0) {
              this.activeTab = 1;
              this.activeTab(1);
            }
          }

          this.detailsTableData = this.activeTab
            ? [...this.stetementOutData]
            : [...this.stetementInData];

          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updatePaymentStatement() {
      updatePaymentStatement(
        {
          ...this.ruleForm,
          statementId: this.billId
        },
        "db"
      ).then(() => {
        this.isHandleSearch = false;
        this.$message({
          message: "更新成功!",
          type: "success",
          showClose: true
        });
        this.$emit("on-change", this.isHandleSearch);
      });
    },
    removeStatement(id) {
      let tips = "确认删除该条明细?";
      if (this.detailsTableData.length == 1) {
        tips = "确认删除最后一条明细？删除后该对账单也会被删除。";
      }
      this.$confirm(tips, "提示", { type: "warning" })
        .then(() =>
          removePaymentStatement(
            {
              statementId: this.billId,
              statementDetailId: id
            },
            "db"
          )
            .then(() => {
              this.isHandleSearch = false;
              this.$message({
                type: "success",
                message: "删除成功！",
                showClose: true
              });
              if (this.detailsTableData.length == 1) {
                this.$emit("update:visible", false);
              } else {
                this.loadData().then(() => {
                  this.setScopeFocus();
                  this.$emit("statement-number-change");
                  this.$emit("on-change", this.isHandleSearch);
                });
              }
            })
            .catch(() => {})
        )
        .catch(() => {});
    },
    updateBillStatus(type) {
      if (!this.canClick) return;
      switch (type) {
        case "commit":
          if (this.canCommit) {
            this.commitLoading = true;
            commitPaymentStatement({ statementId: this.billId }, "db")
              .then(() => {
                this.isHandleSearch = false;
                this.$message({
                  type: "success",
                  message: `${OPERATIONS[type]}成功！`,
                  showClose: true
                });
                this.loadData()
                  .then(() => {
                    this.setScopeFocus();
                    this.commitLoading = false;
                    this.$emit("statement-number-change");
                    this.$emit("on-change", this.isHandleSearch);
                  })
                  .catch(() => {
                    this.commitLoading = false;
                  });
              })
              .catch(() => {
                this.commitLoading = false;
              });
          }
          break;
        case "revoke":
          if (this.canRevoke) {
            this.revokeLoading = true;
            revokePaymentStatement({ statementId: this.billId }, "db")
              .then(() => {
                this.isHandleSearch = false;
                this.$message({
                  type: "success",
                  message: `${OPERATIONS[type]}成功！`,
                  showClose: true
                });
                this.loadData()
                  .then(() => {
                    this.setScopeFocus();
                    this.revokeLoading = false;
                    this.$emit("statement-number-change");
                    this.$emit("on-change", this.isHandleSearch);
                  })
                  .catch(() => {
                    this.revokeLoading = false;
                  });
              })
              .catch(() => {
                this.revokeLoading = false;
              });
          }
          break;
        default:
          break;
      }
    },
    paySelected(type) {
      this.payData.rpType = type;
      this.showPayDialog = true;
    },
    printHandle() {
      if (!this.canClick || !this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: `/Print/financials/statements-db/print/${this.infoData.id}`
        }).href,
        "print"
      );
    },
    handlePayDialogClose(flag) {
      if (flag) {
        this.showPayDialog = false;
        this.isHandleSearch = false;
        this.loadData()
          .then(() => {
            this.setScopeFocus();
            this.$message({
              type: "success",
              message: "支付成功！",
              showClose: true
            });
            this.$emit("statement-number-change");
            this.$emit("on-change", this.isHandleSearch);
          })
          .catch(() => {});
      }
    },
    handleShowSupplementBox() {
      if (!this.canClick || !this.canSupplement) {
        return;
      }
      this.supplementBoxvisible = true;
    },
    handleSupplementSure(ruleForm) {
      createTransferSupplement({
        settleCooperatorId: ruleForm.settleCooperatorId,
        statementId: this.billId,
        paymentType: ruleForm.paymentType,
        businessDate: ruleForm.businessDate,
        businessManId: ruleForm.businessManId,
        amount: ruleForm.amount,
        remark: ruleForm.remark
      })
        .then(() => {
          this.$message.success({
            message: "补充登记成功",
            showClose: true
          });
          this.supplementBoxvisible = false;
          this.loadData();
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  ::v-deep .el-dialog__body {
    padding: 0;
    background-color: #e7ebed;
  }
  ::v-deep .resize-wrapper {
    height: calc(100% - 90px);
  }
  .table-container {
    height: 100%;
    ::v-deep .el-card__body {
      height: 100%;
    }
  }
}
</style>
