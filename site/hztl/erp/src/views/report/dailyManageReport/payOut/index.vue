<template>
  <div class="compo-item-wrap">
    <ht-card v-if="activetab === 1" title="应付登记">
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
    <ht-card v-if="activetab === 2" title="应付登记">
      <!-- 分组 -->
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
        <span>单据数：{{ totalBillCount }}</span>
        <span>登记金额：{{ totalAmount }}</span>
        <span>本期实付金额：{{ totalThisPeriodSettleAmount }}</span>
        <span>本期优惠金额：{{ totalThisPeriodDiscountAmount }}</span>
        <span>累计实付金额：{{ totalSettleAmount }}</span>
        <span>累计优惠金额：{{ totalDiscountAmount }}</span>
      </p>
    </ht-card>
  </div>
</template>

<script>
import { payOutSummary, payOutGroup } from "@/api/dailyManageReport";
import { TABLE_COLUMN_PAY_OUT_SUMMARY } from "@/constants/report/payOut";
import DataTable from "./dataTable";
import saleMixin from "../mixins/saleMixin";

export default {
  name: "sale",
  components: {
    DataTable
  },
  data() {
    return {
      totalAmount: 0,
      totalBillCount: 0,
      totalDiscountAmount: 0,
      totalSettleAmount: 0,
      totalThisPeriodDiscountAmount: 0,
      totalThisPeriodSettleAmount: 0
    };
  },
  mixins: [saleMixin],
  computed: {
    columns() {
      return TABLE_COLUMN_PAY_OUT_SUMMARY.columns;
    }
  },
  methods: {
    getSummary() {
      this.loading = true;
      payOutSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const {
            rows,
            totalAmount,
            totalBillCount,
            totalDiscountAmount,
            totalSettleAmount,
            totalThisPeriodDiscountAmount,
            totalThisPeriodSettleAmount
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
            amount: totalAmount,
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
      this.totalAmount = 0;
      this.totalBillCount = 0;
      this.totalDiscountAmount = 0;
      this.totalSettleAmount = 0;
      this.totalThisPeriodDiscountAmount = 0;
      this.totalThisPeriodSettleAmount = 0;
      payOutGroup({
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
            rows,
            totalAmount,
            totalDiscountAmount,
            totalSettleAmount,
            totalThisPeriodDiscountAmount,
            totalThisPeriodSettleAmount
          } = group;
          this.totalAmount = (+this.totalAmount + +totalAmount).toFixed(2);
          this.totalBillCount += rows.length;
          this.totalDiscountAmount = (
            +this.totalDiscountAmount + +totalDiscountAmount
          ).toFixed(2);
          this.totalSettleAmount = (
            +this.totalSettleAmount + +totalSettleAmount
          ).toFixed(2);
          this.totalThisPeriodDiscountAmount = (
            +this.totalThisPeriodDiscountAmount + +totalThisPeriodDiscountAmount
          ).toFixed(2);
          this.totalThisPeriodSettleAmount = (
            +this.totalThisPeriodSettleAmount + +totalThisPeriodSettleAmount
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

<style lang="scss" scoped>
@import "../index.scss";
</style>
