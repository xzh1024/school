<template>
  <div class="compo-item-wrap" v-if="activetab === 1">
    <ht-card title="纯利润">
      <ht-setting-table
        class="edit-swap-group-parts"
        height="320px"
        v-loading="loading"
        :total="totalSize"
        :current-page="page"
        :data="tableData"
        :columns="columns"
        setting-all-column
        show-table-setting
        @selectChange="selectChange"
        :selected-rows.sync="selectedDetailsRows"
        table-name="financialLogOut.summary"
      />
    </ht-card>
    <el-popover placement="bottom" width="500" trigger="hover">
      <p>主营业务收入=销售额+调拨出库总金额</p>
      <p>主营业务成本=销售成本额+调拨出库成本额</p>
      <p>主营业务优惠=销售本期优惠金额+调拨出库本期优惠金额</p>
      <p>主营业务利润=主营业务收入-主营业务成本-主营业务优惠</p>
      <p>其他业务收入=手工帐收款</p>
      <p>其他业务支出=手工帐付款</p>
      <p>费用支出=报销费用</p>
      <p>运费支出=收/发货自付</p>
      <p>营业外利润=其他业务收入-其他业务支出-费用支出-运费支出</p>
      <p>利润总额=主营业务利润+营业外利润</p>
      <span
        slot="reference"
        class="text-danger fixed-icon"
        style="cursor:pointer;float:right"
        ><i class="el-icon-question"></i
      ></span>
    </el-popover>
  </div>
</template>

<script>
import { netProfitSummary } from "@/api/dailyManageReport";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import saleMixin from "../mixins/saleMixin";

export default {
  name: "netProfit",
  mixins: [saleMixin],
  watch: {
    query: {
      handler: function(newVal) {
        this.initQuery(newVal);
      },
      deep: true
    },
    activetab() {
      this.getSummary();
    }
  },
  data() {
    return {
      loading: false,
      localQuery: {},
      tableData: [],
      columns: [
        {
          prop: "index",
          label: "序号",
          width: CELL_WIDTH.companyName,
          type: "index",
          cantHide: false,
          cantExport: true
        },
        {
          prop: "item",
          label: "营收项目",
          width: CELL_WIDTH.personName
        },
        {
          prop: "value",
          label: "本期金额",
          width: CELL_WIDTH.personName
        }
      ]
    };
  },
  methods: {
    initQuery(query) {
      // 根据当前项目类型来处理请求参数
      const { billDate, companyIds, dateType1, dateType2, statuses } = query;
      const startDate = this.formatTime(billDate[0]);
      const endDate = this.formatTime(billDate[1]);
      this.localQuery = {
        receiptPaymentParam: {
          companyIds,
          startDate,
          endDate,
          dateType: dateType2,
          statuses
        },
        businessParam: {
          companyIds,
          startDate,
          endDate,
          dateType: dateType1,
          statuses
        }
      };
    },
    getGroups() {
      this.detail = [];
      this.getSummary();
    },
    getSummary() {
      this.loading = true;
      netProfitSummary(this.localQuery)
        .then(res => {
          this.loading = false;
          if (!res) return;
          const {
            businessRevenueAmount,
            businessCostAmount,
            businessDiscountAmount,
            businessProfitAmount,
            otherRevenueAmount,
            otherExpendAmount,
            feeExpendAmount,
            logisticExpendAmount,
            unbusinessProfitAmount,
            totalProfitAmount
          } = res;
          this.tableData = [
            { value: businessRevenueAmount, item: "主营业务收入" },
            { value: businessCostAmount, item: "主营业务成本" },
            { value: businessDiscountAmount, item: "主营业务优惠" },
            { value: businessProfitAmount, item: "主营业务利润" },
            { value: otherRevenueAmount, item: "其他业务收入" },
            { value: otherExpendAmount, item: "其他业务支出" },
            { value: feeExpendAmount, item: "费用支出" },
            { value: logisticExpendAmount, item: "运费支出" },
            { value: unbusinessProfitAmount, item: "营业外利润" },
            { value: totalProfitAmount, item: "利润总额" }
          ];
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
.fixed-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
