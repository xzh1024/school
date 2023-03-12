<template>
  <div>
    <ht-setting-table
      v-if="tableData.length"
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
      :table-name="'sale.detail'"
    />
    <p v-if="tableData.length" class="summary-p">
      <span>合计: </span>
      <span>单据数：{{ summaryDataOrigin.totalBillCount }}</span>
      <span>盈亏数：{{ summaryDataOrigin.profitLossQty }}</span>
      <span>盈亏金额：{{ summaryDataOrigin.profitLossTaxedAmount }}</span>
    </p>
    <span v-if="tableData.length == 0" class="no-data-tips"
      >[此类目暂无数据]</span
    >
  </div>
</template>

<script>
import { stocktaking } from "@/api/dailyManageReport";
import businessDetailMixin from "../mixins/businessDetailMixin";
import { TABLE_COLUMN_STOCK_DETAIL } from "@/constants/report/stocktaking";

export default {
  props: {
    summaryDataOrigin: {
      type: Object,
      default: () => {}
    }
  },
  name: "purchase.customer",
  mixins: [businessDetailMixin],
  computed: {
    detailColumns() {
      return TABLE_COLUMN_STOCK_DETAIL.columns;
    }
  },
  methods: {
    // 获取账户下的分页信息
    getDetails() {
      stocktaking({
        ...this.localQuery,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const { rows } = res;
        if (rows) {
          this.rawData = this.rawData.concat(res.rows);
        }
        this.tableData = [...this.rawData];
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.summary-p{
  span{
    margin-right: 50px;
  }
}
</style>
<style lang="scss" scoped>
@import "../index.scss";
</style>
