<template>
  <ht-setting-table
    v-loadmore="loadMore"
    class="edit-swap-group-parts"
    height="150px"
    :total="totalSize"
    :data="tableData"
    :columns="detailColumns"
    setting-all-column
    @selectChange="selectChange"
    :selected-rows.sync="selectedDetailsRows"
    show-table-setting
    show-summary
    :summary-method="getSummaries"
    :table-name="'purchase.detail'"
  />
</template>

<script>
import { purchase } from "@/api/dailyManageReport";
import businessDetailMixin from "../mixins/businessDetailMixin";
import { TABLE_COLUMN_PURCHASE_DETAIL } from "@/constants/report/purchase";

export default {
  name: "purchase.customer",
  mixins: [businessDetailMixin],
  computed: {
    detailColumns() {
      return TABLE_COLUMN_PURCHASE_DETAIL.columns;
    }
  },
  methods: {
    // 获取账户下的分页信息
    getDetails() {
      purchase({
        ...this.localQuery,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const {
          rows,
          totalTaxAmount,
          totalTaxedAmount,
          totalUntaxedAmount,
          totalDiscountAmount,
          totalSettleAmount,
          totalThisPeriodSettleAmount,
          totalThisPeriodDiscountAmount,
          totalPage,
          totalSize
        } = res;
        this.totalPage = totalPage;
        if (rows) {
          this.rawData = this.rawData.concat(res.rows);
        }
        this.tableData = [...this.rawData];
        this.summaryData = {
          index: "小计",
          totalSize,
          billType: null,
          status: null,
          createdAt: null,
          cooperatorName: null,
          untaxedAmount: totalUntaxedAmount,
          taxAmount: totalTaxAmount,
          taxedAmount: totalTaxedAmount,
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
            sums[index] = this.summaryData["totalSize"];
            break;
          case "billCount":
            sums[index] = this.summaryData["billCount"];
            break;
          case "financialBillCount":
            sums[index] = this.summaryData["financialBillCount"];
            break;
          case "untaxedAmount":
            sums[index] = this.summaryData["untaxedAmount"];
            break;
          case "taxAmount":
            sums[index] = this.summaryData["taxAmount"];
            break;
          case "taxedAmount":
            sums[index] = this.summaryData["taxedAmount"];
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
