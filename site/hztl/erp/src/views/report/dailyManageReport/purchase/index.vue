<template>
  <div class="compo-item-wrap">
    <ht-card v-if="activetab === 1" title="采购">
      <ht-setting-table
        v-if="tableData.length"
        class="edit-swap-group-parts"
        v-loading="loading"
        height="150px"
        :total="totalSize"
        :current-page="page"
        :data="tableData"
        :columns="columns"
        setting-all-column
        show-table-setting
        @selectChange="selectChange"
        :selected-rows.sync="selectedDetailsRows"
        :enableTableSetting="true"
        show-summary
        :summary-method="getSummaries"
        :table-name="'financialLogIn.purchase'"
      />
    </ht-card>
    <span v-if="activetab === 1 && tableData.length == 0" class="no-data-tips"
      >[此类目暂无数据]</span
    >
    <span v-if="activetab === 2 && detail.length == 0" class="no-data-tips"
      >[此类目暂无数据]</span
    >
    <!-- 分组 -->
    <ht-card v-if="activetab === 2" title="采购">
      <div
        class="group"
        v-for="(group, groupIndex) in detail"
        :key="groupIndex"
      >
        <div class="customer-title">{{ group.name }}</div>
        <DataTable
          :query="group.query"
          :currentRow="selectedDetailsRows"
          @rowChange="selectChange"
        />
      </div>
      <p class="summary-p" v-if="detail.length">
        <span>合计: </span>
        <span>单据数：{{ totalBills }}</span>
        <span>未税金额：{{ totalUntaxedAmount }}</span>
        <span>税额：{{ totalTaxAmount }}</span>
        <span>进货金额：{{ totalTaxedAmount }}</span>
        <span>本期实付金额：{{ totalThisPeriodSettleAmount }}</span>
        <span>本期优惠金额：{{ totalThisPeriodDiscountAmount }}</span>
        <span>累计实付金额：{{ totalSettleAmount }}</span>
        <span>累计优惠金额：{{ totalDiscountAmount }}</span>
      </p>
    </ht-card>
  </div>
</template>

<script>
import { purchaseSummary, purchaseGroup } from "@/api/dailyManageReport";
import DataTable from "./dataTable";
import purchaseMixin from "../mixins/purchaseMixin";

export default {
  name: "purchase",
  components: {
    DataTable
  },
  mixins: [purchaseMixin],
  methods: {
    getSummary() {
      this.loading = true;
      purchaseSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const {
            rows,
            totalBillCount,
            totalDiscountAmount,
            totalFinancialBillCount,
            totalSettleAmount,
            totalTaxAmount,
            totalTaxedAmount,
            totalThisPeriodDiscountAmount,
            totalThisPeriodSettleAmount,
            totalUntaxedAmount
          } = res;
          if (rows) {
            this.rawData = res.rows;
          } else {
            this.rawData = [];
          }
          // 把两项总计推到数组里面
          this.tableData = [...this.rawData];
          this.summaryData = {
            index: "合计:",
            settlementType: "",
            billCount: totalBillCount,
            financialBillCount: totalFinancialBillCount,
            untaxedAmount: totalUntaxedAmount,
            taxAmount: totalTaxAmount,
            taxedAmount: totalTaxedAmount,
            thisPeriodSettleAmount: totalThisPeriodSettleAmount,
            thisPeriodDiscountAmount: totalThisPeriodDiscountAmount,
            settleAmount: totalSettleAmount,
            discountAmount: totalDiscountAmount
          };
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 获取分组信息
    getGroups() {
      this.detail = [];
      this.totalBills = 0;
      this.totalTaxAmount = 0;
      this.totalTaxedAmount = 0;
      this.totalUntaxedAmount = 0;
      this.totalDiscountAmount = 0;
      this.totalSettleAmount = 0;
      this.totalThisPeriodSettleAmount = 0;
      this.totalThisPeriodDiscountAmount = 0;
      purchaseGroup({
        ...this.localQuery,
        pageSize: this.pageSize
      }).then(res => {
        if (!res) {
          this.detail = [];
          return;
        }
        // 前端将所有合计信息相加
        res.forEach(group => {
          const {
            code,
            totalSize,
            totalTaxAmount,
            totalTaxedAmount,
            totalUntaxedAmount,
            totalDiscountAmount,
            totalSettleAmount,
            totalThisPeriodSettleAmount,
            totalThisPeriodDiscountAmount
          } = group;
          this.totalBills = +this.totalBills + +totalSize;
          this.totalTaxAmount = (
            +this.totalTaxAmount + +totalTaxAmount
          ).toFixed(2);
          this.totalTaxedAmount = (
            +this.totalTaxedAmount + +totalTaxedAmount
          ).toFixed(2);
          this.totalUntaxedAmount = (
            +this.totalUntaxedAmount + +totalUntaxedAmount
          ).toFixed(2);
          this.totalDiscountAmount = (
            +this.totalDiscountAmount + +totalDiscountAmount
          ).toFixed(2);
          this.totalSettleAmount = (
            +this.totalSettleAmount + +totalSettleAmount
          ).toFixed(2);
          this.totalThisPeriodSettleAmount = (
            +this.totalThisPeriodSettleAmount + +totalThisPeriodSettleAmount
          ).toFixed(2);
          this.totalThisPeriodDiscountAmount = (
            +this.totalThisPeriodDiscountAmount + +totalThisPeriodDiscountAmount
          ).toFixed(2);
          if (!group.rows) return;
          group.query = {
            ...this.localQuery,
            code
          };
        });
        this.detail = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
