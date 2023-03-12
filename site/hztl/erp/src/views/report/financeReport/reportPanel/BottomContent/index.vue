<template>
  <el-row :gutter="16" style="margin:10px 0;">
    <el-col :span="9" style="padding: 0;">
      <div class="content_height" style="background: #ffffff; padding: 16px;">
        <FundAccountView :tableData="tableData" />
      </div>
      <div
        class="content_height"
        style="margin-top: 10px; background: #ffffff; padding: 16px;"
      >
        <CooperatorBillSort ref="cooperatorBillSort" :companyIds="companyIds" />
      </div>
    </el-col>
    <el-col class="content_height" :span="15" style="padding-right:0">
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          应收/应付账概览
          <p class="detail_info" style="margin-top: -3px;">
            <el-button
              plain
              type="primary"
              size="mini"
              @click="toPaymentStatement"
            >
              查看往来账明细数据
            </el-button>
            <el-button
              plain
              type="primary"
              size="mini"
              style="margin-left: 10px;"
              @click="toCollectionStatement"
            >
              查看代收账明细数据
            </el-button>
          </p>
        </h4>
        <el-row :gutter="10" style="margin: 16px;">
          <el-col :span="8">
            <div class="item-title-container">
              <span>{{ accumulativeDebt.name }}：</span>
              <span>{{ accumulativeDebt.value }}</span>
            </div>
            <ViewItem :infoData="accumulativeDebtReceive" />
            <ViewItem :infoData="accumulativeDebtPay" />
          </el-col>
          <el-col :span="8">
            <div class="item-title-container">
              <span>{{ thisPeriodDebt.name }}：</span>
              <span>{{ thisPeriodDebt.value }}</span>
            </div>
            <ViewItem :infoData="thisPeriodDebtReceive" />
            <ViewItem :infoData="thisPeriodDebtPay" />
          </el-col>
          <el-col :span="8">
            <div class="item-title-container">
              <span>{{ thisPeriodSettlement.name }}：</span>
              <span>{{ thisPeriodSettlement.value }}</span>
            </div>
            <ViewItem
              :infoData="thisPeriodSettlementReceive"
              @click.native="toManualBill('in')"
            />
            <ViewItem
              :infoData="thisPeriodSettlementPay"
              @click.native="toManualBill('out')"
            />
          </el-col>
        </el-row>
      </div>

      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          待结算
        </h4>
        <el-row :gutter="10" style="margin: 16px;">
          <el-col :span="8">
            <div class="item-title-container text-font-primary">
              <i class="icon-now-pay" />现付
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <TodoItem :infoData="waitSettlementNowPayReceive" />
              </el-col>
              <el-col :span="12">
                <TodoItem :infoData="waitSettlementNowPayPay" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <div class="item-title-container text-font-primary">
              <i class="icon-charge" />挂账
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <TodoItem :infoData="waitSettlementOnTickReceive" />
              </el-col>
              <el-col :span="12">
                <TodoItem :infoData="waitSettlementOnTickPay" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <div class="item-title-container text-font-primary">
              <i class="icon-logistics" />物流代收
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <TodoItem :infoData="waitSettlementCollectingReceive" />
              </el-col>
              <el-col :span="12">
                <TodoItem :infoData="waitSettlementCollectingPay" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          费用管理
        </h4>
        <el-row :gutter="10" style="margin: 16px;">
          <el-col :span="12">
            <div class="item-title-container text-font-primary">
              <i class="icon-advance" />预支单
            </div>
            <el-row :gutter="10">
              <el-col :span="8">
                <TodoItem :infoData="expenseManagementAdvanceBillToSubmit" />
              </el-col>
              <el-col :span="8">
                <TodoItem :infoData="expenseManagementAdvanceBillToAudit" />
              </el-col>
              <el-col :span="8">
                <TodoItem
                  :infoData="expenseManagementAdvanceBillToReimbursement"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <div class="item-title-container text-font-primary">
              <i class="icon-fees" />报销单
            </div>
            <el-row :gutter="10">
              <el-col :span="8">
                <TodoItem
                  :infoData="expenseManagementReimbursementBillToSubmit"
                />
              </el-col>
              <el-col :span="8">
                <TodoItem
                  :infoData="expenseManagementReimbursementBillToAudit"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          其他待办
        </h4>
        <el-row :gutter="10" style="margin: 16px;">
          <el-col :span="4">
            <div class="item-title-container text-font-primary">
              <i class="icon-taking" />盘点
            </div>
            <TodoItem :infoData="otherStocktakingWaitFinancialAudit" />
          </el-col>
          <el-col :span="4">
            <div class="item-title-container text-font-primary">
              <i class="icon-manual" />出纳记账
            </div>
            <TodoItem :infoData="otherManulUncheck" />
          </el-col>
          <el-col :span="8">
            <div class="item-title-container text-font-primary">
              <i class="icon-statement" />对账单
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <TodoItem :infoData="otherAccountCheckCurrentAccountUnfinish" />
              </el-col>
              <el-col :span="12">
                <TodoItem
                  :infoData="otherAccountCheckLogisticCollectingUnfinish"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { unitConvert } from "../../../common/common";
import FundAccountView from "./FundAccountView";
import CooperatorBillSort from "./CooperatorBillSort";
import ViewItem from "./ViewItem";
import TodoItem from "./TodoItem";
import {
  getDate,
  getCurMonth,
  getCurQuarter,
  getCurYear
} from "../../../common/common";

export default {
  name: "BottomContent",
  components: {
    FundAccountView,
    CooperatorBillSort,
    ViewItem,
    TodoItem
  },
  data() {
    return {
      tableData: [],
      companyIds: [],

      accumulativeDebt: {},
      accumulativeDebtReceive: {},
      accumulativeDebtPay: {},
      thisPeriodDebt: {},
      thisPeriodDebtReceive: {},
      thisPeriodDebtPay: {},
      thisPeriodSettlement: {},
      thisPeriodSettlementReceive: {},
      thisPeriodSettlementPay: {},

      waitSettlementNowPayReceive: {},
      waitSettlementNowPayPay: {},
      waitSettlementOnTickReceive: {},
      waitSettlementOnTickPay: {},
      waitSettlementCollectingReceive: {},
      waitSettlementCollectingPay: {},

      expenseManagementAdvanceBillToSubmit: {},
      expenseManagementAdvanceBillToAudit: {},
      expenseManagementAdvanceBillToReimbursement: {},
      expenseManagementReimbursementBillToSubmit: {},
      expenseManagementReimbursementBillToAudit: {},

      otherStocktakingWaitFinancialAudit: {},
      otherManulUncheck: {},
      otherAccountCheckCurrentAccountUnfinish: {},
      otherAccountCheckLogisticCollectingUnfinish: {}
    };
  },
  props: {
    panelData: Object,
    searachParams: Object
  },
  watch: {
    panelData: {
      deep: true, // 深度监听
      handler(newVal) {
        if (newVal) {
          this.tableData = newVal.fundAccountOverview || [];

          this.accumulativeDebt = {
            name: "累计欠款",
            value: this.unitConvert(
              newVal.receivePayOverview.accumulativeDebt.amount
            )
          };
          this.accumulativeDebtReceive = {
            name: "应收欠款（含代收）",
            value: `￥${this.unitConvert(
              newVal.receivePayOverview.accumulativeDebt.receive.amount
            )}`,
            view: [
              {
                name: "往来账应收",
                value: this.unitConvert(
                  newVal.receivePayOverview.accumulativeDebt.receive.detail
                    .currentAccountAmount
                )
              },
              {
                name: "代收账应收",
                value: this.unitConvert(
                  newVal.receivePayOverview.accumulativeDebt.receive.detail
                    .logisticCollectingAmount
                )
              },
              {
                name: "往来单位数",
                value:
                  newVal.receivePayOverview.accumulativeDebt.receive.detail
                    .cooperatorCount
              }
            ]
          };
          this.accumulativeDebtPay = {
            name: "应付欠款（含代付）",
            value: `￥${this.unitConvert(
              newVal.receivePayOverview.accumulativeDebt.pay.amount
            )}`,
            view: [
              {
                name: "往来账应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.accumulativeDebt.pay.detail
                    .currentAccountAmount
                )
              },
              {
                name: "代收账应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.accumulativeDebt.pay.detail
                    .logisticCollectingAmount
                )
              },
              {
                name: "佣金应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.accumulativeDebt.pay.detail
                    .brokerageAmount
                )
              },
              {
                name: "往来单位数",
                value:
                  newVal.receivePayOverview.accumulativeDebt.pay.detail
                    .cooperatorCount
              }
            ]
          };

          this.thisPeriodDebt = {
            name: "本期新增欠款",
            value: this.unitConvert(
              newVal.receivePayOverview.thisPeriodDebt.amount
            )
          };
          this.thisPeriodDebtReceive = {
            name: "应收欠款（含代收）",
            value: `￥${this.unitConvert(
              newVal.receivePayOverview.thisPeriodDebt.receive.amount
            )}`,
            view: [
              {
                name: "往来账应收",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodDebt.receive.detail
                    .currentAccountAmount
                )
              },
              {
                name: "代收账应收",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodDebt.receive.detail
                    .logisticCollectingAmount
                )
              },
              {
                name: "往来单位数",
                value:
                  newVal.receivePayOverview.thisPeriodDebt.receive.detail
                    .cooperatorCount
              }
            ]
          };
          this.thisPeriodDebtPay = {
            name: "应付欠款（含代付）",
            value: `￥${this.unitConvert(
              newVal.receivePayOverview.thisPeriodDebt.pay.amount
            )}`,
            view: [
              {
                name: "往来账应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodDebt.pay.detail
                    .currentAccountAmount
                )
              },
              {
                name: "代收账应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodDebt.pay.detail
                    .logisticCollectingAmount
                )
              },
              {
                name: "佣金应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodDebt.pay.detail
                    .brokerageAmount
                )
              },
              {
                name: "往来单位数",
                value:
                  newVal.receivePayOverview.thisPeriodDebt.pay.detail
                    .cooperatorCount
              }
            ]
          };

          this.thisPeriodSettlement = {
            name: "本期结算",
            value: this.unitConvert(
              newVal.receivePayOverview.thisPeriodSettlement.amount
            )
          };
          this.thisPeriodSettlementReceive = {
            className: "status_blue",
            name: "应收欠款（含代收）",
            value: `￥${this.unitConvert(
              newVal.receivePayOverview.thisPeriodSettlement.receive.amount
            )}`,
            view: [
              {
                name: "往来账应收",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodSettlement.receive.detail
                    .currentAccountAmount
                )
              },
              {
                name: "代收账应收",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodSettlement.receive.detail
                    .logisticCollectingAmount
                )
              },
              {
                name: "往来单位数",
                value:
                  newVal.receivePayOverview.thisPeriodSettlement.receive.detail
                    .cooperatorCount
              }
            ]
          };
          this.thisPeriodSettlementPay = {
            className: "status_blue",
            name: "应付欠款（含代付）",
            value: `￥${this.unitConvert(
              newVal.receivePayOverview.thisPeriodSettlement.pay.amount
            )}`,
            view: [
              {
                name: "往来账应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodSettlement.pay.detail
                    .currentAccountAmount
                )
              },
              {
                name: "代收账应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodSettlement.pay.detail
                    .logisticCollectingAmount
                )
              },
              {
                name: "佣金应付",
                value: this.unitConvert(
                  newVal.receivePayOverview.thisPeriodSettlement.pay.detail
                    .brokerageAmount
                )
              },
              {
                name: "往来单位数",
                value:
                  newVal.receivePayOverview.thisPeriodSettlement.pay.detail
                    .cooperatorCount
              }
            ]
          };

          this.waitSettlementNowPayReceive = {
            className: "status_purple",
            name: "待收款",
            details: [
              {
                name: "单据数",
                value: newVal.todo.waitSettlement.nowPay.receive.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.waitSettlement.nowPay.receive.amount
                )}`
              }
            ]
          };
          this.waitSettlementNowPayPay = {
            className: "status_blue",
            name: "待付款",
            details: [
              {
                name: "单据数",
                value: newVal.todo.waitSettlement.nowPay.pay.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.waitSettlement.nowPay.pay.amount
                )}`
              }
            ]
          };

          this.waitSettlementOnTickReceive = {
            className: "status_green",
            name: "配件销售类",
            details: [
              {
                name: "单据数",
                value: newVal.todo.waitSettlement.onTick.receive.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.waitSettlement.onTick.receive.amount
                )}`
              }
            ]
          };
          this.waitSettlementOnTickPay = {
            className: "status_orange",
            name: "配件采购类",
            details: [
              {
                name: "单据数",
                value: newVal.todo.waitSettlement.onTick.pay.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.waitSettlement.onTick.pay.amount
                )}`
              }
            ]
          };

          this.waitSettlementCollectingReceive = {
            className: "status_green",
            name: "配件销售类",
            details: [
              {
                name: "单据数",
                value: newVal.todo.waitSettlement.collecting.receive.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.waitSettlement.collecting.receive.amount
                )}`
              }
            ]
          };
          this.waitSettlementCollectingPay = {
            className: "status_orange",
            name: "配件采购类",
            details: [
              {
                name: "单据数",
                value: newVal.todo.waitSettlement.collecting.pay.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.waitSettlement.collecting.pay.amount
                )}`
              }
            ]
          };

          this.expenseManagementAdvanceBillToSubmit = {
            className: "status_green",
            name: "待提交",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.expenseManagement.advanceBill.toSubmit.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.expenseManagement.advanceBill.toSubmit.amount
                )}`
              }
            ]
          };
          this.expenseManagementAdvanceBillToAudit = {
            className: "status_purple",
            name: "待审核",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.expenseManagement.advanceBill.toAudit.billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.expenseManagement.advanceBill.toAudit.amount
                )}`
              }
            ]
          };
          this.expenseManagementAdvanceBillToReimbursement = {
            className: "status_orange",
            name: "待报销",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.expenseManagement.advanceBill.toReimbursement
                    .billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.expenseManagement.advanceBill.toReimbursement
                    .amount
                )}`
              }
            ]
          };

          this.expenseManagementReimbursementBillToSubmit = {
            className: "status_green",
            name: "待提交",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.expenseManagement.reimbursementBill.toSubmit
                    .billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.expenseManagement.reimbursementBill.toSubmit
                    .amount
                )}`
              }
            ]
          };
          this.expenseManagementReimbursementBillToAudit = {
            className: "status_purple",
            name: "待审核",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.expenseManagement.reimbursementBill.toAudit
                    .billCount
              },
              {
                name: "金额",
                value: `￥${this.unitConvert(
                  newVal.todo.expenseManagement.reimbursementBill.toAudit.amount
                )}`
              }
            ]
          };

          this.otherStocktakingWaitFinancialAudit = {
            className: "status_purple",
            name: "待财务审核",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.other.stocktaking.waitFinancialAudit.billCount
              },
              {
                name: "盈亏数",
                value:
                  newVal.todo.other.stocktaking.waitFinancialAudit.profitLossQty
              },
              {
                name: "盈亏金额",
                value: `￥${this.unitConvert(
                  newVal.todo.other.stocktaking.waitFinancialAudit
                    .profitLossTaxedAmount
                )}`
              }
            ]
          };

          this.otherManulUncheck = {
            className: "status_blue",
            name: "未复核",
            details: [
              {
                name: "记账笔数",
                value: newVal.todo.other.manul.uncheck.billCount
              },
              {
                name: "收款金额",
                value: `￥${this.unitConvert(
                  newVal.todo.other.manul.uncheck.receiveAmount
                )}`
              },
              {
                name: "付款金额",
                value: `￥${this.unitConvert(
                  newVal.todo.other.manul.uncheck.payAmount
                )}`
              }
            ]
          };

          this.otherAccountCheckCurrentAccountUnfinish = {
            className: "status_green",
            name: "往来对账",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.other.accountCheck.currentAccountUnfinish
                    .billCount
              },
              {
                name: "对账金额",
                value: `￥${this.unitConvert(
                  newVal.todo.other.accountCheck.currentAccountUnfinish.amount
                )}`
              }
            ]
          };
          this.otherAccountCheckLogisticCollectingUnfinish = {
            className: "status_orange",
            name: "代收对账",
            details: [
              {
                name: "单据数",
                value:
                  newVal.todo.other.accountCheck.logisticCollectingUnfinish
                    .billCount
              },
              {
                name: "对账金额",
                value: `￥${this.unitConvert(
                  newVal.todo.other.accountCheck.logisticCollectingUnfinish
                    .amount
                )}`
              }
            ]
          };
        }
      }
    },
    searachParams: {
      deep: true,
      handler(newVal) {
        this.companyIds = newVal.companyIds;
      }
    }
  },
  methods: {
    unitConvert: unitConvert,
    getUseDate() {
      let date = {};
      switch (this.searachParams.accumulativePattern) {
        case 0:
          date = getDate();
          break;
        case 1:
          date = getCurMonth();
          break;
        case 2:
          date = getCurQuarter();
          break;
        case 3:
          date = getCurYear();
          break;
        default:
          break;
      }
      return date;
    },
    toPaymentStatement() {
      this.$router.push({
        name: "PaymentStatement"
      });
    },
    toCollectionStatement() {
      this.$router.push({
        name: "CollectionStatement"
      });
    },
    toManualBill(type) {
      const date = this.getUseDate();
      const reportSearch = {
        dateType: 1,
        timeRange: [date.dateStart, date.dateEnd],
        companyIds: this.searachParams.companyIds,
        businessType: ["DZ", "DS"],
        paymentTypes: type === "in" ? [0] : [1]
      };
      this.$router.push({
        name: "ManualBill",
        query: { reportSearch }
      });
    },
    refreshCooperatorBillSort() {
      this.$refs.cooperatorBillSort &&
        this.$refs.cooperatorBillSort.getCooperatorBillSortList();
    }
  }
};
</script>
<style lang="scss" scoped>
.content_height {
  border-radius: 6px;
  .main_div_each {
    margin-bottom: 10px;
    width: 100%;
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    .border {
      top: 1px;
    }
    .title {
      margin: 16px 22.2px 0 16px;
      font-size: 16px;
      color: #171f24;
      padding-left: 8px;
      font-weight: 600;
      .detail_info {
        float: right;
        margin: 0;
        white-space: nowrap;
      }
    }
    .item-title-container {
      margin-bottom: 10px;
    }
  }
}

.border {
  margin-right: 4px;
  width: 4px;
  height: 14px;
  background: #3aa7ff;
  display: inline-block;
  position: relative;
  border-radius: 6px;
}
.icon-now-pay {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-image: url("~@/assets/images/icon-nowpay.png");
  background-size: 100% 100%;
}
.icon-advance {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-image: url("~@/assets/images/icon-advance.png");
  background-size: 100% 100%;
}
.icon-logistics {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-image: url("~@/assets/images/icon-quehuo.png");
  background-size: 100% 100%;
}
.icon-taking {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-image: url("~@/assets/images/icon-taking.png");
  background-size: 100% 100%;
}
.icon-charge {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 2px;
  background-image: url("~@/assets/images/icon-charge.png");
  background-size: 100% 100%;
}
.icon-statement {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-image: url("~@/assets/images/icon-statement.png");
  background-size: 100% 100%;
}
.icon-manual {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-image: url("~@/assets/images/icon-manual.png");
  background-size: 100% 100%;
}
.icon-fees {
  display: inline-block;
  vertical-align: bottom;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-image: url("~@/assets/images/icon-fees.png");
  background-size: 100% 100%;
}
</style>
