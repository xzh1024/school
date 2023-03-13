<template>
  <div class="total_div">
    <div class="left_Info">
      <h4 class="totalTitle">
        <span class="border"></span>【今日/月累计】概括
      </h4>
      <div class="eachInfo" style="opacity:0"></div>
      <div class="eachInfo" @click="toList('total')">
        <p class="title">
          采购总金额
          <el-popover
            placement="right"
            title="标题"
            width="200"
            trigger="hover"
            content="指定业务日期范围内 实采额 与 实退额 之和、单据之和、配件种类之和、配件数量之和以及本月至今与上月同一时间段的比值注意：这里的统计数据是刨除了当日采当日退的配件的    月至今环比公式：（本月至今金额-上月同期金额）/上月同期金额*100%"
          >
            <i
              class="el-icon-question"
              style="margin-left:5px;"
              slot="reference"
            ></i>
          </el-popover>
        </p>
        <h4>
          <span>￥</span>{{ totalInfo ? totalInfo.AmountToday : 0 }}/<span
            >￥</span
          >{{ totalInfo ? totalInfo.AmountMonthtodate : 0 }}
        </h4>
        <p>
          单据数
          <span
            >{{ totalInfo ? totalInfo.BillQtyToday : 0 }}/{{
              totalInfo ? totalInfo.BillQtyMonthtodate : 0
            }}</span
          >配件种类 {{ totalInfo ? totalInfo.PartCateToday : 0 }}/{{
            totalInfo ? totalInfo.PartCateMonthtodate : 0
          }}
        </p>
        <p>
          配件数量 {{ totalInfo ? totalInfo.PartQtyToday : 0 }}/{{
            totalInfo ? totalInfo.PartQtyMonthtodate : 0
          }}
        </p>
        <p class="line"></p>
        <p>
          月至今环比
          <span
            ><i
              v-if="totalInfo"
              class="icon"
              :class="totalInfo.AmountMOM > 0 ? 'iconUp' : 'iconDown'"
              style="margin-right:5px;"
            ></i
            >{{
              totalInfo ? Math.abs(totalInfo.AmountMOM * 100).toFixed(2) : 0
            }}%</span
          >
          <span v-if="!totalInfo.AmountMOM">-</span>
        </p>
      </div>
      <div style="clear:both"></div>
      <div class="bottom_div">
        <div
          class="eachInfo"
          v-for="item in leftInfoEach"
          :key="item.name"
          @click="toList(item.name)"
        >
          <p class="title">{{ item.name }}</p>
          <h4>
            <span>￥</span>{{ item.AmountToday }}/<span>￥</span
            >{{ item.AmountMonthtodate }}
          </h4>
          <p>
            单据数
            <span>{{ item.BillQtyToday }}/{{ item.BillQtyMonthtodate }}</span
            >配件种类 {{ item.PartCateToday }}/{{ item.PartCateMonthtodate }}
          </p>
          <p>配件数量 {{ item.PartQtyToday }}/{{ item.PartQtyMonthtodate }}</p>
          <p class="line"></p>
          <p>
            月至今环比
            <span v-if="item.AmountMOM">
              <i
                class="icon"
                :class="item.AmountMOM > 0 ? 'iconUp' : 'iconDown'"
              ></i>
              {{ Math.abs(item.AmountMOM * 100).toFixed(2) }}%
            </span>
            <span v-if="!item.AmountMOM">-</span>
          </p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="right_info">
      <div
        class="eachInfo"
        style="float:none;margin-bottom:10px;"
        v-for="item in infoData"
        :key="item.type"
        @click="toList(item.type)"
      >
        <p class="title">{{ item.type }}</p>
        <h4>
          <span>￥</span>{{ item.AmountToday }}/<span>￥</span
          >{{ item.AmountMonthtodate }}
        </h4>
        <p>
          单据数
          <span>{{ item.BillQtyToday }}/{{ item.BillQtyMonthtodate }}</span
          >配件种类 {{ item.PartCateToday }}/{{ item.PartCateMonthtodate }}
        </p>
        <p>配件数量 {{ item.PartQtyToday }}/{{ item.PartQtyMonthtodate }}</p>
        <p class="line"></p>
        <p>
          月至今环比
          <span v-if="item.AmountMOM"
            ><i
              class="icon"
              :class="item.AmountMOM > 0 ? 'iconUp' : 'iconDown'"
            ></i>
            {{ Math.abs(item.AmountMOM * 100).toFixed(2) }}%
          </span>
          <span v-if="!item.AmountMOM">-</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FilialeSelect",
  data() {
    return {
      infoData: [],
      leftInfoEach: [],
      totalInfo: {}
    };
  },
  props: {
    panelData: Object,
    companyIdListSet: Array
  },
  watch: {
    panelData: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.infoData = [
            { ...newVal.stockin, type: "入库金额" },
            { ...newVal.sales, type: "销售金额" }
          ];
          this.leftInfoEach = [
            { ...newVal.normalPurchases, name: "正常采购金额" },
            { ...newVal.urgentPurchases, name: "急件采购金额" },
            { ...newVal.return, name: "退货金额" }
          ];
          this.totalInfo = newVal.totalPurchases;
        }
      }
    }
  },
  methods: {
    toList(type) {
      let query = {};
      const aggregate = {
        cooperator: ["cooperatorArea", "cooperatorNameStr"],
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
      if (type == "total") {
        query = {
          cond: {
            billType: ["cg", "jj"],
            companyIds: this.companyIdListSet
          },
          aggregate: aggregate
        };
      } else if (type == "正常采购金额") {
        query = {
          cond: {
            billType: ["cg"],
            companyIds: this.companyIdListSet
          },
          aggregate: aggregate
        };
      } else if (type == "急件采购金额") {
        query = {
          cond: {
            billType: ["jj"],
            companyIds: this.companyIdListSet
          },
          aggregate: aggregate
        };
      } else if (type == "退货金额") {
        query = {
          cond: {
            billType: ["ct"],
            companyIds: this.companyIdListSet
          },
          aggregate: aggregate
        };
      } else if (type == "入库金额") {
        query = {
          cond: {
            billType: ["cg", "jj"],
            companyIds: this.companyIdListSet
          },
          aggregate: aggregate
        };
      } else {
        return;
      }
      this.$router.push({
        name: "purchaseReportList",
        query: query
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.total_div {
  min-width: 1300px;
  margin-top: 10px;
  padding: 16px;
  width: 100%;
  height: 460px;
  background: #ffffff;
  overflow: hidden;
  .left_Info {
    float: left;
    width: 60%;
    height: 460px;
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
      .eachInfo {
        background-image: linear-gradient(-44deg, #92edb7 0%, #41c6af 100%);
      }
    }
  }
  .right_info {
    float: left;
    width: 39%;
    height: 460px;
    padding-left: 68px;
    font-family: PingFangSC-Regular;
  }
}
.eachInfo {
  cursor: pointer;
  float: left;
  margin-right: 10px;
  width: 316px;
  height: 183px;
  padding: 16px;
  background-image: linear-gradient(135deg, #3f8eff 0%, #41ccff 100%);
  border-radius: 6px;
  color: #ffffff;
  .title {
    font-size: 14px;
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
    width: 284px;
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
      margin-right: 5px;
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
i {
  font-style: normal;
}
</style>
