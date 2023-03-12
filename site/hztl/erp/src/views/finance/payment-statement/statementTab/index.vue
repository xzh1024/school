<template>
  <div class="container-box">
    <div class="header">
      <el-button
        :disabled="!canClick || !canRead"
        type="primary"
        size="mini"
        @click="gotoDetail(selectedRows[0].id)"
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
        @click="updateBillStatus('remove')"
      >
        {{ OPERATIONS.remove }}（F4）
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
        :loading="revokeLoading"
        :disabled="!canClick || !canRevoke"
        type="primary"
        size="mini"
        @click="updateBillStatus('revoke')"
      >
        {{ OPERATIONS.revoke }}（F9）
      </el-button>
      <el-button
        v-if="hasConfirmFlow"
        :loading="confirmLoading"
        :disabled="!canClick || !canConfirm"
        type="primary"
        size="mini"
        @click="updateBillStatus('confirm')"
      >
        {{ OPERATIONS.confirm }}
      </el-button>
      <el-button
        :loading="revokeConfirmLoading"
        :disabled="!canClick || !canRevokeConfirm"
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
        :disabled="!canClick || !canPrint"
        type="primary"
        size="mini"
        @click="printHandle"
      >
        打印（F11）
      </el-button>
      <el-button
        :disabled="!canClick || !canExport"
        :loading="exportLoading"
        type="primary"
        size="mini"
        @click="exportHandle"
      >
        导出（Alt+D）
      </el-button>
      <span
        class="text-danger"
        style="cursor:pointer;float:right"
        @click="openManualDialog"
        ><i class="el-icon-question"></i>如何使用应收付对账</span
      >
    </div>
    <ht-card>
      <el-form
        :model="searchForm"
        class="form-item-small-margin-bottom"
        label-position="left"
        label-width="61px"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label-width="75px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                :options="dateTypes"
                :clearable="false"
                class="date-label"
                filterable
              />
              <ht-date-range
                v-model="searchForm.timeRange"
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="单号查询" prop="billNo" label-width="75px">
              <ht-input v-model="searchForm.billNo" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="对账公司" prop="companyIds">
              <ht-select
                v-model="searchForm.companyIds"
                :options="store().allCompanies()"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item prop="cooperatorId" label="往来单位">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllTypesCooperators(query)
                "
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="对账状态" prop="statuses">
              <ht-select
                v-model="searchForm.statuses"
                :options="PAYMENT_BILL_STATUS"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="打印状态" prop="printStatuses">
              <ht-select
                v-model="searchForm.printStatuses"
                :options="PRINT_STATUS"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="经办人" prop="operator">
              <ht-autocomplete
                v-model="searchForm.operator"
                :fetch-suggestions="autocompleteSearchStaffs"
                :trigger-on-focus="false"
                clearable
                highlight-first-item
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="searchHandle">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetHandle">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ht-setting-table
        :loading="loading"
        :data="tableData"
        :columns="tableColumns"
        :table-name="tableName"
        :current-page="page"
        :total="totalSize"
        :selected-rows.sync="selectedRows"
        :summary-method="getSummaries"
        pagination
        show-summary
        @rowOperation="handleRowEdit"
        @pageChange="pageChangeHandle"
      />
    </ht-card>

    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :companyId="companyId"
      @settleSuccess="handleSingleSettleDialogClose"
    />
    <StatementDetailBox
      :visible.sync="showStetementDetailBox"
      :bill-id="billId"
      v-bind="$attrs"
      v-on="$listeners"
      @on-change="handleStatementDetailChange"
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
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { precisionsFixed, searchMixin } from "@/mixins";
import {
  commitPaymentStatement,
  confirmPaymentStatement,
  createPaymentSupplement,
  loadPaymentStatementList,
  removePaymentStatement,
  revokeConfirmPaymentStatement,
  revokePaymentStatement,
  exportPaymentStatements,
  loadPaymentStatementDetail
} from "@/api/finance/payment";
import StatementDetailBox from "../statementDetailBox";
import { OPERATIONS } from "@/views/finance/constans/index";
import { SettleDialog } from "@/components/business";
import { FINANCE_PAYMENT_UNRECONCILIATION } from "@/constants";
import { PAYMENT_BILL_STATUS, PRINT_STATUS } from "@/constants";
import eventBus from "@/event";
import { openNewWindow } from "@/utils/tool";
import SupplementBox from "../../components/SupplementBox";
import { ExportTable } from "@/components/table";
import { FINANCE_PAYMENT_STATEMENT_DETAIL } from "@/constants";
import baseIndexJump from "@/utils/baseIndexJump";
import * as store from "@/utils/store";

const defaultSearchData = {
  dateType: 0,
  timeRange: [],
  cooperatorId: null,
  billNo: "",
  statuses: Object.keys(PAYMENT_BILL_STATUS).map(key => Number(key)),
  companyIds: [],
  operator: "",
  printStatuses: [0, 1]
};

export default {
  name: "StatementTab",
  components: {
    SettleDialog,
    StatementDetailBox,
    SupplementBox,
    ExportTable
  },
  mixins: [precisionsFixed, searchMixin],
  props: {
    keyScope: {
      type: [Symbol, String],
      default: Symbol("StatementTab")
    }
  },
  data() {
    return {
      OPERATIONS,
      PAYMENT_BILL_STATUS,
      PRINT_STATUS,
      commitLoading: false,
      commitAndSettleLoading: false,
      revokeLoading: false,
      removeLoading: false,
      confirmLoading: false,
      revokeConfirmLoading: false,
      exportLoading: false,
      settleData: {},
      settleList: [],
      companyId: 0,
      billId: null,
      settleDialogVisible: false,
      showStetementDetailBox: false,
      searchForm: {
        ...defaultSearchData
      },
      dateTypes: [
        { id: 0, name: "对账日期" },
        { id: 1, name: "制单时间" }
      ],
      summaryTotals: {
        sumAmount: 0,
        sumSettledAmount: 0,
        sumDiscountAmount: 0,
        sumUnSettledAmount: 0
      },
      loading: false,
      page: 1,
      totalSize: 0,
      selectedRows: [],
      tableData: [],
      tableName: FINANCE_PAYMENT_UNRECONCILIATION.name,
      tableColumns: FINANCE_PAYMENT_UNRECONCILIATION.columns,
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
    ...mapGetters("admin/systemParams", ["sumQueryDefaultDateRange"]),
    ...mapState("admin/table", ["pageSize"]),
    canClick() {
      return (
        !this.commitLoading &&
        !this.commitAndSettleLoading &&
        !this.revokeLoading &&
        !this.removeLoading &&
        !this.confirmLoading &&
        !this.revokeConfirmLoading &&
        !this.exportLoading
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
    },
    canExport() {
      return this.selectedRows.length === 1;
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "/PaymentStatement" &&
        to.query.tabName === "Statement" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    sumQueryDefaultDateRange(val) {
      defaultSearchData.timeRange = val;
      this.searchForm.timeRange = val;
    }
  },
  mounted() {
    defaultSearchData.timeRange = this.sumQueryDefaultDateRange;
    this.resetHandle();
    this.toDoHandle();
  },
  methods: {
    store() {
      return store;
    },
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 41);
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "paymentStatement" && jumpData) {
        this.searchForm = {
          ...defaultSearchData,
          billNo: jumpData,
          timeRange: []
        };
        baseIndexJump.clearInfo();
        this.searchHandle();
      } else {
        this.searchHandle();
      }
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "amount":
            sums[index] = this.summaryTotals["sumAmount"];
            break;
          case "settledAmount":
            sums[index] = this.summaryTotals["sumSettledAmount"];
            break;
          case "unSettledAmount":
            sums[index] = this.summaryTotals["sumUnSettledAmount"];
            break;
          case "discountAmount":
            sums[index] = this.summaryTotals["sumDiscountAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
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
    searchHandle() {
      this.isHandleSearch = true;
      this.page = 1;
      this.$emit("statement-number-change");
      return this.loadData();
    },
    pageChangeHandle(page) {
      this.page = page;
      return this.loadData();
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchData };
    },
    getSearchParams() {
      let searchForm = { ...this.searchForm };
      if (searchForm.timeRange && searchForm.timeRange.length) {
        searchForm = {
          ...searchForm,
          fromDate: searchForm.timeRange[0],
          toDate: searchForm.timeRange[1]
        };
      }
      return {
        ...searchForm,
        settlementTypes: [0],
        page: this.page,
        pageSize: this.pageSize,
        timeRange: undefined
      };
    },
    loadData() {
      this.loading = true;
      return loadPaymentStatementList({ ...this.getSearchParams() }, "rb")
        .then(res => {
          this.summaryTotals = {
            sumAmount: res.sumAmount,
            sumSettledAmount: res.sumSettledAmount,
            sumUnSettledAmount: res.sumUnSettledAmount,
            sumDiscountAmount: res.sumDiscountAmount
          };
          this.totalSize = res.totalSize;
          this.tableData = res.rows || [];
          if (this.isHandleSearch) {
            this.selectedRows = this.tableData.length
              ? [this.tableData[0]]
              : [];
          } else {
            let selectedRow;
            if (this.selectedRows.length) {
              selectedRow = this.tableData.find(
                item => item.id === this.selectedRows[0].id
              );
            }
            this.selectedRows = selectedRow
              ? [selectedRow]
              : this.tableData.length
              ? [this.tableData[0]]
              : [];
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleRowEdit(row) {
      if (!this.canHandleRowEdit) return;
      if (!row.id) return;
      this.gotoDetail(row.id);
    },
    gotoDetail(id) {
      if (!this.canRead) return;
      this.billId = Number(id);
      this.showStetementDetailBox = true;
    },
    updateBillStatus(type) {
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
                  "rb"
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
              "rb"
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
              "rb"
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
                  "rb"
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
                  "rb"
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
            "rb"
          )
            .then(() => {
              this.isHandleSearch = false;
              this.$emit("statement-number-change");
              this.loadData()
                .then(() => {
                  this.commitAndSettleLoading = false;
                  this.settleSelected();
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
    settleSelected() {
      if (!this.canClick || !this.canSettle) return;
      this.companyId = this.selectedRows[0].companyId;
      this.settleData = {
        id: this.selectedRows[0].id,
        billType: "DZ",
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
          name: "往来单位",
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
          path: `/Print/PaymentStatements/Detail/${this.selectedRows[0].id}`
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
        cooperatorId: this.selectedRows[0].cooperatorId,
        cooperatorName: this.selectedRows[0].cooperatorName
      };
      this.supplementBoxvisible = true;
    },
    handleSupplementSure(ruleForm) {
      createPaymentSupplement({
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
    },
    exportHandle() {
      if (!this.canClick || !this.canExport) return;
      this.exportLoading = true;
      loadPaymentStatementDetail({ statementId: this.selectedRows[0].id }, "rb")
        .then(res => {
          this.exportData = res.details || [];
          this.exportFileName = `${this.selectedRows[0].cooperatorName}-应收付对账单-${this.selectedRows[0].billNo}`;
          this.exportTableVisible = true;
        })
        .finally(() => {
          this.exportLoading = false;
        });
    },
    outExoportHandle(sampleColums) {
      return exportPaymentStatements({
        statementId: this.selectedRows[0].id,
        columnsSettings: sampleColums
      });
    }
  }
};
</script>
