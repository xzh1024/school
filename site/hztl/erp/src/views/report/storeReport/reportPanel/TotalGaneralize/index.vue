<template>
  <div>
    <div class="main_div">
      <h4 class="totalTitle" style="margin-bottom:16px">
        <span class="border"></span>当前库存情况
      </h4>
      <div class="each-box">
        <div class="eachPanel" @click="toStockSearch">
          <h4 style="position:relative">
            <i class="icon icon-shiji"></i>实际库存
            <el-popover
              placement="right"
              width="300"
              trigger="hover"
              content="指定仓库及货主当前的在库配件的总实际库存数、总实际库存金额、总实际库存配件种类数；库存金额=sum（库存数量*进货价）"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:92px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <span class="span-money"
            >库存金额<i
              >￥{{
                unitConvert(current && current.stock ? current.stock.amount : 0)
              }}</i
            ></span
          >
          <span
            >配件种类<i style="color:#3aa7ff">{{
              current && current.stock ? current.stock.partCount : 0
            }}</i></span
          >
          <span
            >实际数量<i style="color:#f5a622">{{
              current && current.stock ? current.stock.partQty : 0
            }}</i></span
          >
        </div>
        <div class="eachPanel" @click="toStockSearch">
          <h4 style="position:relative">
            <i class="icon icon-dongtai"></i>动态库存<el-popover
              placement="right"
              width="300"
              trigger="hover"
              content="指定仓库及货主当前的在库配件的总动态库存数、总动态库存金额、总动态库存配件种类数；库存金额=sum（库存数量*进货价）"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:92px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <span class="span-money"
            >库存金额<i
              >￥{{
                unitConvert(
                  current && current.dynamicStock
                    ? current.dynamicStock.amount
                    : 0
                )
              }}</i
            ></span
          >
          <span
            >配件种类<i style="color:#3aa7ff">{{
              current && current.dynamicStock
                ? current.dynamicStock.partCount
                : 0
            }}</i></span
          >
          <span
            >动态数量<i style="color:#f5a622">{{
              current && current.dynamicStock ? current.dynamicStock.partQty : 0
            }}</i></span
          >
        </div>
        <div class="eachPanel" @click="toStockSearch">
          <h4 style="position:relative">
            <i class="icon icon-suoding"></i>锁定库存<el-popover
              placement="right"
              width="300"
              trigger="hover"
              content="指定仓库及货主当前的在库配件的总锁定库存数、总锁定库存金额、总锁定库存配件种类数；库存金额=sum（库存数量*进货价）"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:92px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <span class="span-money"
            >库存金额<i
              >￥{{
                unitConvert(
                  current && current.lockedStock
                    ? current.lockedStock.amount
                    : 0
                )
              }}</i
            ></span
          >
          <span
            >配件种类<i style="color:#3aa7ff">{{
              current && current.lockedStock ? current.lockedStock.partCount : 0
            }}</i></span
          >
          <span
            >锁定数量<i style="color:#f5a622">{{
              current && current.lockedStock ? current.lockedStock.partQty : 0
            }}</i></span
          >
        </div>
        <div class="eachPanel" @click="toOverstock">
          <h4 style="position:relative">
            <i class="icon icon-chaochu"></i>超储<el-popover
              placement="right"
              width="300"
              trigger="hover"
              content="指定仓库指定货主公司的配件超出库存上限的总库存金额、总配件种类数、总配件数量；金额=sum（配件数量*进货价）"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:59px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <span class="span-money"
            >金额<i
              >￥{{
                unitConvert(
                  current && current.overStock ? current.overStock.amount : 0
                )
              }}</i
            ></span
          >
          <span
            >配件种类<i style="color:#3aa7ff">{{
              current && current.overStock ? current.overStock.partCount : 0
            }}</i></span
          >
          <span
            >配件数量<i style="color:#f5a622">{{
              current && current.overStock ? current.overStock.partQty : 0
            }}</i></span
          >
        </div>
        <div class="eachPanel" style="cursor:default">
          <h4 style="position:relative">
            <i class="icon icon-duanque"></i>短缺<el-popover
              placement="right"
              width="300"
              trigger="hover"
              content="指定仓库指定货主公司的配件低于库存下限的总库存金额、总配件种类数、总配件数量；金额=sum（配件数量*平均进货价）"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:59px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <span
            >金额<i
              >￥{{
                unitConvert(
                  current && current.shortStock ? current.shortStock.amount : 0
                )
              }}</i
            ></span
          >
          <span
            >配件种类<i style="color:#3aa7ff">{{
              current && current.shortStock ? current.shortStock.partCount : 0
            }}</i></span
          >
          <span
            >配件数量<i style="color:#f5a622">{{
              current && current.shortStock ? current.shortStock.partQty : 0
            }}</i></span
          >
        </div>

        <div class="eachPanel" style="cursor:default">
          <h4 style="position:relative">
            <i class="icon icon-zaitu"></i>采购在途<el-popover
              placement="right"
              width="300"
              trigger="hover"
              content="有采购订单的采购到货单状态未完成以及采购订单状态为待转采购单的单据之和、进货金额之和、配件种类之和、配件数量之和"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:92px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <span
            >单据数<i>{{
              current && current.purchaseOnpassage
                ? current.purchaseOnpassage.billCount
                : 0
            }}</i></span
          >
          <span
            >金额<i
              >￥{{
                unitConvert(
                  current && current.purchaseOnpassage
                    ? current.purchaseOnpassage.amount
                    : 0
                )
              }}</i
            ></span
          >
          <span
            >配件种类<i style="color:#3aa7ff">{{
              current && current.purchaseOnpassage
                ? current.purchaseOnpassage.partCount
                : 0
            }}</i></span
          >
          <span
            >配件数量<i style="color:#f5a622">{{
              current && current.purchaseOnpassage
                ? current.purchaseOnpassage.partQty
                : 0
            }}</i></span
          >
        </div>
        <div class="eachPanel" style="cursor:default">
          <h4 style="position:relative">
            <i class="icon icon-daifahuo"></i>销售待发货<el-popover
              placement="right"
              width="300"
              trigger="hover"
              content="有客户订单的销售出库单未完成状态 + 客户订单待转销售出库状态的单据金额之和、单据之和、配件种类之和、配件数量之和"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:108px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <span
            >单据数<i>{{
              current && current.saleToDeliver
                ? current.saleToDeliver.billCount
                : 0
            }}</i></span
          >
          <span
            >金额<i
              >￥{{
                unitConvert(
                  current && current.saleToDeliver
                    ? current.saleToDeliver.amount
                    : 0
                )
              }}</i
            ></span
          >
          <span
            >配件种类<i style="color:#3aa7ff">{{
              current && current.saleToDeliver
                ? current.saleToDeliver.partCount
                : 0
            }}</i></span
          >
          <span
            >配件数量<i style="color:#f5a622">{{
              current && current.saleToDeliver
                ? current.saleToDeliver.partQty
                : 0
            }}</i></span
          >
        </div>
      </div>
    </div>
    <div class="total_div">
      <h4 class="totalTitle">
        <span class="border"></span>【今日/月累计】库存金额概览
        <span class="right-info">
          本月库存周转率=<span style="color:#3ca8ff;margin-right:55.3px;">{{
            Number(monthInventoryTurnOver || 0)
              ? Number(monthInventoryTurnOver).toFixed(2)
              : 0
          }}</span>
          本年库存周转率=<span style="color:#3ca8ff">{{
            Number(yearInventoryTurnOver || 0)
              ? Number(yearInventoryTurnOver).toFixed(2)
              : 0
          }}</span>
          <el-popover placement="right" width="300" trigger="hover">
            <p>
              本月库存周转率：指定仓库指定货主公司本月至今的配件库存周转快慢程度库存周转率
              = 本月至今配件销售成本/（(配件期初金额+配件期末金额)/2）
            </p>
            <p>
              本年库存周转率：指定仓库指定货主公司本年至今的配件库存周转快慢程度库存周转率
              = 本年至今配件销售成本/（(配件期初金额+配件期末金额)/2）
            </p>
            <i
              class="icon-question"
              style="position:absolute;top:2px;right:-19px;"
              slot="reference"
            ></i>
          </el-popover>
        </span>
      </h4>
      <div class="left_Info">
        <div class="bottom_div">
          <div
            class="eachInfo"
            style="cursor:pointer;"
            v-for="item in leftInfoEach"
            :key="item.name"
            @click="toOutIn(item.name)"
          >
            <h4 class="title" style="position:relative">
              {{ item.name
              }}<el-popover
                placement="right"
                width="300"
                trigger="hover"
                :content="item.content"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:59px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <p v-if="item.name == '期初' || item.name == '期末'">
              <span>库存金额</span><br />
              <span style="font-weight:400;"
                >￥{{
                  unitConvert(item && item.day ? item.day.amount : 0)
                }}/￥{{
                  unitConvert(item && item.month ? item.month.amount : 0)
                }}</span
              >
            </p>
            <p v-if="item.name == '入库' || item.name == '出库'">
              <span>单据数</span
              >{{ item && item.day ? item.day.billCount : 0 }}/<span></span
              >{{ item && item.month ? item.month.billCount : 0 }}
            </p>
            <p v-if="item.name == '入库'">
              <span>入库金额</span> <br />
              <span
                >￥{{
                  unitConvert(item && item.day ? item.day.amount : 0)
                }}/￥{{
                  unitConvert(item && item.month ? item.month.amount : 0)
                }}</span
              >
            </p>
            <p v-if="item.name == '出库'">
              <span>出库金额</span><br />
              <span>
                ￥{{ unitConvert(item && item.day ? item.day.amount : 0) }}/￥{{
                  unitConvert(item && item.month ? item.month.amount : 0)
                }}
              </span>
            </p>
            <p>
              <span>配件种类</span
              >{{ item && item.day ? item.day.partCount : 0 }}/<span></span
              >{{ item && item.month ? item.month.partCount : 0 }}
            </p>
            <p v-if="item.name == '入库' || item.name == '出库'">
              <span>配件数量</span
              >{{ item && item.day ? item.day.partQty : 0 }}/<span></span
              >{{ item && item.month ? item.month.partQty : 0 }}
            </p>
            <p v-if="item.name == '期初' || item.name == '期末'">
              <span>实际库存数量</span
              >{{ item && item.day ? item.day.partQty : 0 }}/<span></span
              >{{ item && item.month ? item.month.partQty : 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="right_info">
        <div
          class="eachInfo"
          style="float:none;margin-bottom:10px;background-image: linear-gradient(-44deg, #92EDB7 0%, #41C6AF 100%); cursor:pointer;"
          v-for="item in infoData"
          :key="item.type"
          @click="toOutIn(item.type)"
        >
          <h4 class="title" style="position:relative">
            {{ item.type
            }}<el-popover
              placement="right"
              width="300"
              trigger="hover"
              :content="item.content"
            >
              <i
                class="icon-question"
                style="position:absolute;top:2px;left:59px;"
                slot="reference"
              ></i>
            </el-popover>
          </h4>
          <p>
            单据数
            <span
              >{{ item && item.day ? item.day.billCount : 0 }}/{{
                item && item.month ? item.month.billCount : 0
              }}</span
            >
          </p>
          <p>
            盈亏金额 ￥{{
              unitConvert(
                item && item.day ? item.day.profitLossTaxedAmount : 0
              )
            }}/￥{{
              unitConvert(
                item && item.month ? item.month.profitLossTaxedAmount : 0
              )
            }}
          </p>
          <p>
            盈亏数量 {{ item && item.day ? item.day.profitLossQty : 0 }}/{{
              item && item.month ? item.month.profitLossQty : 0
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { unitConvert } from "../../../common/common";
export default {
  name: "FilialeSelect",
  data() {
    return {
      infoData: [],
      leftInfoEach: [],
      current: {},
      monthInventoryTurnOver: "",
      yearInventoryTurnOver: ""
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
          this.infoData = [
            {
              ...newVal.dayAndMonth.stockTaking,
              type: "盘点",
              content:
                "今日：指定仓库及货主盘点日期为今日0点至此时的总盘点单一方审核通过的单据数、总盈亏金额、总盈亏数量月累计：指定仓库及货主本月1号0点至此时产生的总盘点单单据数、总盈亏金额、总盈亏数量"
            }
          ];
          this.leftInfoEach = [
            {
              ...newVal.dayAndMonth.begin,
              name: "期初",
              content:
                "今日：指定仓库及货主今日0点在库配件的总实际库存金额、总配件种类数、总实际库存数月累计：指定仓库及货主本月1号0点在库配件的总实际库存金额、总配件种类数、总实际库存数库存金额=sum（库存数量*进货价）"
            },
            {
              ...newVal.dayAndMonth.end,
              name: "期末",
              content: "今日/月累计：库存金额=期初库存金额+入库金额-出库数量"
            },
            {
              ...newVal.dayAndMonth.stockOut,
              name: "出库",
              content:
                "今日：指定仓库及货主今日0点至此时的出库总单据数、出库总金额、出库总配件种类数、出库总配件数月累计：指定仓库及货主本月1号0点至此时的出库总单据数、出库总金额、出库总配件种类数、出库总配件数出库金额=sum（出库配件数量*进货价）"
            },
            {
              ...newVal.dayAndMonth.stockIn,
              name: "入库",
              content:
                "今日：指定仓库及货主今日0点至此时的入库总单据数、入库总金额、入库总配件种类数、入库总配件数月累计：指定仓库及货主本月1号0点至此时的入库总单据数、入库总金额、入库总配件种类数、入库总配件数入库金额=sum（入库配件数量*进货价）"
            }
          ];
          this.current = newVal.currentStock || {};
          this.monthInventoryTurnOver =
            newVal.dayAndMonth.monthInventoryTurnOver;
          this.yearInventoryTurnOver = newVal.dayAndMonth.yearInventoryTurnOver;
        }
      }
    }
  },
  methods: {
    unitConvert: unitConvert,
    toStockSearch() {
      this.$router.push({
        name: "StocksSearch"
      });
    },
    toOverstock() {
      const cond = {
        index: "overStockNumber",
        indexValue: "0",
        indexPattern: 1
      };
      this.$router.push({
        name: "overstockReportList",
        query: { cond }
      });
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    toOutIn(type) {
      //把日期区间设置为今天
      const d = new Date();
      const year = d.getFullYear();
      const month = this.change(d.getMonth() + 1);
      const day = this.change(d.getDate());
      const aggregate = {
        fields: [
          "warehouseName",
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
        warehouseIds: this.searachParams.warehouseIds,
        outOrInDate: {
          dataStart: `${year}-${month}-${day}`,
          dataEnd: `${year}-${month}-${day}`
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
.main_div {
  border-radius: 6px;
  background: #ffffff;
  height: 230px;
  margin-top: 10px;
  padding: 16px;
  .each-box {
    display: flex;
    .eachPanel {
      cursor: pointer;
      background: #f5f9ff;
      height: 160px;
      border-radius: 6px;
      margin-right: 10px;
      padding: 16px;
      flex: 1;
      &:nth-last-child(1) {
        margin: 0;
      }
      h4 {
        margin: 0 0 11px;
        font-size: 16px;
        font-weight: 600;
        .icon {
          margin-right: 5px;
          width: 22px;
          height: 22px;
          display: inline-block;
          background-size: 100% 100%;
          position: relative;
          bottom: 2px;
          &.icon-shiji {
            background-image: url("~@/assets/images/icon-shiji.png");
          }
          &.icon-zaitu {
            background-image: url("~@/assets/images/icon-zaitu.png");
          }
          &.icon-dongtai {
            background-image: url("~@/assets/images/icon-dongtai.png");
          }
          &.icon-suoding {
            background-image: url("~@/assets/images/icon-suoding.png");
          }
          &.icon-chaochu {
            background-image: url("~@/assets/images/icon-chaochu.png");
          }
          &.icon-duanque {
            background-image: url("~@/assets/images/icon-duanque.png");
          }
          &.icon-daifahuo {
            background-image: url("~@/assets/images/icon-daifahuo.png");
          }
        }
        span {
          width: 0;
          min-width: 0;
        }
      }
      span {
        font-weight: 400;
        min-width: 130px;
        width: 50%;
        font-size: 14px;
        display: inline-block;
        color: #666666;
        margin-bottom: 8px;
        &.span-money {
          width: 100%;
        }
        i {
          font-style: normal;
          padding-left: 5px;
        }
      }
    }
  }
}
.total_div {
  border-radius: 6px;
  min-width: 1200px;
  margin-top: 10px;
  padding: 16px;
  width: 100%;
  height: 253px;
  background: #ffffff;
  overflow: hidden;
  .eachInfo {
    flex: 1;
    margin-right: 10px;
    height: 183px;
    padding: 16px;
    background-image: linear-gradient(135deg, #3f8eff 0%, #41ccff 100%);
    border-radius: 6px;
    color: #ffffff;
    .title {
      font-size: 16px;
      margin: 0 0 8px;
    }
    p {
      margin: 0 0 8px;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
      span {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
  .left_Info {
    float: left;
    width: 74%;
    margin-top: 24px;
    height: 183px;
    .bottom_div {
      overflow: hidden;
      display: flex;
    }
  }
  .right_info {
    margin-top: 24px;
    float: left;
    width: 20%;
    height: 183px;
    font-family: PingFangSC-Regular;
  }
}
.line {
  width: 1px;
  height: 120px;
  margin: 49px 2% 0;
  background: #d6d6d6;
  float: left;
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
