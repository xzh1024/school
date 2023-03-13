<template>
  <div class="compo-item-wrap">
    <ht-card v-if="activetab === 1" title="盘点">
      <ht-setting-table
        v-if="!nodata"
        class="edit-swap-group-parts"
        v-loading="loading"
        height="60px"
        :total="totalSize"
        :current-page="page"
        :data="tableData"
        :columns="columns"
        setting-all-column
        @selectChange="selectChange"
        :selected-rows.sync="selectedDetailsRows"
        :enableTableSetting="true"
        show-summary
        :summary-method="getSummaries"
        :table-name="'stocltaking'"
      />
    </ht-card>
    <span v-if="activetab === 1 && nodata" class="no-data-tips"
      >[此类目暂无数据]</span
    >
    <ht-card v-if="activetab === 2" title="盘点">
      <!-- 分组 -->
      <div v-if="detail.length">
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
            :summaryDataOrigin="summaryData"
          />
        </div>
      </div>
    </ht-card>
  </div>
</template>

<script>
import { stocktakingSummary } from "@/api/dailyManageReport";
import { TABLE_COLUMN_STOCK_SUMMARY } from "@/constants/report/stocktaking";
import DataTable from "./dataTable";
import saleMixin from "../mixins/saleMixin";

export default {
  name: "allocIn",
  components: {
    DataTable
  },
  mixins: [saleMixin],
  computed: {
    columns() {
      return TABLE_COLUMN_STOCK_SUMMARY.columns;
    }
  },
  data() {
    return {
      nodata: false, // 是否没有数据
      totalCount: 0, //总单据数
      totalAmount: "0", //总金额
      thisPeriodActuallyAmount: "0", //本期实付金额
      thisDiscountAmount: "0", //本期优惠金额
      allPeriodActuallyAmount: "0", //累计实付金额
      allPeriodDiscountAmount: "0" //累计优惠金额
    };
  },
  methods: {
    getSummary() {
      this.loading = true;
      stocktakingSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const {
            billCountFinancial,
            profitLossQty,
            profitLossTaxedAmount,
            totalBillCount
          } = res;
          // 把两项总计推到数组里面
          this.summaryData = {
            index: "合计:",
            billCountFinancial,
            profitLossQty,
            profitLossTaxedAmount,
            totalBillCount
          };
          this.nodata = totalBillCount == 0;
          this.tableData = [{}];
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 获取分组信息
    getGroups() {
      this.detail = [];
      this.detail = [
        {
          name: "",
          query: this.localQuery
        }
      ];
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "";
          return;
        }
        switch (column.property) {
          case "totalBillCount":
            sums[index] = this.summaryData["totalBillCount"];
            break;
          case "billCountFinancial":
            sums[index] = this.summaryData["billCountFinancial"];
            break;
          case "profitLossTaxedAmount":
            sums[index] = this.summaryData["profitLossTaxedAmount"];
            break;
          case "profitLossQty":
            sums[index] = this.summaryData["profitLossQty"];
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
