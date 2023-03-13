<template>
  <div class="compo-item-wrap">
    <ht-card v-if="activetab === 1" title="收款">
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
        :table-name="'financialLogIn.summary1'"
      />
    </ht-card>
    <span v-if="activetab === 1 && tableData.length == 0" class="no-data-tips"
      >[此类目暂无数据]</span
    >
    <div v-if="activetab === 2">
      <!-- 分组 -->
      <div
        class="group finicial-detail"
        v-for="(group, groupIndex) in detail"
        :key="groupIndex"
      >
        <ht-card :title="'收款-' + group.name">
          <!-- 账户 -->
          <div v-if="group.showSum">
            <div
              class="customer"
              v-for="(customer, customerIndex) in group.rows"
              :key="customerIndex"
            >
              <div v-if="customer" class="customer-title">
                {{ customer.name }}
              </div>
              <DataTable
                v-if="customer.show"
                :query="customer.query"
                :currentRow="selectedDetailsRows"
                @rowChange="selectChange"
              />
              <div v-else class="layout-nodata">暂无数据</div>
            </div>
            <p class="summary-p">
              <span>合计: </span>
              <span>单据数：{{ group.calTotalSize }}</span>
              <span>收款金额：{{ group.calTotalSettleAmount }}</span>
              <span>优惠金额：{{ group.calTotalDiscountAmount }}</span>
            </p>
          </div>
        </ht-card>
        <span v-if="!group.showSum" class="no-data-tips">[此类目暂无数据]</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  financialLogInSummary,
  financialLogInGroup
} from "@/api/dailyManageReport";
import DataTable from "./dataTable";
import financicalMixin from "../mixins/financialMixin";
import { TABLE_COLUMN_FINANICIALLOGIN_SUMMARY } from "@/constants/report/financialLogIn";

export default {
  name: "financialLogIn",
  components: {
    DataTable
  },
  mixins: [financicalMixin],
  computed: {
    columns() {
      return TABLE_COLUMN_FINANICIALLOGIN_SUMMARY.columns;
    }
  },
  methods: {
    getSummary() {
      this.loading = true;
      financialLogInSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          const {
            rows,
            totalAgentAmount,
            totalAgentDiscountAmount,
            totalAllocAmount,
            totalAllocDiscountAmount,
            totalAmount,
            totalCommissionAmount,
            totalCommissionDiscountAmount,
            totalDiscountAmount,
            totalFeeAmount,
            totalFeeDiscountAmount,
            totalManualAmount,
            totalManualDiscountAmount,
            totalPrevAmount,
            totalPrevDiscountAmount,
            totalPurchaseAmount,
            totalPurchaseDiscountAmount,
            totalSaleAmount,
            totalSaleDiscountAmount
          } = res;
          if (rows) {
            this.rawData = res.rows;
            this.rawData.forEach((item, index) => {
              item.index = index + 1;
            });
          } else {
            this.rawData = [];
          }
          const totalPurchase = (
            +totalPurchaseAmount + +totalSaleAmount
          ).toFixed(2);
          const totalPurchaseDiscount = (
            +totalPurchaseDiscountAmount + +totalSaleDiscountAmount
          ).toFixed(2);
          // 把两项总计推到数组里面
          this.tableData = [...this.rawData];
          this.summaryData = {
            index: "合计（实收/优惠）:",
            fundAccountName: "",
            purchaseAmount: totalPurchase + "/" + totalPurchaseDiscount,
            prevAmount: totalPrevAmount + "/" + totalPrevDiscountAmount,
            agentAmount: totalAgentAmount + "/" + totalAgentDiscountAmount,
            allocAmount: totalAllocAmount + "/" + totalAllocDiscountAmount,
            commissionAmount:
              totalCommissionAmount + "/" + totalCommissionDiscountAmount,
            feeAmount: totalFeeAmount + "/" + totalFeeDiscountAmount,
            manualAmount: totalManualAmount + "/" + totalManualDiscountAmount,
            subtotalAmount: totalAmount + "/" + totalDiscountAmount
          };
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 获取分组信息
    getGroups() {
      this.detail = [];
      financialLogInGroup({
        ...this.localQuery,
        pageSize: this.pageSize
      }).then(res => {
        if (!res) {
          this.detail = [];
          return;
        }
        // 这里去手动构建一个大的对象去保存数据
        res.forEach(group => {
          const level1Code = group.code;
          group.showSum = false;
          if (!group.rows) {
            return;
          }
          group.calTotalSize = 0;
          group.calTotalSettleAmount = 0;
          group.calTotalDiscountAmount = 0;
          group.rows.forEach(customer => {
            const level2Code = customer.code;
            group.calTotalSize += +customer.totalSize;
            group.calTotalSettleAmount = (
              +group.calTotalSettleAmount + +customer.totalSettleAmount
            ).toFixed(2);
            group.calTotalDiscountAmount = (
              +group.calTotalDiscountAmount + +customer.totalDiscountAmount
            ).toFixed(2);
            customer.show = false;
            if (customer.rows && customer.rows.length > 0) {
              group.showSum = true;
              customer.show = true;
            }
            customer.query = {
              ...this.localQuery,
              level1Code,
              level2Code
            };
          });
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
          sums[index] = "合计（实收/优惠）";
          return;
        }
        switch (column.property) {
          case "purchaseAmount":
            sums[index] = this.summaryData["purchaseAmount"];
            break;
          case "prevAmount":
            sums[index] = this.summaryData["prevAmount"];
            break;
          case "agentAmount":
            sums[index] = this.summaryData["agentAmount"];
            break;
          case "allocAmount":
            sums[index] = this.summaryData["allocAmount"];
            break;
          case "commissionAmount":
            sums[index] = this.summaryData["commissionAmount"];
            break;
          case "feeAmount":
            sums[index] = this.summaryData["feeAmount"];
            break;
          case "manualAmount":
            sums[index] = this.summaryData["manualAmount"];
            break;
          case "subtotalAmount":
            sums[index] = this.summaryData["subtotalAmount"];
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
