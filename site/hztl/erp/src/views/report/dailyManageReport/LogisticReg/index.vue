<template>
  <div class="compo-item-wrap">
    <ht-card v-if="activetab === 1" title="收/发货登记">
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
        :enableTableSetting="true"
        show-summary
        @selectChange="selectChange"
        :selected-rows.sync="selectedDetailsRows"
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
    <!-- 分组 -->
    <ht-card v-if="activetab === 2" title="收/发货登记">
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
        <span>单据数：{{ summaryData.billCount }}</span>
        <span>运输费：{{ summaryData.shippingFee }}</span>
        <span>包装费：{{ summaryData.packagingFee }}</span>
        <span>保价费：{{ summaryData.premiumFee }}</span>
        <span>其他费：{{ summaryData.otherFee }}</span>
        <span>合计费用：{{ summaryData.totalCharges }}</span>
        <span>本期实付金额：{{ summaryData.thisPeriodActuallyAmount }}</span>
        <span>本期优惠金额：{{ summaryData.thisDiscountAmount }}</span>
        <span>累计实付金额：{{ summaryData.allPeriodActuallyAmount }}</span>
        <span>累计优惠金额：{{ summaryData.allPeriodDiscountAmount }}</span>
      </p>
    </ht-card>
  </div>
</template>

<script>
import { logisticRegSummary } from "@/api/dailyManageReport";
import { TABLE_COLUMN_LOGREG_SUMMARY } from "@/constants/report/logisticReg";
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
      return TABLE_COLUMN_LOGREG_SUMMARY.columns;
    }
  },
  data() {
    return {
      groups: [],
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
      logisticRegSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const {
            rows,
            billCount,
            financialBillCount,
            shippingFee,
            packagingFee,
            premiumFee,
            otherFee,
            totalCharges,
            allPeriodActuallyAmount,
            allPeriodDiscountAmount,
            thisPeriodActuallyAmount,
            thisDiscountAmount
          } = res;
          if (rows) {
            this.rawData = rows;
            this.initGroups(rows);
          } else {
            this.rawData = [];
          }
          // 把两项总计推到数组里面
          this.tableData = [...this.rawData];
          this.summaryData = {
            index: "合计:",
            settlementType: "",
            billCount,
            financialBillCount,
            shippingFee,
            packagingFee,
            premiumFee,
            otherFee,
            totalCharges,
            allPeriodActuallyAmount,
            allPeriodDiscountAmount,
            thisPeriodActuallyAmount,
            thisDiscountAmount
          };
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 获取分组信息
    initGroups(rows) {
      const arr = [];
      rows.forEach(item => {
        arr.push(item.settlementType);
      });
      this.groups = arr;
    },
    // 获取分组信息
    getGroups() {
      this.detail = [];
      logisticRegSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const { rows } = res;
          if (rows) {
            this.initGroups(rows);
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
          } else {
            this.rawData = [];
          }
        })
        .catch(() => {
          this.loading = false;
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
          case "financialBillCount":
            sums[index] = this.summaryData["financialBillCount"];
            break;
          case "freight":
            sums[index] = this.summaryData["shippingFee"];
            break;
          case "packCharges":
            sums[index] = this.summaryData["packagingFee"];
            break;
          case "insuredCharges":
            sums[index] = this.summaryData["premiumFee"];
            break;
          case "otherCharges":
            sums[index] = this.summaryData["otherFee"];
            break;
          case "totalCharges":
            sums[index] = this.summaryData["totalCharges"];
            break;
          case "allPeriodActuallyAmount":
            sums[index] = this.summaryData["allPeriodActuallyAmount"];
            break;
          case "allPeriodDiscountAmount":
            sums[index] = this.summaryData["allPeriodDiscountAmount"];
            break;
          case "thisPeriodActuallyAmount":
            sums[index] = this.summaryData["thisPeriodActuallyAmount"];
            break;
          case "thisDiscountAmount":
            sums[index] = this.summaryData["thisDiscountAmount"];
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
