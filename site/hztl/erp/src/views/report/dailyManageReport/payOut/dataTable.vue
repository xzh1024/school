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
import { payOut } from "@/api/dailyManageReport";
import businessDetailMixin from "../mixins/businessDetailMixin";
import { TABLE_COLUMN_PAY_OUT_DETAIL } from "@/constants/report/payOut";

export default {
  name: "purchase.customer",
  mixins: [businessDetailMixin],
  computed: {
    detailColumns() {
      return TABLE_COLUMN_PAY_OUT_DETAIL(this.query.dateType, this.query.code);
    }
  },
  methods: {
    // 获取账户下的分页信息
    getDetails() {
      payOut({
        ...this.localQuery,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const {
          rows,
          totalSize,
          totalAmount,
          totalThisPeriodSettleAmount,
          totalThisPeriodDiscountAmount,
          totalDiscountAmount,
          totalSettleAmount,
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
          createdAt: "",
          cooperatorName: "",
          amount: totalAmount,
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
          case "amount":
            sums[index] = this.summaryData["amount"];
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
        }
      });
      return sums;
    }
  }
};
</script>

<style></style>
