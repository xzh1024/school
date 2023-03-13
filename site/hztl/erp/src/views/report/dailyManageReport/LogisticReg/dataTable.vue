<template>
  <ht-setting-table
    v-loadmore="loadMore"
    class="edit-swap-group-parts"
    height="150px"
    :total="totalSize"
    :data="tableData"
    :columns="detailColumns"
    @selectChange="selectChange"
    :selected-rows.sync="selectedDetailsRows"
    setting-all-column
    show-table-setting
    show-summary
    :summary-method="getSummaries"
    :table-name="'logisticReg.detail'"
  />
</template>

<script>
import { logisticReg } from "@/api/dailyManageReport";
import businessDetailMixin from "../mixins/businessDetailMixin";
import { TABLE_COLUMN_LOGREG_DETAIL } from "@/constants/report/logisticReg";

export default {
  name: "purchase.customer",
  mixins: [businessDetailMixin],
  computed: {
    detailColumns() {
      return TABLE_COLUMN_LOGREG_DETAIL.columns;
    }
  },
  methods: {
    // 获取账户下的分页信息
    getDetails() {
      logisticReg({
        ...this.localQuery,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalInfo, totalPage } = res;
        const {
          freight,
          packCharges,
          insuredCharges,
          otherCharges,
          totalCharges,
          totalQty,
          thisPeriodActuallyAmount,
          thisDiscountAmount,
          allPeriodActuallyAmount,
          allPeriodDiscountAmount
        } = totalInfo;
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
          settlementType: "",
          freightNo: totalQty,
          type: null,
          createdAt: null,
          logisticsCompanyName: null,
          cooperatorName: null,
          freight: freight,
          packCharges: packCharges,
          insuredCharges: insuredCharges,
          otherCharges: otherCharges,
          totalCharges: totalCharges,
          thisPeriodActuallyAmount: thisPeriodActuallyAmount,
          thisDiscountAmount: thisDiscountAmount,
          allPeriodActuallyAmount: allPeriodActuallyAmount,
          allPeriodDiscountAmount: allPeriodDiscountAmount
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
          case "freightNo":
            sums[index] = this.summaryData["freightNo"];
            break;
          case "freight":
            sums[index] = this.summaryData["freight"];
            break;
          case "packCharges":
            sums[index] = this.summaryData["packCharges"];
            break;
          case "insuredCharges":
            sums[index] = this.summaryData["insuredCharges"];
            break;
          case "otherCharges":
            sums[index] = this.summaryData["otherCharges"];
            break;
          case "totalCharges":
            sums[index] = this.summaryData["totalCharges"];
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

<style lang="scss" scoped>
@import "../index.scss";
</style>
