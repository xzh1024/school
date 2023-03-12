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
    :table-name="'financialLogIn.detail'"
  />
</template>

<script>
import { financialLogIn } from "@/api/dailyManageReport";
import financicalDetailMixin from "../mixins/financialDetailMixin";
import { TABLE_COLUMN_FINANICIALLOGIN_DETAIL } from "@/constants/report/financialLogIn";

export default {
  name: "financialLogIn.customer",
  mixins: [financicalDetailMixin],
  computed: {
    detailColumns() {
      return TABLE_COLUMN_FINANICIALLOGIN_DETAIL.columns;
    }
  },
  methods: {
    // 获取账户下的分页信息
    getDetails() {
      financialLogIn({
        ...this.localQuery,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const {
          rows,
          totalDiscountAmount,
          totalSettleAmount,
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
          remark: null,
          paymentDate: null,
          settleCooperatorName: null,
          sourceBillType: null,
          sourceBillNo: null,
          settleAmount: totalSettleAmount,
          discountAmount: totalDiscountAmount
        };
      });
    }
  }
};
</script>

<style></style>
