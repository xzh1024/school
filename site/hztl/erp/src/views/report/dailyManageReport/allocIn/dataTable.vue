<template>
  <ht-setting-table
    v-loadmore="loadMore"
    class="edit-swap-group-parts"
    height="150px"
    :total="totalSize"
    @selectChange="selectChange"
    :selected-rows.sync="selectedDetailsRows"
    :data="tableData"
    :columns="detailColumns"
    setting-all-column
    show-table-setting
    show-summary
    :summary-method="getSummaries"
    :table-name="'allocIn.detail'"
  />
</template>

<script>
import { allocIn } from "@/api/dailyManageReport";
import businessDetailMixin from "../mixins/businessDetailMixin";
import { TABLE_COLUMN_ALLOC_IN_DETAIL } from "@/constants/report/allocIn";

export default {
  name: "purchase.customer",
  mixins: [businessDetailMixin],
  computed: {
    detailColumns() {
      return TABLE_COLUMN_ALLOC_IN_DETAIL.columns;
    }
  },
  methods: {
    // 获取账户下的分页信息
    getDetails() {
      allocIn({
        ...this.localQuery,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const {
          rows,
          totalSize,
          totalAmount,
          thisPeriodActuallyAmount,
          thisDiscountAmount,
          allPeriodActuallyAmount,
          allPeriodDiscountAmount,
          totalPage
        } = res;
        this.totalPage = totalPage;
        if (this.page == 1) {
          this.tableData = [];
          this.rawData = [];
        }
        if (rows) {
          this.rawData = this.rawData.concat(res.rows);
        }
        this.tableData = [...this.rawData];
        this.summaryData = {
          index: "小计",
          billNo: totalSize,
          totalAmount,
          thisDiscountAmount,
          thisPeriodActuallyAmount,
          allPeriodActuallyAmount,
          allPeriodDiscountAmount
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
          case "totalAmount":
            sums[index] = this.summaryData["totalAmount"];
            break;
          case "thisPeriodActuallyAmount":
            sums[index] = this.summaryData["thisPeriodActuallyAmount"];
            break;
          case "thisDiscountAmount":
            sums[index] = this.summaryData["thisDiscountAmount"];
            break;
          case "allPeriodActuallyAmount":
            sums[index] = this.summaryData["allPeriodActuallyAmount"];
            break;
          case "allPeriodDiscountAmount":
            sums[index] = this.summaryData["allPeriodDiscountAmount"];
            break;
        }
      });
      return sums;
    }
  }
};
</script>

<style></style>
