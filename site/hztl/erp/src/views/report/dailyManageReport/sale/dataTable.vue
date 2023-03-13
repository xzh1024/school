<template>
  <ht-setting-table
    v-loadmore="loadMore"
    class="edit-swap-group-parts"
    height="150px"
    :total="totalSize"
    :data="tableData"
    :columns="detailColumns"
    setting-all-column
    show-table-setting
    @selectChange="selectChange"
    :selected-rows.sync="selectedDetailsRows"
    show-summary
    :summary-method="getSummaries"
    :table-name="'sale.detail'"
  />
</template>

<script>
import { sale } from "@/api/dailyManageReport";
import businessDetailMixin from "../mixins/businessDetailMixin";
import { TABLE_COLUMN_SALE_DETAIL } from "@/constants/report/sale";

export default {
  name: "purchase.customer",
  mixins: [businessDetailMixin],
  computed: {
    detailColumns() {
      return TABLE_COLUMN_SALE_DETAIL.columns;
    }
  },
  methods: {
    // 获取账户下的分页信息
    getDetails() {
      sale({
        ...this.localQuery,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const {
          rows,
          totalSize,
          totalTaxedPurchaseAmount,
          totalTaxedAmount,
          totalBillAmount,
          totalDiscountAmount,
          totalGrossProfitAmount,
          totalSettleAmount,
          totalThisPeriodSettleAmount,
          totalThisPeriodDiscountAmount,
          totalPage
        } = res;
        this.totalPage = totalPage;
        if (rows) {
          this.rawData = this.rawData.concat(res.rows);
        }
        this.tableData = [...this.rawData];
        this.summaryData = {
          index: "小计",
          billNo: totalSize,
          billType: null,
          status: null,
          createdAt: null,
          cooperatorName: null,
          taxedPurchaseAmount: totalTaxedPurchaseAmount,
          taxedAmount: totalTaxedAmount,
          billAmount: totalBillAmount,
          grossProfitAmount: totalGrossProfitAmount,
          thisPeriodSettleAmount: totalThisPeriodSettleAmount,
          thisPeriodDiscountAmount: totalThisPeriodDiscountAmount,
          settleAmount: totalSettleAmount,
          discountAmount: totalDiscountAmount
        };
      });
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "小计";
          return;
        }
        switch (column.property) {
          case "billNo":
            sums[index] = this.summaryData["billNo"];
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

<style></style>
