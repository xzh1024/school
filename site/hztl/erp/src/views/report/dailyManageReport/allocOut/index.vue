<template>
  <div class="compo-item-wrap">
    <ht-card v-if="activetab === 1" title="调拨出库">
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
    <ht-card v-if="activetab === 2" title="调拨出库">
      <!-- 分组 -->
      <div
        class="group"
        v-for="(group, groupIndex) in detail"
        :key="groupIndex"
      >
        <div class="customer-title">{{ group.title }}</div>
        <DataTable
          :query="group.query"
          :currentRow="selectedDetailsRows"
          @rowChange="selectChange"
        />
      </div>
      <p class="summary-p" v-if="detail.length">
        <span>合计: </span>
        <span>单据数：{{ summaryData.totalBillCount }}</span>
        <span>总金额：{{ summaryData.totalAmount }}</span>
        <span>本期实收金额：{{ summaryData.thisPeriodActuallyAmount }}</span>
        <span>本期优惠金额：{{ summaryData.thisDiscountAmount }}</span>
        <span>累计实收金额：{{ summaryData.allPeriodActuallyAmount }}</span>
        <span>累计优惠金额：{{ summaryData.allDiscountAmount }}</span>
      </p>
    </ht-card>
  </div>
</template>

<script>
import { allocOutSummary } from "@/api/dailyManageReport";
import { TABLE_COLUMN_ALLOC_OUT_SUMMARY } from "@/constants/report/allocOut";
import DataTable from "./dataTable";
import saleMixin from "../mixins/saleMixin";

export default {
  name: "allocIn",
  components: {
    DataTable
  },
  mixins: [saleMixin],
  data() {
    return {
      groups: []
    };
  },
  computed: {
    columns() {
      return TABLE_COLUMN_ALLOC_OUT_SUMMARY.columns;
    }
  },
  methods: {
    getSummary() {
      this.loading = true;
      allocOutSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const {
            Rows,
            totalBillCount,
            billCountFinancial,
            totalAmount,
            thisPeriodActuallyAmount,
            thisDiscountAmount,
            costAmount,
            allPeriodActuallyAmount,
            allDiscountAmount
          } = res;
          if (Rows) {
            this.rawData = res.Rows;
            this.initGroups(res.Rows);
          } else {
            this.rawData = [];
          }
          // 把两项总计推到数组里面
          this.tableData = [...this.rawData];
          this.summaryData = {
            index: "合计:",
            paymentType: "",
            totalBillCount,
            billCountFinancial,
            costAmount,
            totalAmount,
            thisPeriodActuallyAmount,
            thisDiscountAmount,
            allPeriodActuallyAmount,
            allDiscountAmount
          };
        })
        .catch(() => {
          this.loading = false;
        });
    },
    initGroups(rows) {
      const arr = [];
      rows.forEach(item => {
        arr.push(item.paymentType);
      });
      this.groups = arr;
    },
    // 获取分组信息
    getGroups() {
      this.detail = [];
      allocOutSummary(this.localQuery).then(res => {
        const { Rows } = res;
        if (Rows) {
          this.initGroups(res.Rows);
          const groups = [];
          this.groups.forEach(group => {
            const obj = {};
            obj.title = group;
            obj.query = {
              ...this.localQuery,
              paymentType: group
            };
            groups.push(obj);
          });
          this.detail = groups;
        }
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
          case "totalBillCount":
            sums[index] = this.summaryData["totalBillCount"];
            break;
          case "billCountFinancial":
            sums[index] = this.summaryData["billCountFinancial"];
            break;
          case "costAmount":
            sums[index] = this.summaryData["costAmount"];
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
            sums[index] = this.summaryData["allDiscountAmount"];
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
