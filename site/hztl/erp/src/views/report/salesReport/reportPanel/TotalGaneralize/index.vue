<template>
  <div class="total_div">
    <div class="left_Info">
      <h4 class="totalTitle">
        <span class="border"></span>【今日/月累计】概括
      </h4>
      <div style="clear:both"></div>
      <div class="bottom_div">
        <div
          class="eachInfo"
          v-for="item in leftInfoEach"
          :key="item.name"
          @click="toList(item.name)"
        >
          <p class="title" style="position:relative;">
            {{ item.name }}
            <el-popover
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
          </p>
          <h4>
            <span>￥</span>{{ item.day.amount }}/<span>￥</span
            >{{ item.month.amount }}
          </h4>
          <p>
            单据数
            <span>{{ item.day.billCount }}/{{ item.month.billCount }}</span>
            <!-- 配件种类
            <span>{{ item.month.partCount }}/{{ item.month.partCount }}</span> -->
            配件数量
            <span>{{ item.day.partQty }}/{{ item.month.partQty }}</span>
          </p>
          <p class="line"></p>
          <p>
            月至今环比
            <span v-if="item.momRatio"
              ><i
                class="icon"
                :class="item.momRatio > 0 ? 'iconUp' : 'iconDown'"
              ></i>
              {{
                item.momRatio !== 0
                  ? (Math.abs(item.momRatio) * 100).toFixed(2) + "%"
                  : "-"
              }}
            </span>
            <span v-if="!item.momRatio">-</span>
          </p>
          <p v-if="item.name == '销售金额'">
            成本
            <span
              >{{ item.month.taxedPurchaseAmount }}/{{
                item.month.taxedPurchaseAmount
              }}</span
            >
            优惠金额
            <span
              >{{ item.month.benefitAmount }}/{{
                item.month.benefitAmount
              }}</span
            >
            毛利
            <span
              >{{ item.month.taxedGrossProfit }}/{{
                item.month.taxedGrossProfit
              }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FilialeSelect",
  data() {
    return {
      leftInfoEach: [],
      selectCompanyIds: []
    };
  },
  props: {
    panelData: Object,
    companyIds: Array
  },
  watch: {
    panelData: {
      deep: true, // 深度监听
      handler(newVal) {
        if (newVal) {
          this.leftInfoEach = [
            {
              ...newVal.dayAndMonth.sale,
              name: "销售金额",
              content:
                "指定业务日期范围内 实售额 与 实退额 之和、单据之和、配件种类之和、配件数量之和、成本金额之和、毛利之和以及本月至今与上月同一时间段的比值"
            },
            {
              ...newVal.dayAndMonth.return,
              name: "退货金额",
              content:
                "销售退货单业务日期为今日/本月并财务或仓库审核通过的单据退货金额之和、单据之和、配件种类之和、配件数量之和、和本月至今与上月同一时间段的比值"
            },
            {
              ...newVal.dayAndMonth.stockout,
              name: "出库金额",
              content:
                "销售出库单今日/本月仓库审核通过的出库金额之和、单据之和、出库配件种类之和、出库配件数量之和、和本月至今与上月同一时间段的比值"
            }
          ];
        }
      }
    },
    companyIds: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.selectCompanyIds = newVal;
        }
      }
    }
  },
  methods: {
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    toList(type) {
      let query = {};
      //把日期区间设置为今天
      const d = new Date();
      const year = d.getFullYear();
      const month = this.change(d.getMonth() + 1);
      const day = this.change(d.getDate());
      const dateStart = `${year}-${month}-${day}`;
      const dateEnd = `${year}-${month}-${day}`;
      const aggregate = {
        cooperator: [
          "cooperatorArea",
          "cooperatorNameStr",
          "cooperatorProperty"
        ],
        bill: ["billNo", "billType"],
        part: [
          "partCode",
          "partName",
          "partBrand",
          "partCategory",
          "partVehModel",
          "partProductionPlace"
        ]
      };
      if (type == "销售金额") {
        query = {
          cond: {
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd,
            billTypes: ["xs"]
          },
          aggregate: aggregate
        };
      } else if (type == "退货金额") {
        query = {
          cond: {
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd,
            billTypes: ["xt"]
          },
          aggregate: aggregate
        };
      } else if (type == "出库金额") {
        query = {
          cond: {
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd,
            billTypes: ["xs"]
          },
          aggregate: aggregate
        };
      }
      this.$router.push({
        name: "salesReportList",
        query: query
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.total_div {
  border-radius: 6px;
  margin-top: 10px;
  padding: 16px;
  width: 100%;
  height: 253px;
  background: #ffffff;
  overflow: hidden;
  .left_Info {
    height: 253px;
    .totalTitle {
      margin: 0;
      font-size: 16px;
      color: #171f24;
      letter-spacing: 0;
    }
    .border {
      display: inline-block;
      margin-right: 5px;
      width: 4px;
      height: 14px;
      border-radius: 6px;
      background: #3aa7ff;
    }
    .bottom_div {
      overflow: hidden;
      margin-top: 24px;
    }
  }
}
.eachInfo {
  cursor: pointer;
  float: left;
  margin-right: 10px;
  width: 424px;
  height: 183px;
  padding: 16px;
  background-image: linear-gradient(135deg, #3f8eff 0%, #41ccff 100%);
  border-radius: 6px;
  color: #ffffff;
  .title {
    color: #ffffff;
    font-size: 14px;
    padding: 0;
  }
  h4 {
    margin: 0;
    font-size: 24px;
    line-height: 38px;
    font-weight: 400;
    color: #ffffff;
    span {
      font-size: 12px;
      font-weight: 0;
    }
  }
  .line {
    width: 392px;
    height: 1px;
    margin: 8px auto;
    background: #e8e8e8;
  }
  p {
    margin: 0;
    font-size: 12px;
    line-height: 22px;
    span {
      margin-right: 10px;
    }
    .icon {
      display: inline-block;
      width: 10px;
      height: 12px;
      background-size: 100% 100%;
      &.iconUp {
        background-image: url("~@/assets/images/icon-up.png");
      }
      &.iconDown {
        background-image: url("~@/assets/images/icon-down.png");
      }
    }
  }
}
.line {
  width: 1px;
  height: 182px;
  margin-top: 139px;
  background: #d6d6d6;
  float: left;
}
.icon-question {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-ques.png");
  background-size: 100% 100%;
}
</style>
