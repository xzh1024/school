<template>
  <div class="compo-item-wrap">
    <ht-card v-if="activetab === 1" title="销售">
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
        :table-name="'sale'"
      />
    </ht-card>
    <span v-if="activetab === 1 && tableData.length == 0" class="no-data-tips"
      >[此类目暂无数据]</span
    >
    <span v-if="activetab === 2 && detail.length == 0" class="no-data-tips"
      >[此类目暂无数据]</span
    >
    <ht-card v-if="activetab === 2" title="销售">
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
        <span>成本额：{{ totalTaxedPurchaseAmount }}</span>
        <span>销售：{{ totalTaxedAmount }}</span>
        <span>开单金额：{{ totalBillAmount }}</span>
        <span>毛利额：{{ totalGrossProfitAmount }}</span>
        <span>本期实收金额：{{ totalThisPeriodSettleAmount }}</span>
        <span>本期优惠金额：{{ totalThisPeriodDiscountAmount }}</span>
        <span>累计实收金额：{{ totalSettleAmount }}</span>
        <span>累计优惠金额：{{ totalDiscountAmount }}</span>
      </p>
    </ht-card>
  </div>
</template>

<script>
import { saleSummary, saleGroup } from "@/api/dailyManageReport";
import { TABLE_COLUMN_SALE_SUMMARY } from "@/constants/report/sale";
import DataTable from "./dataTable";
import saleMixin from "../mixins/saleMixin";

export default {
  name: "sale",
  components: {
    DataTable
  },
  mixins: [saleMixin],
  computed: {
    columns() {
      return TABLE_COLUMN_SALE_SUMMARY.columns;
    }
  },
  methods: {
    getSummary() {
      this.loading = true;
      saleSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const {
            rows,
            totalBillCount,
            totalDiscountAmount,
            totalFinancialBillCount,
            totalSettleAmount,
            totalTaxedPurchaseAmount,
            totalTaxedAmount,
            totalThisPeriodDiscountAmount,
            totalThisPeriodSettleAmount,
            totalBillAmount,
            totalGrossProfitAmount
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

            taxedPurchaseAmount: totalTaxedPurchaseAmount,
            taxedAmount: totalTaxedAmount,
            billAmount: totalBillAmount,
            grossProfitAmount: totalGrossProfitAmount,

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
      this.totalTaxedPurchaseAmount = 0;
      this.totalTaxedAmount = 0;
      this.totalBillAmount = 0;
      this.totalGrossProfitAmount = 0;
      this.totalDiscountAmount = 0;
      this.totalSettleAmount = 0;
      this.totalThisPeriodSettleAmount = 0;
      this.totalThisPeriodDiscountAmount = 0;
      saleGroup({
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
            totalTaxedPurchaseAmount,
            totalTaxedAmount,
            totalBillAmount,
            totalDiscountAmount,
            totalGrossProfitAmount,
            totalSettleAmount,
            totalThisPeriodSettleAmount,
            totalThisPeriodDiscountAmount
          } = group;
          this.totalBills += totalSize;
          this.totalTaxedPurchaseAmount = (
            +this.totalTaxedPurchaseAmount + +totalTaxedPurchaseAmount
          ).toFixed(2);
          this.totalTaxedAmount = (
            +this.totalTaxedAmount + +totalTaxedAmount
          ).toFixed(2);
          this.totalBillAmount = (
            +this.totalBillAmount + +totalBillAmount
          ).toFixed(2);
          this.totalGrossProfitAmount = (
            +this.totalGrossProfitAmount + +totalGrossProfitAmount
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
    },
    // 生成合计
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        switch (column.property) {
          case "billCount":
            sums[index] = this.summaryData["billCount"];
            break;
          case "financialBillCount":
            sums[index] = this.summaryData["financialBillCount"];
            break;
          case "taxedPurchaseAmount":
            sums[index] = this.summaryData["taxedPurchaseAmount"];
            break;
          case "taxedAmount":
            sums[index] = this.summaryData["taxedAmount"];
            break;
          case "billAmount":
            sums[index] = this.summaryData["billAmount"];
            break;
          case "grossProfitAmount":
            sums[index] = this.summaryData["grossProfitAmount"];
            break;
          case "thisPeriodSettleAmount":
            sums[index] = this.summaryData["thisPeriodSettleAmount"];
            break;
          case "thisPeriodDiscountAmount":
            sums[index] = this.summaryData["thisPeriodDiscountAmount"];
            break;
          case "settleAmount":
            sums[index] = this.summaryData["settleAmount"];
            break;
          case "discountAmount":
            sums[index] = this.summaryData["discountAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
