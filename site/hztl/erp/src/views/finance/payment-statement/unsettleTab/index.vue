<template>
  <div class="container-box">
    <div class="header">
      <el-button
        :disabled="!canCreateSubmit"
        type="primary"
        size="mini"
        @click="verifyHandle(false)"
      >
        去对账（F2）
      </el-button>
      <el-button
        v-if="!hasConfirmFlow"
        :disabled="!canCreateSubmit || !canSettle"
        type="primary"
        size="mini"
        @click="verifyHandle(true)"
      >
        对账并结算（F7）
      </el-button>
      <el-button
        :disabled="!canSupplement"
        type="primary"
        size="mini"
        @click="handleShowSupplementBox"
      >
        补充登记
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
        :model="searchData"
        label-position="left"
        label-width="60px"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label-width="75px">
              <ht-select
                slot="label"
                v-model="searchData.dateType"
                :options="dateTypes"
                :clearable="false"
                class="date-label"
                filterable
              />
              <ht-date-range
                v-model="searchData.timeRange"
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="往来单位" label-width="75px">
              <ht-autoselect
                v-model="searchData.cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllTypesCooperators(query)
                "
                :trigger-on-focus="false"
                placeholder="往来单位"
                remote
                clearable
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收付类型">
              <ht-select
                v-model="searchData.paymentTypes"
                :options="PAYMENT_TYPES"
                placeholder="收付类型"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="业务公司">
              <ht-select
                v-model="searchData.companyIds"
                :options="store().allCompanies()"
                placeholder="业务公司"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="账目类型">
              <ht-select
                v-model="searchData.accountType"
                :options="ACCOUNT_TYPES"
                placeholder="账目类型"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
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

    <ht-card class="auto-card" no-padding>
      <ht-setting-table
        :loading="loading"
        :selected-rows.sync="selectedRows"
        :data="tableData"
        :columns="columns"
        :total="total"
        :current-page="currentPage"
        :table-name="tableName"
        :enable-table-setting="false"
        :summary-method="getSummaries"
        class="settle-list"
        pagination
        show-summary
        @pageChange="handlePageChange"
      />
    </ht-card>

    <DebtDetailBox
      :search-form="debtSearchData"
      :visible.sync="showDebtDetailBox"
      :is-settle="isSettle"
      @on-create="createHandle"
      @on-change="loadData"
    />
    <StatementDetailBox
      :visible.sync="showStetementDetailBox"
      :bill-id="billId"
      is-create
      v-bind="$attrs"
      v-on="$listeners"
      :is-settle="isSettle"
      @on-change="loadData"
    />
    <SupplementBox
      :visible.sync="supplementBoxvisible"
      @sure="handleSupplementSure"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { precisionsFixed, searchMixin } from "@/mixins";
import {
  commitPaymentStatement,
  createPaymentStatementList,
  createUnsettleSupplement,
  loadReceivablePayablesList
} from "@/api/finance/payment";
import { CELL_WIDTH, BELONGS } from "@/constants";
import { ACCOUNT_TYPES, PAYMENT_TYPES } from "@/views/finance/constans";
import DebtDetailBox from "./components/DebtDetailBox";
import StatementDetailBox from "../statementDetailBox";
import eventBus from "@/event";
import SupplementBox from "../../components/SupplementBox";
import * as store from "@/utils/store";

const defaultSearchData = {
  dateType: 0,
  cooperatorId: null,
  paymentTypes: [0, 1],
  timeRange: [],
  companyIds: [],
  accountType: [0, 1]
};

let queryParams = {};

export default {
  name: "UnsettleTab",
  components: {
    DebtDetailBox,
    StatementDetailBox,
    SupplementBox
  },
  mixins: [searchMixin, precisionsFixed],
  data() {
    return {
      dateTypes: ["业务日期", "财务日期"],
      PAYMENT_TYPES,
      ACCOUNT_TYPES,
      showDebtDetailBox: false,
      showStetementDetailBox: false,
      billId: null,
      loading: false,
      summaries: {
        sumAmountIn: 0,
        sumAmountOut: 0,
        sumAmount: 0,
        sumUnCheckedAmount: 0,
        sumUnSettledAmount: 0
      },
      debtSearchData: {},
      isSettle: false,
      currentPage: 1,
      total: 0,
      tableData: [],
      tableName: "financePaymentStatementUnsettleTabTable",
      selectedRows: [],
      searchData: {
        ...defaultSearchData
      },
      columns: [
        {
          prop: "companyName",
          label: "业务公司",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "cooperatorName",
          label: "往来单位",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "amountIn",
          label: "应收",
          width: CELL_WIDTH.money,
          classNames: "number-font",
          formatter: value => Number(value) || "--"
        },
        {
          prop: "amountOut",
          label: "应付",
          width: CELL_WIDTH.money,
          classNames: "number-font",
          formatter: value => Number(value) || "--"
        },
        {
          prop: "paymentMethods",
          label: "欠款",
          align: "center",
          children: [
            {
              prop: "debtAmount",
              label: "合计",
              width: CELL_WIDTH.money,
              classNames: "number-font",
              formatter: value => Number(value) || "--"
            },
            {
              prop: "debtUncheckedAmount",
              label: "未对",
              width: CELL_WIDTH.money,
              classNames: "number-font",
              formatter: value => Number(value) || "--"
            },
            {
              prop: "debtUnsettleAmount",
              label: "已对未结",
              width: CELL_WIDTH.money,
              classNames: "number-font",
              formatter: value => Number(value) || "--"
            }
          ]
        },
        {
          prop: "settledAmount",
          label: "已结",
          width: CELL_WIDTH.money,
          classNames: "number-font"
        },
        {
          prop: "creditAmount",
          label: "信用额度",
          width: CELL_WIDTH.money,
          classNames: "number-font"
        },
        {
          prop: "accountPeriod",
          label: "账期（客户/供应商)",
          width: 130
        },
        {
          prop: "reconciliationDay",
          label: "对账日（客户/供应商）",
          width: 150
        }
      ],
      totalInfo: {},
      supplementBoxvisible: false
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/systemParams", {
      hasConfirmFlow: state => !!state.flows.receiveSettlement
    }),
    canSupplement() {
      return this.hasBelongsPerm("supplement", BELONGS);
    },
    canCreateSubmit() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("createSubmit", this.selectedRows[0].belongs)
      );
    },
    canSettle() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPermWithoutRoute(
          "settle",
          "financials.settlements",
          this.selectedRows[0].belongs
        )
      );
    }
  },
  mounted() {
    this.searchHandle();
  },
  methods: {
    store() {
      return store;
    },
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 41);
    },
    createHandle(rows, isSettle) {
      const paymentIds = rows.map(item => item.id) || [];
      if (isSettle) {
        createPaymentStatementList({ paymentIds }, "rb")
          .then(res => {
            this.billId = Number(res.id);
            this.$emit("statement-number-change");
            commitPaymentStatement({ statementId: this.billId }, "rb")
              .then(() => {
                this.showStetementDetailBox = true;
                this.loadData();
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        createPaymentStatementList({ paymentIds }, "rb")
          .then(res => {
            this.billId = Number(res.id);
            this.showStetementDetailBox = true;
            this.$emit("statement-number-change");
            this.loadData();
          })
          .catch(() => {});
      }
    },
    verifyHandle(isSettle) {
      if (
        (!isSettle && !this.canCreateSubmit) ||
        (isSettle && !this.canSettle)
      ) {
        return;
      }
      this.debtSearchData = {
        paymentTypes: [0, 1],
        statmentStatuses: [0, 1],
        settlementTypes: [0],
        cooperatorName: this.selectedRows[0].cooperatorName,
        cooperatorId: this.selectedRows[0].cooperatorId,
        companyId: this.selectedRows[0].companyId
      };
      this.isSettle = isSettle;
      this.showDebtDetailBox = true;
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        sums[index] = this.totalInfo[column.property];
      });
      return sums;
    },
    //外部父组件调用
    handleUnsettleChange() {
      this.loadData();
    },
    searchHandle() {
      this.currentPage = 1;
      return this.loadData();
    },
    handlePageChange(page) {
      this.currentPage = page;
      return this.loadData();
    },
    getSearchParams() {
      queryParams = { ...this.searchData };
      if (queryParams.timeRange && queryParams.timeRange.length) {
        queryParams = {
          ...queryParams,
          fromDate: queryParams.timeRange[0],
          toDate: queryParams.timeRange[1]
        };
      }
      return {
        ...queryParams,
        page: this.currentPage,
        pageSize: this.pageSize
      };
    },
    resetHandle() {
      this.searchData = { ...defaultSearchData };
    },
    loadData() {
      this.loading = true;
      return loadReceivablePayablesList({ ...this.getSearchParams() })
        .then(res => {
          this.totalInfo = res.totalInfo;
          this.total = res.totalSize;
          this.tableData = res.rows || [];
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
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleShowSupplementBox() {
      if (!this.canSupplement) {
        return;
      }
      this.supplementBoxvisible = true;
    },
    handleSupplementSure(ruleForm) {
      createUnsettleSupplement({
        settlementType: 0,
        companyId: ruleForm.companyId,
        cooperatorId: ruleForm.cooperatorId,
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
