<template>
  <div class="container-box">
    <div class="header">
      <el-button
        :disabled="!canCreateSubmit"
        type="primary"
        size="mini"
        @click="verifyHandle"
      >
        去对账（F2）
      </el-button>
      <el-button
        :disabled="!canSupplement"
        type="primary"
        size="mini"
        @click="handleShowSupplementBox"
      >
        补充登记
      </el-button>
    </div>

    <ht-card>
      <el-form
        :model="searchData"
        label-position="right"
        label-width="80px"
        inline
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-form-item label-width="75px">
          <ht-select
            slot="label"
            v-model="searchData.dateType"
            :options="dateTypes"
            :clearable="false"
            class="date-label"
            filterable
          />
          <ht-date-range v-model="searchData.timeRange" shortcuts-type="all" />
        </el-form-item>
        <el-form-item label="往来分公司" label-width="75px">
          <ht-select
            v-model="searchData.relatedCompanyIds"
            :options="store().allCompanies()"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
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
        <div style="text-align: right; display:inline-block">
          <el-button type="primary" size="mini" @click.stop="searchHandle">
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click.stop="resetHandle">
            重置（F6）
          </el-button>
        </div>
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
      @on-create="createHandle"
      @on-change="loadData"
    />
    <StatementDetailBox
      :visible.sync="showStetementDetailBox"
      :bill-id="billId"
      is-create
      v-bind="$attrs"
      v-on="$listeners"
      @on-change="loadData"
    />
    <SupplementBox
      :visible.sync="supplementBoxvisible"
      :settlementType="2"
      @sure="handleSupplementSure"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { precisionsFixed, searchMixin } from "@/mixins";
import {
  createPaymentStatementList,
  createTransferBefore,
  loadReceivableTransferList
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
  relatedCompanyIds: [],
  paymentTypes: [0, 1],
  timeRange: []
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
          prop: "relatedCompanyName",
          label: "往来分公司",
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
              prop: "debtUncheckAmount",
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
        }
      ],
      totalInfo: {},
      supplementBoxvisible: false
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/systemParams", {
      allocSupplementMustAudit: state => state.params.allocSupplementMustAudit
    }),
    canSupplement() {
      return (
        !this.allocSupplementMustAudit &&
        this.hasBelongsPerm("supplement", BELONGS)
      );
    },
    canCreateSubmit() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("create", this.selectedRows[0].belongs)
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
    createHandle(rows) {
      const paymentIds = rows.map(item => item.id) || [];
      createPaymentStatementList({ paymentIds }, "db")
        .then(res => {
          this.billId = Number(res.id);
          this.showStetementDetailBox = true;
          this.$emit("statement-number-change");
          this.loadData();
        })
        .catch(() => {});
    },
    verifyHandle() {
      if (!this.canCreateSubmit) {
        return;
      }
      this.debtSearchData = {
        paymentTypes: [0, 1],
        cooperatorName: this.selectedRows[0].relatedCompanyName,
        cooperatorId: this.selectedRows[0].relatedCompanyId
      };
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
      return loadReceivableTransferList({ ...this.getSearchParams() })
        .then(res => {
          this.totalInfo = res.total;
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
      createTransferBefore({
        cooperatorId: ruleForm.settleCooperatorId,
        companyId: this.selectedRows[0]?.companyId,
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
