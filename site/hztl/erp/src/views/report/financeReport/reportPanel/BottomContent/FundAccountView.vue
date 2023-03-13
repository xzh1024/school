<template>
  <div>
    <h4 class="right_table_title">
      <span class="border"></span>
      <span>资金账户概览</span>
      <span style="position: relative;">
        <el-popover placement="right" width="300" trigger="hover">
          <p>
            指定业务公司的各资金账户指定收付款日期范围内的上期余额、本期总收入、本期总支出、本期余额
          </p>
          <i
            class="icon-question"
            style="position:absolute;top:2px;right:-19px;"
            slot="reference"
          ></i>
        </el-popover>
      </span>
      <el-button
        plain
        type="primary"
        size="mini"
        style="margin-top: -3px; float: right;"
        @click="toFinanceLog"
      >
        查看出纳账数据
      </el-button>
    </h4>

    <el-table
      :data="tableData"
      :summary-method="params => getSummariesByCalculate(params, totalFiles)"
      show-summary
      :height="431"
      style="width: 100%;"
    >
      <el-table-column
        type="index"
        prop="index"
        width="50"
        label=" "
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip
            placement="right-start"
            effect="dark"
            :enterable="false"
            :offset="100"
          >
            <div slot="content" class="detail-container">
              <div>
                <el-row :gutter="10" style="width: 175px;">
                  <el-col class="detail-item" :span="10">配件销售</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.saleAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">应收付对账</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.receivePayAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">采购退货</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.purchaseReturnAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">手工账</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.manualAccountAmount }}
                  </el-col>
                  <el-col :span="10">开帐</el-col>
                  <el-col :span="14">
                    {{ scope.row.detail.fundOpenAmount }}
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="10" style="width: 200px;">
                  <el-col class="detail-item" :span="10">销售退货</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.saleReturnAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">配件采购</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.purchaseArrivalAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">急件采购</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.purchaseUrgentArrivalAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">代收对账</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.manualAccountAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">发货运费自付</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.freightSendSelfAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">发货运费垫付</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.freightSendAdvanceAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">收货运费自付</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.freightReceiveSelfAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">收货运费垫付</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.freightReceiveAdvanceAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">预支款</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.feeAdvanceAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">报销</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.reimbursementAmount }}
                  </el-col>
                  <el-col class="detail-item" :span="10">预支报销</el-col>
                  <el-col class="detail-item" :span="14">
                    {{ scope.row.detail.feeAdvanceReimbursementAmount }}
                  </el-col>
                  <el-col :span="10">佣金</el-col>
                  <el-col :span="14">
                    {{ scope.row.detail.brokerageAmount }}
                  </el-col>
                </el-row>
              </div>
            </div>
            <i class="icon-view"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="fundAccountName"
        label="资金账户名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="lastPeriodBalance"
        label="上期余额"
        show-overflow-tooltip
      >
        <template slot-scope="props">
          {{ toFixed2(props.row.lastPeriodBalance) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="thisPeridReceiveAmount"
        label="本期收入"
        show-overflow-tooltip
      >
        <template slot-scope="props">
          {{ toFixed2(props.row.thisPeridReceiveAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="thisPeridPayAmount"
        label="本期支出"
        show-overflow-tooltip
      >
        <template slot-scope="props">
          {{ toFixed2(props.row.thisPeridPayAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="thisPeridBalance"
        label="本期余额"
        show-overflow-tooltip
      >
        <template slot-scope="props">
          {{ toFixed2(props.row.thisPeridBalance) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import summaries from "@/mixins/summaries";
import { toFixed2 } from "@/views/report/common/common";

const precision = 2;
const totalFiles = [
  { file: "lastPeriodBalance", type: precision },
  { file: "thisPeridReceiveAmount", type: precision },
  { file: "thisPeridPayAmount", type: precision },
  { file: "thisPeridBalance", type: precision }
];

export default {
  name: "FundAccountView",
  mixins: [summaries],
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      row: {},
      totalFiles: totalFiles
    };
  },
  methods: {
    toFixed2: toFixed2,
    toFinanceLog() {
      this.$router.push({
        path: "/finance/log"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.right_table_title {
  font-family: PingFangSC-Medium;
  margin: 0 0 16px;
  font-size: 16px;
  color: #171f24;
  .border {
    display: inline-block;
    margin-right: 5px;
    width: 4px;
    height: 14px;
    border-radius: 6px;
    background: #3aa7ff;
  }
}
.icon-view {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-view.png");
  background-size: 100% 100%;
  cursor: pointer;
}
.icon-question {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-ques.png");
  background-size: 100% 100%;
}
.detail-container {
  display: flex;
  justify-content: space-between;

  .detail-item {
    margin-bottom: 5px;
  }
}
</style>
