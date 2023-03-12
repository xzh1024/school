<template>
  <div class="container-box">
    <div class="header">
      <el-button
        :disabled="!canClick || !canRead"
        type="primary"
        size="mini"
        @click="gotoDetail"
      >
        查改（F3）
      </el-button>
      <el-button
        :disabled="!canClick || !canSupplement"
        type="primary"
        size="mini"
        @click="handleShowSupplementBox"
      >
        补充登记
      </el-button>
      <el-button
        :loading="removeLoading"
        :disabled="!canClick || !canRemove"
        type="primary"
        size="mini"
        @click="handleBillStatus('remove')"
      >
        {{ OPERATIONS.remove }}（F4）
      </el-button>
      <el-button
        :disabled="!canClick || !canCommit"
        :loading="commitLoading"
        type="primary"
        size="mini"
        @click="handleBillStatus('commit')"
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
        :loading="revokeLoading"
        :disabled="!canClick || !canRevoke"
        type="primary"
        size="mini"
        @click="handleBillStatus('revoke')"
      >
        {{ OPERATIONS.revoke }}（F9）
      </el-button>
      <el-button
        v-if="hasConfirmFlow"
        :loading="confirmLoading"
        :disabled="!canClick || !canConfirm"
        type="primary"
        size="mini"
        @click="handleBillStatus('confirm')"
      >
        {{ OPERATIONS.confirm }}
      </el-button>
      <el-button
        :loading="revokeConfirmLoading"
        :disabled="!canClick || !canRevokeConfirm"
        type="primary"
        size="mini"
        @click="handleBillStatus('revokeConfirm')"
      >
        {{ OPERATIONS.revokeConfirm }}
      </el-button>
      <el-button
        :disabled="!canClick || !canSettle"
        type="primary"
        size="mini"
        @click="settleHandle"
      >
        结算（F7）
      </el-button>
      <el-button
        :disabled="!canClick || !canPrint"
        type="primary"
        size="mini"
        @click="printHandle"
      >
        打印（F11）
      </el-button>
      <span
        class="text-danger"
        style="cursor:pointer;float:right"
        @click="openManualDialog"
        ><i class="el-icon-question"></i>如何使用物流代收对账</span
      >
    </div>
    <ht-card>
      <Search @on-search="searchHandle" />
    </ht-card>
    <ht-card no-background no-padding class="auto-card">
      <StatementList
        ref="refStatementList"
        :query-params="queryParams"
        :is-handle-search="isHandleSearch"
        @rows-change="handleSelectedRows"
        @rowOperation="handleRowEdit"
      />
    </ht-card>

    <StatementDetailBox
      :visible.sync="showStetementDetailBox"
      :bill-id="billId"
      v-bind="$attrs"
      v-on="$listeners"
      @on-change="handleStatementDetailChange"
    />
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
      :settlementType="1"
      @sure="handleSupplementSure"
    />
  </div>
</template>

<script>
import { Search, StatementList } from "./components";
import { SettleDialog } from "@/components/business";
import StatementDetailBox from "../statementDetailBox";
import { mapState } from "vuex";
import { OPERATIONS } from "@/views/finance/constans/index";
import {
  commitPaymentStatement,
  confirmPaymentStatement,
  createCollectionSupplement,
  removePaymentStatement,
  revokeConfirmPaymentStatement,
  revokePaymentStatement
} from "@/api/finance/payment";
import eventBus from "@/event";
import { openNewWindow } from "@/utils/tool";
import SupplementBox from "../../components/SupplementBox";

export default {
  name: "StatementTab",
  components: {
    Search,
    StatementList,
    SettleDialog,
    StatementDetailBox,
    SupplementBox
  },
  data() {
    return {
      queryParams: {},
      OPERATIONS,
      commitLoading: false,
      commitAndSettleLoading: false,
      revokeLoading: false,
      removeLoading: false,
      confirmLoading: false,
      revokeConfirmLoading: false,
      showStetementDetailBox: false,
      billId: null,
      settleDialogVisible: false,
      settleData: {},
      settleList: [],
      companyId: 0,
      selectedRows: [],
      isHandleSearch: false,
      supplementBoxvisible: false,
      supplement: {}
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      hasConfirmFlow: state => !!state.flows.logisticReconciliation
    }),
    canClick() {
      return (
        !this.commitLoading &&
        !this.commitAndSettleLoading &&
        !this.revokeLoading &&
        !this.removeLoading &&
        !this.confirmLoading &&
        !this.revokeConfirmLoading
      );
    },
    canHandleRowEdit() {
      return this.selectedRows.length;
    },
    canRead() {
      return (
        this.selectedRows.length &&
        this.hasBelongsPerm("read", this.selectedRows[0].belongs)
      );
    },
    canSupplement() {
      return (
        this.selectedRows.length === 1 &&
        this.selectedRows[0].status === 0 &&
        this.hasBelongsPerm("supplement", this.selectedRows[0].belongs)
      );
    },
    canRemove() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].status === 0 &&
        this.hasBelongsPerm("delete", this.selectedRows[0].belongs)
      );
    },
    canCommit() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].status === 0 &&
        this.hasBelongsPerm("createSubmit", this.selectedRows[0].belongs)
      );
    },
    canCommitAndSettle() {
      return (
        !this.hasConfirmFlow &&
        this.selectedRows.length &&
        this.selectedRows[0].status === 0 &&
        this.hasBelongsPerm("createSubmit", this.selectedRows[0].belongs) &&
        this.hasBelongsPermWithoutRoute(
          "settle",
          "financials.settlements",
          this.selectedRows[0].belongs
        )
      );
    },
    canRevoke() {
      return (
        this.hasConfirmFlow &&
        this.selectedRows.length &&
        this.selectedRows[0].status === 1 &&
        this.hasBelongsPerm("submitRecall", this.selectedRows[0].belongs)
      );
    },
    canConfirm() {
      return (
        this.hasConfirmFlow &&
        this.selectedRows.length &&
        this.selectedRows[0].status === 1 &&
        this.hasBelongsPerm("confirm", this.selectedRows[0].belongs)
      );
    },
    canRevokeConfirm() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].status === 2 &&
        this.hasBelongsPerm("confirmRecall", this.selectedRows[0].belongs)
      );
    },
    canSettle() {
      return (
        this.selectedRows.length &&
        [2, 3].includes(this.selectedRows[0].status) &&
        this.hasBelongsPermWithoutRoute(
          "settle",
          "financials.settlements",
          this.selectedRows[0].belongs
        )
      );
    },
    canPrint() {
      return (
        this.selectedRows.length === 1 &&
        this.selectedRows[0].canPrint &&
        this.hasBelongsPerm("print", this.selectedRows[0].belongs)
      );
    }
  },
  methods: {
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 42);
    },
    searchHandle(queryParams) {
      this.$emit("statement-number-change");
      this.isHandleSearch = true;
      this.queryParams = { ...queryParams };
    },
    //外部父组件调用
    handleStatementChange() {
      this.isHandleSearch = true;
      this.loadData();
    },
    handleStatementDetailChange(value) {
      this.isHandleSearch = value;
      this.loadData();
    },
    loadData() {
      return this.$refs.refStatementList.loadData();
    },
    handleSelectedRows(rows) {
      this.selectedRows = rows || [];
    },
    handleRowEdit() {
      if (!this.canHandleRowEdit) return;
      this.gotoDetail();
    },
    gotoDetail() {
      if (!this.canRead) return;
      this.billId = Number(this.selectedRows[0].id);
      this.showStetementDetailBox = true;
    },
    handleBillStatus(type) {
      if (!this.canClick || !this.selectedRows.length) return;
      switch (type) {
        case "remove":
          if (this.canRemove) {
            this.$confirm(`是否${OPERATIONS[type]}所选单据?`, "提示", {
              type: "warning"
            })
              .then(() => {
                this.removeLoading = true;
                removePaymentStatement(
                  {
                    statementId: Number(this.selectedRows[0].id)
                  },
                  "lg"
                )
                  .then(() => {
                    this.isHandleSearch = false;
                    this.$emit("statement-number-change");
                    this.$message({
                      type: "success",
                      message: `${OPERATIONS[type]}成功！`,
                      showClose: true
                    });
                    this.loadData()
                      .then(() => {
                        this.removeLoading = false;
                      })
                      .catch(() => {
                        this.removeLoading = false;
                      });
                  })
                  .catch(() => {
                    this.removeLoading = false;
                  });
              })
              .catch(() => {});
          }
          break;
        case "commit":
          if (this.canCommit) {
            this.commitLoading = true;
            commitPaymentStatement(
              {
                statementId: Number(this.selectedRows[0].id)
              },
              "lg"
            )
              .then(() => {
                this.isHandleSearch = false;
                this.$emit("statement-number-change");
                this.$message({
                  type: "success",
                  message: `${OPERATIONS[type]}成功！`,
                  showClose: true
                });
                this.loadData()
                  .then(() => {
                    this.commitLoading = false;
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
            revokePaymentStatement(
              {
                statementId: Number(this.selectedRows[0].id)
              },
              "lg"
            )
              .then(() => {
                this.isHandleSearch = false;
                this.$emit("statement-number-change");
                this.$message({
                  type: "success",
                  message: `${OPERATIONS[type]}成功！`,
                  showClose: true
                });
                this.loadData()
                  .then(() => {
                    this.revokeLoading = false;
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
        case "confirm":
          if (this.canConfirm) {
            this.$confirm(`是否${OPERATIONS[type]}所选单据?`, "提示", {
              type: "warning"
            })
              .then(() => {
                this.confirmLoading = true;
                confirmPaymentStatement(
                  {
                    statementId: Number(this.selectedRows[0].id)
                  },
                  "lg"
                )
                  .then(() => {
                    this.isHandleSearch = false;
                    this.$emit("statement-number-change");
                    this.$message({
                      type: "success",
                      message: `${OPERATIONS[type]}成功！`,
                      showClose: true
                    });
                    this.loadData()
                      .then(() => {
                        this.confirmLoading = false;
                      })
                      .catch(() => {
                        this.confirmLoading = false;
                      });
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
            this.$confirm(`是否${OPERATIONS[type]}所选单据?`, "提示", {
              type: "warning"
            })
              .then(() => {
                this.revokeConfirmLoading = true;
                revokeConfirmPaymentStatement(
                  {
                    statementId: Number(this.selectedRows[0].id)
                  },
                  "lg"
                )
                  .then(() => {
                    this.isHandleSearch = false;
                    this.$emit("statement-number-change");
                    this.$message({
                      type: "success",
                      message: `${OPERATIONS[type]}成功！`,
                      showClose: true
                    });
                    this.loadData()
                      .then(() => {
                        this.revokeConfirmLoading = false;
                      })
                      .catch(() => {
                        this.revokeConfirmLoading = false;
                      });
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
          this.commitAndSettleLoading = true;
          commitPaymentStatement(
            {
              statementId: Number(this.selectedRows[0].id)
            },
            "lg"
          )
            .then(() => {
              this.isHandleSearch = false;
              this.$emit("statement-number-change");
              this.loadData()
                .then(() => {
                  this.commitAndSettleLoading = false;
                  this.settleHandle();
                })
                .catch(() => {
                  this.commitAndSettleLoading = false;
                });
            })
            .catch(() => {
              this.commitAndSettleLoading = false;
            });
        })
        .catch(() => {});
    },
    settleHandle() {
      if (!this.canClick || !this.canSettle) return;
      this.companyId = this.selectedRows[0].companyId;
      this.settleData = {
        id: this.selectedRows[0].id,
        billType: "DS",
        billNo: this.selectedRows[0].billNo,
        cooperatorId: this.selectedRows[0].cooperatorId,
        amount: this.selectedRows[0].unSettledAmount,
        discountAmount: this.selectedRows[0].discountAmount,
        isSettleIn: Number(this.selectedRows[0].unSettledAmount || 0) > 0
      };
      this.settleList = [
        {
          name: "单号",
          content: this.selectedRows[0].billNo
        },
        {
          type: "billType"
        },
        {
          name: "物流公司",
          content: this.selectedRows[0].cooperatorName
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
        this.loadData();
      }
    },
    printHandle() {
      if (!this.canClick || !this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: `/Print/CollectionStatements/Detail/${this.selectedRows[0].id}`
        }).href,
        "print"
      );
    },
    handleShowSupplementBox() {
      if (!this.canClick || !this.canSupplement) {
        return;
      }
      this.supplement = {
        companyId: this.selectedRows[0].companyId,
        companyName: this.selectedRows[0].companyName,
        logisticsCompanyId: this.selectedRows[0].cooperatorId,
        logisticsCompanyName: this.selectedRows[0].cooperatorName,
        cooperators: this.selectedRows[0].settleCooperators || []
      };
      this.supplementBoxvisible = true;
    },
    handleSupplementSure(ruleForm) {
      createCollectionSupplement({
        statementId: this.selectedRows[0].id,
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
          this.loadData();
        })
        .catch(() => {});
    }
  }
};
</script>
