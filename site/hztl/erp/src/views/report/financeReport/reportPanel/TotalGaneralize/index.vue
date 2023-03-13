<template>
  <el-row style="margin-top: 10px; height: 507px;">
    <el-col :span="12" style="height: 100%;">
      <div class="total_div">
        <h4 class="totalTitle">
          <span class="border"></span>
          <span>经营状况概览</span>
        </h4>
        <el-row :gutter="10" style="margin-top: 24px;">
          <el-col :span="8">
            <InfoItem
              :infoData="sale"
              style="height: 140px;"
              @click.native="toSalsReportList"
            />
            <InfoItem
              :infoData="saleDiscount"
              style="height: 140px;"
              @click.native="toSalsReportList"
            />
          </el-col>
          <el-col :span="8">
            <InfoItem
              :infoData="saleCost"
              style="height: 90px;"
              @click.native="toSalsReportList"
            />
            <InfoItem
              :infoData="otherIncome"
              style="height: 90px;"
              @click.native="toManualBill('in')"
            />
            <InfoItem
              :infoData="otherDisbursement"
              style="height: 90px;"
              @click.native="toManualBill('out')"
            />
          </el-col>
          <el-col :span="8">
            <InfoItem
              :infoData="grossProfit"
              style="height: 140px; cursor: default;"
            />
            <InfoItem
              :infoData="saleReceive"
              style="height: 140px;"
              @click.native="toFinanceReportList"
            />
          </el-col>
        </el-row>
        <div class="line" />
        <el-row :gutter="10">
          <el-col :span="8">
            <InfoItem
              :infoData="purchase"
              style="height: 118px; background-image: linear-gradient(-44deg, #92EDB7 0%, #41C6AF 100%);"
              @click.native="toPurchaseReportList('purchase')"
            />
          </el-col>
          <el-col :span="8">
            <InfoItem
              :infoData="purchaseDiscount"
              style="height: 118px; background-image: linear-gradient(-44deg, #92EDB7 0%, #41C6AF 100%);"
              @click.native="toPurchaseReportList('purchaseDiscount')"
            />
          </el-col>
          <el-col :span="8">
            <InfoItem
              :infoData="purchasePay"
              style="height: 118px; background-image: linear-gradient(-44deg, #92EDB7 0%, #41C6AF 100%);"
              @click.native="toPurchaseReportList('purchasePay')"
            />
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="12" style="height: 100%;">
      <div class="total_div" style="margin-left: 8px;">
        <h4 class="totalTitle">
          <span class="border"></span>
          <span>库存金额概览</span>
          <span class="right-info">
            <span>库存周转率=</span>
            <span class="text-font-primary">{{ inventoryTurnOver }}</span>
            <el-popover placement="right" width="300" trigger="hover">
              <p>
                本月库存周转率：指定仓库指定货主公司本月至今的配件库存周转快慢程度库存周转率
                = 本月至今配件销售成本/（(配件期初金额+配件期末金额)/2）
              </p>
              <i
                class="icon-question"
                style="position:absolute;top:2px;right:-19px;"
                slot="reference"
              ></i>
            </el-popover>
          </span>
        </h4>
        <el-row :gutter="10" style="margin-top: 24px;">
          <el-col :span="8">
            <InfoItem
              :infoData="stocktaking"
              style="height: 174px; background-image: linear-gradient(-44deg, #92EDB7 0%, #41C6AF 100%);"
              @click.native="toOutIn(stocktaking.name)"
            />
            <InfoItem
              :infoData="stockIn"
              style="height: 174px;"
              @click.native="toOutIn(stockIn.name)"
            />
          </el-col>
          <el-col :span="8">
            <InfoItem
              :infoData="stock"
              style="height: 174px;"
              @click.native="toStockSearch"
            />
            <InfoItem
              :infoData="this.stockOut"
              style="height: 174px;"
              @click.native="toOutIn(stockOut.name)"
            />
          </el-col>
          <el-col :span="8">
            <InfoItem
              :infoData="stockBegin"
              style="height: 174px;"
              @click.native="toOutIn(stockBegin.name)"
            />
            <InfoItem
              :infoData="stockEnd"
              style="height: 174px;"
              @click.native="toOutIn(stockEnd.name)"
            />
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { unitConvert, toFixed2 } from "../../../common/common";
import {
  getDate,
  getCurMonth,
  getCurQuarter,
  getCurYear
} from "../../../common/common";
import InfoItem from "./InfoItem";

export default {
  name: "FilialeSelect",
  components: { InfoItem },
  data() {
    return {
      sale: {},
      saleDiscount: {},
      saleCost: {},
      otherIncome: {},
      otherDisbursement: {},
      grossProfit: {},
      saleReceive: {},
      purchase: {},
      purchaseDiscount: {},
      purchasePay: {},
      stock: {},
      stockBegin: {},
      stockEnd: {},
      stockIn: {},
      stockOut: {},
      stocktaking: {},
      inventoryTurnOver: 0
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
          this.sale = {
            name: "销售金额",
            content:
              "指定业务公司指定业务日期范围内一方审核通过的总含税实售额（销售金额+销退金额）",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.sale.amount
                )}`
              },
              {
                name: "单据数",
                value: newVal.businessOverview.sale.billCount
              }
            ]
          };
          this.saleDiscount = {
            name: "销售优惠",
            content:
              "销售已结算部分的优惠总金额；优惠金额=销出已结优惠-销退已结优惠",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.saleDiscountAmount
                )}`
              }
            ]
          };
          this.saleCost = {
            name: "销售成本",
            content:
              "指定业务公司指定业务日期范围内一方审核通过的销售成本额（除去退货金额）",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.saleCostAmount
                )}`
              }
            ]
          };
          this.otherIncome = {
            name: "其他收入",
            content: "指定业务公司指定收付款日期范围内手工帐的收入总金额",
            view: [
              {
                name: "手工账收入",
                value: this.unitConvert(
                  newVal.businessOverview.otherIncome.detail.manualAccountAmount
                )
              }
            ],
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.otherIncome.TotalAmount
                )}`
              }
            ]
          };
          this.otherDisbursement = {
            name: "其他支出",
            content:
              "指定业务公司指定收付款日期范围内手工帐、费用报销、运费支出之和；公式：其他支出=手工帐支出+费用支出+运费；手工帐=SUM（手工帐支出）；费用支出=SUM(预支支出)+SUM(报销支出)+SUM(预支报销支出)-SUM（预支报销收入）；运费=SUM(发货自付支出+收货自付支出)",
            view: [
              {
                name: "手工账支出",
                value: this.unitConvert(
                  newVal.businessOverview.otherDisbursement.detail
                    .manualAccountAmount
                )
              },
              {
                name: "报销费用支出",
                value: this.unitConvert(
                  newVal.businessOverview.otherDisbursement.detail
                    .reimbursementAmount
                )
              },
              {
                name: "运费",
                value: this.unitConvert(
                  newVal.businessOverview.otherDisbursement.detail.freightAmount
                )
              }
            ],
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.otherDisbursement.TotalAmount
                )}`
              }
            ]
          };
          this.grossProfit = {
            name: "总利润",
            content:
              "指定业务公司指定日期内的总利润及利润率；公式：总利润=销售金额+其他收入-销售成本-其他支出-优惠金额；利润率=总利润/（销售收入+其他收入）",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.grossProfit.amount
                )}`
              },
              {
                name: "利润率",
                value: Number(newVal.businessOverview.grossProfit.ratio || 0)
                  ? `${toFixed2(
                      Number(newVal.businessOverview.grossProfit.ratio) * 100
                    )}%`
                  : 0
              }
            ]
          };
          this.saleReceive = {
            name: "销售回款金额",
            content:
              "销售已结算部分的已结算总额及回款率；公式：销售回款金额=销出实收总额-销退实付总额；回款率=销售回款金额/总销售金额",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.saleReceive.amount
                )}`
              },
              {
                name: "回款率",
                value: Number(newVal.businessOverview.saleReceive.ratio || 0)
                  ? `${toFixed2(
                      Number(newVal.businessOverview.saleReceive.ratio) * 100
                    )}%`
                  : 0
              }
            ]
          };
          this.purchase = {
            name: "采购金额",
            content:
              "指定业务公司指定业务日期范围内一方审核通过的总含税采购金额（采购金额+采退金额）",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.purchase.amount
                )}`
              },
              {
                name: "单据数",
                value: newVal.businessOverview.purchase.billCount
              }
            ]
          };
          this.purchaseDiscount = {
            name: "采购优惠",
            content:
              "采购金额中已结算部分的优惠总金额；优惠金额=采购优惠-采退优惠",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.purchaseDiscountAmount
                )}`
              }
            ]
          };
          this.purchasePay = {
            name: "采购付款金额",
            content:
              "采购已结算部分的已结算总额及回款率；公式：采购付款金额=采购实付总额-采退实收总额；回款率=采购付款金额/总采购金额",
            details: [
              {
                name: "",
                value: `￥${this.unitConvert(
                  newVal.businessOverview.purchasePay.amount
                )}`
              },
              {
                name: "回款率",
                value: Number(newVal.businessOverview.purchasePay.ratio || 0)
                  ? `${toFixed2(
                      Number(newVal.businessOverview.purchasePay.ratio) * 100
                    )}%`
                  : 0
              }
            ]
          };

          this.inventoryTurnOver = toFixed2(
            newVal.stockOverview.inventoryTurnOver
          );
          this.stock = {
            name: "当前库存",
            content:
              "指定仓库及货主当前的在库配件的总实际库存数、总实际库存金额、总实际库存配件种类数；库存金额=sum（库存数量*进货价）",
            details: [
              {
                name: "库存金额",
                value: `￥${this.unitConvert(
                  newVal.stockOverview.stock.amount
                )}`
              },
              {
                name: "配件种类",
                value: newVal.stockOverview.stock.partCount
              },
              {
                name: "实际库存数量",
                value: newVal.stockOverview.stock.partQty
              }
            ]
          };
          this.stockBegin = {
            name: "期初",
            content:
              "指定仓库及货主本期0点在库配件的总实际库存金额、总配件种类数、总实际库存数；库存金额=sum（库存数量*进货价）",
            details: [
              {
                name: "库存金额",
                value: `￥${this.unitConvert(
                  newVal.stockOverview.begin.amount
                )}`
              },
              {
                name: "配件种类",
                value: newVal.stockOverview.begin.partCount
              },
              {
                name: "实际库存数量",
                value: newVal.stockOverview.begin.partQty
              }
            ]
          };
          this.stockEnd = {
            name: "期末",
            content: "库存金额=期初库存金额+入库金额-出库数量",
            details: [
              {
                name: "库存金额",
                value: `￥${this.unitConvert(newVal.stockOverview.end.amount)}`
              },
              {
                name: "配件种类",
                value: newVal.stockOverview.end.partCount
              },
              {
                name: "实际库存数量",
                value: newVal.stockOverview.end.partQty
              }
            ]
          };
          this.stockIn = {
            name: "入库",
            content:
              "指定仓库及货主本期0点至此时的入库总单据数、入库总金额、入库总配件种类数、入库总配件数；入库金额=sum（入库配件数量*进货价）",
            details: [
              {
                name: "单据数",
                value: newVal.stockOverview.stockIn.billCount
              },
              {
                name: "入库金额",
                value: `￥${this.unitConvert(
                  newVal.stockOverview.stockIn.amount
                )}`
              },
              {
                name: "配件种类",
                value: newVal.stockOverview.stockIn.partCount
              },
              {
                name: "配件数量",
                value: newVal.stockOverview.stockIn.partQty
              }
            ]
          };
          this.stockOut = {
            name: "出库",
            content:
              "指定仓库及货主本期0点至此时的出库总单据数、出库总金额、出库总配件种类数、出库总配件数；出库金额=sum（出库配件数量*进货价）",
            details: [
              {
                name: "单据数",
                value: newVal.stockOverview.stockOut.billCount
              },
              {
                name: "出库金额",
                value: `￥${this.unitConvert(
                  newVal.stockOverview.stockOut.amount
                )}`
              },
              {
                name: "配件种类",
                value: newVal.stockOverview.stockOut.partCount
              },
              {
                name: "配件数量",
                value: newVal.stockOverview.stockOut.partQty
              }
            ]
          };
          this.stocktaking = {
            name: "盘点",
            content:
              "指定仓库及货主盘点日期为本期0点至此时的总盘点单一方审核通过的单据数、总盈亏金额、总盈亏数量",
            details: [
              {
                name: "单据数",
                value: newVal.stockOverview.stocktaking.billCount
              },
              {
                name: "盈亏金额",
                value: `￥${this.unitConvert(
                  newVal.stockOverview.stocktaking.profitLossTaxedAmount
                )}`
              },
              {
                name: "盈亏数量",
                value: newVal.stockOverview.stocktaking.profitLossQty
              }
            ]
          };
        }
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
    toSalsReportList() {
      const date = this.getUseDate();
      const cond = {
        ...date,
        companyIds: this.searachParams.companyIds
      };
      const aggregate = {
        company: ["companyName"],
        date: "date",
        datePattern: 0
      };

      this.$router.push({
        name: "salesReportList",
        query: { cond, aggregate }
      });
    },
    toManualBill(type) {
      const date = this.getUseDate();
      const reportSearch = {
        dateType: 1,
        timeRange: [date.dateStart, date.dateEnd],
        companyIds: this.searachParams.companyIds,
        businessType: type === "in" ? ["LR"] : ["LR", "FEE", "RS", "SS"],
        paymentTypes: type === "in" ? [0] : [1]
      };
      this.$router.push({
        name: "ManualBill",
        query: { reportSearch }
      });
    },
    toFinanceReportList() {
      const date = this.getUseDate();
      const cond = {
        billDate: { ...date },
        companyIds: this.searachParams.companyIds
      };
      const aggregate = ["businessMan", "companyName"];

      this.$router.push({
        name: "financeReportList",
        query: { cond, aggregate }
      });
    },
    toPurchaseReportList(type) {
      const date = this.getUseDate();
      let cond = {
        ...date,
        companyIds: this.searachParams.companyIds
      };
      const aggregate = {
        company: ["companyName"],
        date: "date",
        datePattern: 0
      };

      switch (type) {
        case "purchaseDiscount":
          cond = {
            ...cond,
            index: "benefitAmount",
            indexPattern: 1,
            indexValue: "0"
          };
          break;
        case "purchasePay":
          cond = {
            ...cond,
            index: "settledAmount",
            indexPattern: 1,
            indexValue: "0"
          };
          break;
        default:
          break;
      }

      this.$router.push({
        name: "purchaseReportList",
        query: { cond, aggregate }
      });
    },
    toStockSearch() {
      this.$router.push({
        name: "StocksSearch"
      });
    },
    toOutIn(type) {
      const date = this.getUseDate();
      const aggregate = {
        fields: [
          "ownerCompanyName",
          "inOrOutDate",
          "inOrOutType",
          "billNo",
          "partCode",
          "partName",
          "partBrand",
          "partProductionPlace",
          "billType"
        ]
      };
      const cond = {
        ownerCompanyIds: this.searachParams.companyIds,
        outOrInDate: {
          dateStart: date.dateStart,
          dateEnd: date.dateEnd
        },
        types: ["入库", "出库"].includes(type) ? [type] : ["入库", "出库"],
        billTypes: type === "盘点" ? ["pdr", "pdc"] : undefined
      };

      this.$router.push({
        name: "storeReportList",
        query: { aggregate, cond }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.total_div {
  border-radius: 6px;
  padding: 16px;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
}
.line {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: #d6d6d6;
}
.totalTitle {
  margin: 0;
  font-size: 16px;
  color: #171f24;
  letter-spacing: 0;
  .right-info {
    float: right;
    margin-right: 73.3px;
    position: relative;
  }
}
.border {
  display: inline-block;
  margin-right: 5px;
  width: 4px;
  height: 14px;
  border-radius: 6px;
  background: #3aa7ff;
}
.icon-question {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-ques.png");
  background-size: 100% 100%;
}
</style>
