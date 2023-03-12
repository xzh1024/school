<template>
  <div class="container-box">
    <div class="header">
      <el-button
        :disabled="!canVerify || !canCreateSubmit"
        type="primary"
        size="mini"
        @click="verifyHandle(false)"
      >
        去对账（F2）
      </el-button>
      <el-button
        v-if="!hasConfirmFlow"
        :disabled="!canVerify || !canCreateSubmit || !canSettle"
        type="primary"
        size="mini"
        @click="verifyHandle(true)"
      >
        对账并结算（F7）
      </el-button>
      <el-button type="primary" size="mini" @click="handleShowSupplementBox">
        补充登记
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
      <el-row :gutter="5" style="height: 100%;">
        <el-col :span="12" style="display: flex; height: 100%;">
          <ht-card title="物流公司账目汇总" class="auto-card" no-padding>
            <LogisticsDebtList
              ref="refLogisticsDebtList"
              :query-params="queryParams"
              @rows-change="handleSelectedLogisticsDebtListRows"
            />
          </ht-card>
        </el-col>
        <el-col :span="12" style="display: flex; height: 100%;">
          <ht-card title="往来单位账目汇总" class="auto-card" no-padding>
            <CooperatorDebtList
              ref="refCooperatorDebtList"
              :logistic-id="logisticId"
              :company-id="companyId"
              :query-params="queryParams"
              @rows-change="handleSelectedCooperatorDebtListRows"
            />
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>

    <DebtDetailBox
      :visible.sync="showDebtDetailBox"
      :search-form="debtSearchData"
      :is-settle="isSettle"
      :is-cooperator="isCooperator"
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
      :settlementType="1"
      @sure="handleSupplementSure"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CooperatorDebtList,
  DebtDetailBox,
  LogisticsDebtList,
  Search
} from "./components";
import StatementDetailBox from "../statementDetailBox";
import {
  commitPaymentStatement,
  createPaymentStatementList,
  createUnsettleSupplement
} from "@/api/finance/payment";
import eventBus from "@/event";
import SupplementBox from "../../components/SupplementBox";
import { BELONGS } from "@/constants";

export default {
  name: "UnsettleTab",
  components: {
    Search,
    LogisticsDebtList,
    CooperatorDebtList,
    DebtDetailBox,
    StatementDetailBox,
    SupplementBox
  },
  data() {
    return {
      isSettle: true,
      queryParams: {},
      logisticId: 0,
      companyId: 0,
      selectedLogisticsDebtListRows: [],
      selectedCooperatorDebtListRows: [],
      showDebtDetailBox: false,
      debtSearchData: {
        timeRange: []
      },
      showStetementDetailBox: false,
      billId: null,
      isCooperator: false,
      supplementBoxvisible: false
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      hasConfirmFlow: state => !!state.flows.logisticReconciliation
    }),
    canVerify() {
      return (
        this.selectedLogisticsDebtListRows.length ||
        this.selectedCooperatorDebtListRows.length
      );
    },
    canCreateSubmit() {
      return (
        this.selectedLogisticsDebtListRows.length === 1 &&
        this.hasBelongsPerm(
          "createSubmit",
          this.selectedLogisticsDebtListRows[0].belongs
        )
      );
    },
    canSettle() {
      return (
        this.selectedLogisticsDebtListRows.length === 1 &&
        this.hasBelongsPermWithoutRoute(
          "settle",
          "financials.settlements",
          this.selectedLogisticsDebtListRows[0].belongs
        )
      );
    },
    canSupplement() {
      return this.hasBelongsPerm("supplement", BELONGS);
    }
  },
  methods: {
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 42);
    },
    searchHandle(queryParams) {
      this.queryParams = { ...queryParams };
    },
    loadData() {
      return this.$refs.refLogisticsDebtList.loadData();
    },
    handleSelectedLogisticsDebtListRows(rows) {
      this.selectedLogisticsDebtListRows = rows || [];
      if (this.selectedLogisticsDebtListRows.length) {
        this.logisticId = this.selectedLogisticsDebtListRows[0].cooperatorId;
        this.companyId = this.selectedLogisticsDebtListRows[0].companyId;
        this.$nextTick(() => {
          this.$refs.refCooperatorDebtList.loadData();
        });
      } else {
        this.logisticId = 0;
        this.companyId = 0;
        this.$refs.refCooperatorDebtList.clearData();
      }
    },
    handleSelectedCooperatorDebtListRows(rows) {
      this.selectedCooperatorDebtListRows = rows || [];
    },
    verifyHandle(isSettle) {
      if (
        !this.canVerify ||
        (!isSettle && !this.canCreateSubmit) ||
        (isSettle && !this.canSettle)
      ) {
        return;
      }
      if (
        this.$refs.refLogisticsDebtList.$el.querySelector(".is-hotkey-active")
      ) {
        this.isCooperator = false;
        this.debtSearchData = {
          paymentTypes: [0, 1],
          statmentStatuses: [0, 1],
          settlementTypes: [1],
          logisticId: this.logisticId,
          companyId: this.selectedLogisticsDebtListRows.length
            ? this.selectedLogisticsDebtListRows[0].companyId
            : null,
          cooperatorName: this.selectedLogisticsDebtListRows.length
            ? this.selectedLogisticsDebtListRows[0].cooperatorName
            : ""
        };
      } else {
        this.isCooperator = true;
        this.debtSearchData = {
          paymentTypes: [0, 1],
          statmentStatuses: [0, 1],
          settlementTypes: [1],
          logisticId: this.logisticId,
          cooperatorId: this.selectedCooperatorDebtListRows.length
            ? this.selectedCooperatorDebtListRows[0].cooperatorId
            : null,
          companyId: this.selectedCooperatorDebtListRows.length
            ? this.selectedCooperatorDebtListRows[0].companyId
            : null,
          cooperatorName: this.selectedCooperatorDebtListRows.length
            ? this.selectedCooperatorDebtListRows[0].cooperatorName
            : ""
        };
      }
      this.isSettle = isSettle;
      this.showDebtDetailBox = true;
    },
    createHandle(rows, isSettle) {
      const paymentIds = rows.map(item => item.id) || [];
      if (isSettle) {
        createPaymentStatementList({ paymentIds }, "lg")
          .then(res => {
            this.billId = Number(res.id);
            this.$emit("statement-number-change");
            commitPaymentStatement({ statementId: this.billId }, "lg")
              .then(() => {
                this.showStetementDetailBox = true;
                this.loadData();
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        createPaymentStatementList({ paymentIds }, "lg")
          .then(res => {
            this.billId = Number(res.id);
            this.showStetementDetailBox = true;
            this.loadData();
            this.$emit("statement-number-change");
          })
          .catch(() => {});
      }
    },
    handleShowSupplementBox() {
      this.supplementBoxvisible = true;
    },
    handleSupplementSure(ruleForm) {
      createUnsettleSupplement({
        settlementType: 1,
        companyId: ruleForm.companyId,
        cooperatorId: ruleForm.logisticsCompanyId,
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
