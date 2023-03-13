<template>
  <ht-dialog
    v-bind="$attrs"
    title="对账单详情"
    width="1300px"
    top="7vh"
    class="dialog-body"
    v-on="$listeners"
  >
    <!-- 应收付对账 -->
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
          v-if="!hasConfirmFlow"
          :disabled="!canClick || !canCommitAndSettle"
          :loading="commitAndSettleLoading"
          type="primary"
          size="mini"
          @click="commitAndSettle"
        >
          提交并结算（F8）
        </el-button>
        <el-button
          v-if="hasConfirmFlow"
          :disabled="!canClick || !canRevoke"
          :loading="revokeLoading"
          type="primary"
          size="mini"
          @click="updateBillStatus('revoke')"
        >
          {{ OPERATIONS.revoke }}（F9）
        </el-button>
        <el-button
          v-if="hasConfirmFlow"
          :disabled="!canClick || !canConfirm"
          :loading="confirmLoading"
          type="primary"
          size="mini"
          @click="updateBillStatus('confirm')"
        >
          {{ OPERATIONS.confirm }}
        </el-button>
        <el-button
          :disabled="!canClick || !canRevokeConfirm"
          :loading="revokeConfirmLoading"
          type="primary"
          size="mini"
          @click="updateBillStatus('revokeConfirm')"
        >
          {{ OPERATIONS.revokeConfirm }}
        </el-button>
        <el-button
          :disabled="!canClick || !canSettle"
          type="primary"
          size="mini"
          @click="settleSelected"
        >
          结算（F7）
        </el-button>
        <el-button
          :disabled="!canClick || !canExport"
          type="primary"
          size="mini"
          @click="exportHandle"
        >
          导出（Alt+D）
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
                        :disabled="!canEdit"
                        maxlength="50"
                        @change="updatePaymentStatement"
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

      <SettleDialog
        :visible.sync="settleDialogVisible"
        :settlData="settleData"
        :informationList="settleList"
        :companyId="companyId"
        @settleSuccess="handleSingleSettleDialogClose"
      />
      <SupplementBox
        :visible.sync="supplementBoxvisible"
        :supplement="supplement"
        @sure="handleSupplementSure"
      />
      <export-table
        :base-columns="exportColumns"
        :default-data="exportData"
        :table-name="exportName"
        :visible.sync="exportTableVisible"
        :end-export-func="outExoportHandle"
        :file-name="exportFileName"
        is-end-export
      />
    </div>
  </ht-dialog>
</template>

<script>
import { mapState } from "vuex";
import {
  commitPaymentStatement,
  confirmPaymentStatement,
  createPaymentSupplement,
  loadPaymentStatementDetail,
  removePaymentStatement,
  revokeConfirmPaymentStatement,
  revokePaymentStatement,
  updatePaymentStatement,
  exportPaymentStatements
} from "@/api/finance/payment";
import { precisionsFixed, searchMixin } from "@/mixins";
import ResizeBox from "@/components/resizeBox";
import DetailTable from "./DetailTable";
import SettleDetail from "./SettleDetail";
import StatementInfo from "./StatementInfo";
import { SettleDialog } from "@/components/business";
import { OPERATIONS } from "../../constans/index";
import SupplementBox from "../../components/SupplementBox";
import { FINANCE_PAYMENT_STATEMENT_DETAIL } from "@/constants";
import { ExportTable } from "@/components/table";
import * as store from "@/utils/store";

const defaultRuleForm = {
  billDate: null,
  preClearingDate: null,
  handledBy: null,
  handledByName: null
};

export default {
  name: "StatementDetailBox",
  components: {
    ResizeBox,
    StatementInfo,
    DetailTable,
    SettleDetail,
    SettleDialog,
    SupplementBox,
    ExportTable
  },
  mixins: [precisionsFixed, searchMixin],
  props: {
    billId: {
      type: Number,
      default: null
    },
    isCreate: Boolean,
    isSettle: Boolean
  },
  data() {
    return {
      OPERATIONS,
      commitLoading: false,
      commitAndSettleLoading: false,
      revokeLoading: false,
      confirmLoading: false,
      revokeConfirmLoading: false,
      autoFocus: true,
      settleData: {},
      settleList: [],
      companyId: 0,
      belongs: [],
      status: 0,
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
      settleDialogVisible: false,
      isHandleSearch: false,
      supplementBoxvisible: false,
      supplement: {},
      exportTableVisible: false,
      exportName: `export${FINANCE_PAYMENT_STATEMENT_DETAIL.name}Statement`,
      exportColumns: FINANCE_PAYMENT_STATEMENT_DETAIL.columns,
      exportData: [],
      exportFileName: ""
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      hasConfirmFlow: state => !!state.flows.receiveSettlement
    }),
    canClick() {
      return (
        !this.commitLoading &&
        !this.commitAndSettleLoading &&
        !this.revokeLoading &&
        !this.confirmLoading &&
        !this.revokeConfirmLoading
      );
    },
    canSupplement() {
      return (
        this.status === 0 && this.hasBelongsPerm("supplement", this.belongs)
      );
    },
    canEdit() {
      return !this.status && this.hasBelongsPerm("update", this.belongs);
    },
    canCommit() {
      return (
        this.status === 0 && this.hasBelongsPerm("createSubmit", this.belongs)
      );
    },
    canCommitAndSettle() {
      return (
        !this.hasConfirmFlow &&
        this.status === 0 &&
        this.hasBelongsPerm("createSubmit", this.belongs) &&
        this.hasBelongsPermWithoutRoute(
          "settle",
          "financials.settlements",
          this.belongs
        )
      );
    },
    canRevoke() {
      return (
        this.hasConfirmFlow &&
        this.status === 1 &&
        this.hasBelongsPerm("submitRecall", this.belongs)
      );
    },
    canConfirm() {
      return (
        this.hasConfirmFlow &&
        this.status === 1 &&
        this.hasBelongsPerm("confirm", this.belongs)
      );
    },
    canRevokeConfirm() {
      return (
        this.status === 2 && this.hasBelongsPerm("confirmRecall", this.belongs)
      );
    },
    canSettle() {
      return (
        [2, 3].includes(this.status) &&
        this.hasBelongsPermWithoutRoute(
          "settle",
          "financials.settlements",
          this.belongs
        )
      );
    },
    canExport() {
      return this.stetementInData.length || this.stetementOutData.length;
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
            if (this.isSettle) {
              this.settleSelected();
            }
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
      return loadPaymentStatementDetail({ statementId: this.billId }, "rb")
        .then(res => {
          this.belongs = res.belongs;
          this.status = res.status;

          this.ruleForm = {
            billDate: res.billDate,
            preClearingDate: res.preClearingDate,
            handledBy: res.handledBy,
            handledByName: res.handledByName,
            peerPaymenter: res.peerPaymenter,
            remark: res.remark
          };

          this.infoData = {
            billNo: res.billNo,
            status: res.status,
            companyName: res.companyName,
            cooperatorName: res.cooperatorName,
            timRange: `${res.minBillDate} 至 ${res.maxBillDate}`,
            lastWaitSettledAmount: res.lastWaitSettledAmount,
            amount: res.amount,
            settledAmount: res.settledAmount,
            unSettledAmount: res.unSettledAmount,
            sumUnSettledAmount: res.sumUnSettledAmount,
            createdByName: res.createdByName,
            createdAt: res.createdAt,
            confirmedByName: res.confirmedByName,
            confirmedAt: res.confirmedAt,
            updatedByName: res.updatedByName,
            updatedAt: res.updatedAt
          };

          this.companyId = res.companyId;
          this.settleData = {
            id: res.id,
            billType: "DZ",
            billNo: res.billNo,
            cooperatorId: res.cooperatorId,
            amount: res.unSettledAmount,
            discountAmount: res.discountAmount,
            isSettleIn: Number(res.unSettledAmount || 0) > 0
          };
          this.settleList = [
            {
              name: "单号",
              content: res.billNo
            },
            {
              type: "billType"
            },
            {
              name: "往来单位",
              content: res.cooperatorName
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

          this.supplement = {
            companyId: res.companyId,
            companyName: res.companyName,
            cooperatorId: res.cooperatorId,
            cooperatorName: res.cooperatorName
          };

          this.exportFileName = `${res.cooperatorName}-应收付对账单-${res.billNo}`;
          this.exportData = res.details || [];

          this.loading = false;
          // if (this.isCreate) {
          //   this.settleSelected();
          // }
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
        "rb"
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
      if (this.stetementInData.length + this.stetementOutData.length === 1) {
        tips = "确认删除最后一条明细？删除后该对账单也会被删除。";
      }
      this.$confirm(tips, "提示", { type: "warning" })
        .then(() =>
          removePaymentStatement(
            {
              statementId: this.billId,
              statementDetailId: id
            },
            "rb"
          )
            .then(() => {
              this.isHandleSearch = false;
              this.$message({
                type: "success",
                message: "删除成功！",
                showClose: true
              });
              this.$emit("statement-number-change");
              this.$emit("on-change", this.isHandleSearch);
              if (
                this.stetementInData.length + this.stetementOutData.length ===
                1
              ) {
                this.$emit("update:visible", false);
              } else {
                this.loadData().finally(() => {
                  this.setScopeFocus();
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
            commitPaymentStatement({ statementId: this.billId }, "rb")
              .then(() => {
                this.isHandleSearch = false;
                this.$message({
                  type: "success",
                  message: `${OPERATIONS[type]}成功！`,
                  showClose: true
                });
                this.$emit("statement-number-change");
                this.$emit("on-change", this.isHandleSearch);
                this.loadData().finally(() => {
                  this.setScopeFocus();
                });
                this.commitLoading = false;
              })
              .catch(() => {
                this.commitLoading = false;
              });
          }
          break;
        case "revoke":
          if (this.canRevoke) {
            this.revokeLoading = true;
            revokePaymentStatement({ statementId: this.billId }, "rb")
              .then(() => {
                this.isHandleSearch = false;
                this.$message({
                  type: "success",
                  message: `${OPERATIONS[type]}成功！`,
                  showClose: true
                });
                this.$emit("statement-number-change");
                this.$emit("on-change", this.isHandleSearch);
                this.loadData().finally(() => {
                  this.setScopeFocus();
                });
                this.revokeLoading = false;
              })
              .catch(() => {
                this.revokeLoading = false;
              });
          }
          break;
        case "confirm":
          if (this.canConfirm) {
            this.$confirm(`是否${OPERATIONS[type]}单据?`, "提示", {
              type: "warning"
            })
              .then(() => {
                this.confirmLoading = true;
                confirmPaymentStatement({ statementId: this.billId }, "rb")
                  .then(() => {
                    this.isHandleSearch = false;
                    this.$message({
                      type: "success",
                      message: `${OPERATIONS[type]}成功！`,
                      showClose: true
                    });
                    this.$emit("statement-number-change");
                    this.$emit("on-change", this.isHandleSearch);
                    this.loadData().finally(() => {
                      this.setScopeFocus();
                    });
                    this.confirmLoading = false;
                  })
                  .catch(() => {
                    this.confirmLoading = false;
                  });
              })
              .catch(() => {});
          }
          break;
        case "revokeConfirm":
          if (this.canRevokeConfirm) {
            this.$confirm(`是否${OPERATIONS[type]}单据?`, "提示", {
              type: "warning"
            })
              .then(() => {
                this.revokeConfirmLoading = true;
                revokeConfirmPaymentStatement(
                  { statementId: this.billId },
                  "rb"
                )
                  .then(() => {
                    this.isHandleSearch = false;
                    this.$message({
                      type: "success",
                      message: `${OPERATIONS[type]}成功！`,
                      showClose: true
                    });
                    this.$emit("statement-number-change");
                    this.$emit("on-change", this.isHandleSearch);
                    this.loadData().finally(() => {
                      this.setScopeFocus();
                    });
                    this.revokeConfirmLoading = false;
                  })
                  .catch(() => {
                    this.revokeConfirmLoading = false;
                  });
              })
              .catch(() => {});
          }
          break;
        default:
          break;
      }
    },
    commitAndSettle() {
      if (!this.canClick || !this.canCommitAndSettle) return;
      this.$confirm("是否提交并结算所选单据?", "提示", { type: "warning" })
        .then(() => {
          // this.commitAndSettleLoading = true;
          commitPaymentStatement({ statementId: this.billId }, "rb")
            .then(() => {
              this.isHandleSearch = false;
              this.$emit("statement-number-change");
              this.$emit("on-change", this.isHandleSearch);
              if (this.canClick) {
                this.settleDialogVisible = true;
              }
              // this.settleSelected();
              this.loadData().finally(() => {
                this.setScopeFocus();
              });
              this.commitAndSettleLoading = false;
            })
            .catch(() => {
              this.commitAndSettleLoading = false;
            });
        })
        .catch(() => {});
    },
    settleSelected() {
      if (!this.canClick || !this.canSettle) return;
      this.settleDialogVisible = true;
    },
    handleSingleSettleDialogClose(flag) {
      if (flag) {
        this.settleDialogVisible = false;
        this.isHandleSearch = false;
        this.$message({
          type: "success",
          message: "结算成功！",
          showClose: true
        });
        this.$emit("statement-number-change");
        this.$emit("on-change", this.isHandleSearch);
        this.$emit("update:visible", false);
        this.loadData().finally(() => {
          this.setScopeFocus();
        });
      }
    },
    handleShowSupplementBox() {
      if (!this.canClick || !this.canSupplement) {
        return;
      }
      this.supplementBoxvisible = true;
    },
    handleSupplementSure(ruleForm) {
      createPaymentSupplement({
        statementId: this.billId,
        settleCooperatorId: ruleForm.cooperatorId,
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
          this.isHandleSearch = false;
          this.$emit("statement-number-change");
          this.$emit("on-change", this.isHandleSearch);
          this.loadData().finally(() => {
            this.setScopeFocus();
          });
        })
        .catch(() => {});
    },
    exportHandle() {
      if (!this.canClick || !this.canExport) return;
      this.exportTableVisible = true;
    },
    outExoportHandle(sampleColums) {
      return exportPaymentStatements({
        statementId: this.billId,
        columnsSettings: sampleColums
      });
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
