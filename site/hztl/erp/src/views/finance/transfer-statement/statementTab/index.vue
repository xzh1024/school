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
        :loading="revokeLoading"
        :disabled="!canClick || !canRevoke"
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
            <el-form-item label="制单公司" prop="createCompanyIds">
              <ht-select
                v-model="searchForm.createCompanyIds"
                :options="store().allCompanies()"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item prop="relatedCompanyIds" label="往来公司">
              <ht-select
                v-model="searchForm.relatedCompanyIds"
                :options="store().allCompanies()"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="对账状态" prop="statuses">
              <ht-select
                v-model="searchForm.statuses"
                :options="TRANSFER_RECONCILE_STATUS"
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
            <div style="text-align: left;">
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

    <payBox
      :visible.sync="showPayDialog"
      :pay-data="payData"
      @settle-res="handlePayDialogClose"
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
      :settlementType="2"
      @sure="handleSupplementSure"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { precisionsFixed, searchMixin } from "@/mixins";
import {
  commitPaymentStatement,
  loadPaymentStatementList,
  removePaymentStatement,
  revokePaymentStatement,
  createTransferSupplement
} from "@/api/finance/payment";
import StatementDetailBox from "../statementDetailBox";
import { OPERATIONS } from "@/views/finance/constans/index";
import payBox from "../../components/payBox";
import { FINANCE_TRANSFER_UNRECONCILIATION } from "@/constants";
import { PRINT_STATUS, TRANSFER_RECONCILE_STATUS } from "@/constants";
import { openNewWindow } from "@/utils/tool";
import baseIndexJump from "@/utils/baseIndexJump";
import SupplementBox from "../../components/SupplementBox";
import * as store from "@/utils/store";

const defaultSearchData = {
  dateType: 0,
  timeRange: [],
  relatedCompanyIds: [],
  billNo: "",
  statuses: Object.keys(TRANSFER_RECONCILE_STATUS).map(key => Number(key)),
  createCompanyIds: [],
  printStatuses: [0, 1]
};
export default {
  name: "StatementTab",
  components: {
    payBox,
    StatementDetailBox,
    SupplementBox
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
      TRANSFER_RECONCILE_STATUS,
      PRINT_STATUS,
      commitLoading: false,
      revokeLoading: false,
      removeLoading: false,
      payData: {},
      billId: null,
      showPayDialog: false,
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
      tableName: FINANCE_TRANSFER_UNRECONCILIATION.name,
      tableColumns: FINANCE_TRANSFER_UNRECONCILIATION.columns,
      isHandleSearch: false,
      supplementBoxvisible: false,
      supplement: {}
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapGetters("admin/systemParams", ["sumQueryDefaultDateRange"]),
    canClick() {
      return !this.commitLoading && !this.revokeLoading && !this.removeLoading;
    },
    canHandleRowEdit() {
      return this.selectedRows.length === 1;
    },
    canRead() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("read", this.selectedRows[0].belongs)
      );
    },
    canSupplement() {
      return (
        this.selectedRows.length === 1 &&
        this.selectedRows[0].actions.supplement
      );
    },
    canRemove() {
      return (
        this.selectedRows.length === 1 && this.selectedRows[0].actions.delete
      );
    },
    canCommit() {
      return (
        this.selectedRows.length === 1 && this.selectedRows[0].actions.submit
      );
    },
    canRevoke() {
      return (
        this.selectedRows.length === 1 && this.selectedRows[0].actions.revoke
      );
    },
    canPay() {
      return this.selectedRows.length === 1 && this.selectedRows[0].actions.pay;
    },
    canPayComfirm() {
      return (
        this.selectedRows.length === 1 && this.selectedRows[0].actions.receive
      );
    },
    canPrint() {
      return (
        this.selectedRows.length === 1 && this.selectedRows[0].actions.print
      );
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "/TransferStatement" &&
        to.query.tabName === "Statement" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    sumQueryDefaultDateRange(val) {
      defaultSearchData.timeRange = val;
      this.searchData.timeRange = val;
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
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "transferStatement" && jumpData) {
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
        page: this.page,
        pageSize: this.pageSize,
        timeRange: undefined
      };
    },
    loadData() {
      this.loading = true;
      return loadPaymentStatementList({ ...this.getSearchParams() }, "db")
        .then(res => {
          this.summaryTotals = {
            sumAmount: res.totalInfo.amount,
            sumSettledAmount: res.totalInfo.settledAmount,
            sumUnSettledAmount: res.totalInfo.unSettledAmount,
            sumDiscountAmount: res.totalInfo.discountAmount
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
                  "db"
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
              "db"
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
              "db"
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
        default:
          break;
      }
    },
    paySelected(type) {
      this.payData = {
        statementId: this.selectedRows[0].id,
        rpType: type
      };
      this.showPayDialog = true;
    },
    handlePayDialogClose(flag) {
      if (flag) {
        this.showPayDialog = false;
        this.isHandleSearch = false;
        this.$emit("statement-number-change");
        this.loadData();
      }
    },
    printHandle() {
      if (!this.canClick || !this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: `/Print/financials/statements-db/print/${this.selectedRows[0].id}`
        }).href,
        "print"
      );
    },
    handleShowSupplementBox() {
      if (!this.canClick || !this.canSupplement) {
        return;
      }
      this.supplement = {
        settleCooperatorId: this.selectedRows[0].relatedCompanyId,
        settleCooperatorName: this.selectedRows[0].relatedCompanyName
      };
      this.supplementBoxvisible = true;
    },
    handleSupplementSure(ruleForm) {
      createTransferSupplement({
        settleCooperatorId: ruleForm.settleCooperatorId,
        statementId: this.selectedRows[0].id,
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
