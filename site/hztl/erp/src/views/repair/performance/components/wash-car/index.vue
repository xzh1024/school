<template>
  <!-- 维修人员绩效设置-洗车人员 -->
  <div class="el-card box-card" style="height: 100%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="one">
        <span slot="label">
          统一比例提成（{{ open == "unified" ? "启用" : "未启用" }}）
        </span>
        <div class="setting-box">
          <div class="setting-btns" v-if="hasBelongsPerm('edit')">
            <el-button type="primary" size="small" @click="unifiedSava">
              保存（F3）
            </el-button>
            <el-button
              type="primary"
              size="small"
              v-if="open != 'unified'"
              @click="isOpen('unified')"
            >
              启用
            </el-button>
            <el-button
              type="danger"
              size="small"
              v-if="open == 'unified'"
              @click="isStop()"
            >
              停用
            </el-button>
          </div>
          <div v-loading="loading">
            <p class="p-tit">洗车提成比例设置</p>
            <div>
              提成比例
              <span style="padding: 0 10px">
                <el-input-number
                  placeholder="请输入比例"
                  class="input-dw"
                  size="mini"
                  :precision="2"
                  :step="1"
                  :max="100"
                  :controls="false"
                  style="width: 105px"
                  v-model="unified.rate"
                >
                </el-input-number>
                <span class="bai-dw">%</span>
              </span>
              <span style="color:#f7742d">
                提成金额 = 结算金额 * 提成比例 * 洗车人分配比例
              </span>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="two">
        <span slot="label">
          阶梯提成（{{ open == "ladder" ? "启用" : "未启用" }}）
        </span>
        <div class="setting-box">
          <div class="setting-btns" v-if="hasBelongsPerm('edit')">
            <el-button type="primary" size="small" @click="ladderSava">
              保存（F3）
            </el-button>
            <el-button
              type="primary"
              size="small"
              v-if="open != 'ladder'"
              @click="isOpen('ladder')"
            >
              启用
            </el-button>
            <el-button
              type="danger"
              size="small"
              v-if="open == 'ladder'"
              @click="isStop()"
            >
              停用
            </el-button>
          </div>
          <div v-loading="loading">
            <p class="p-tit">
              洗车提成比例设置
              <span style="color:#f7742d">
                提成金额 = 结算金额 * 提成比例 * 洗车人分配比例
              </span>
            </p>
            <div class="ladder-box">
              <div class="ladder-list">
                <div
                  class="ladder-p"
                  v-for="(item, ind) in ladder.ladders"
                  :key="ind"
                >
                  <el-input-number
                    size="mini"
                    :precision="2"
                    v-model="item.start"
                    :controls="false"
                    @change="moneyChange()"
                  >
                  </el-input-number>
                  <span class="txt">
                    ≤
                    <span class="txt2">结算金额</span>
                    ＜
                  </span>
                  <el-input
                    :disabled="true"
                    size="mini"
                    :precision="2"
                    v-model="item.end"
                    style="width:130px"
                  ></el-input>
                  <span class="txt">提成</span>
                  <el-input-number
                    placeholder="请输入比例"
                    class="input-dw"
                    size="mini"
                    :precision="2"
                    :step="1"
                    :max="100"
                    :controls="false"
                    style="width: 105px"
                    v-model="item.rate"
                  >
                  </el-input-number>
                  <span class="bai-dw">%</span>
                  <i class="el-icon-error" @click="removeLadder(ind)"></i>
                </div>
                <el-button
                  class="add-ladder"
                  type="primary"
                  plain
                  @click="addLadder()"
                >
                  +添加提成阶梯
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getSettings, updateSettings } from "@/api/basis/performance/index"; // updateSettings
export default {
  name: "wash-car",
  data() {
    return {
      loading: false,
      activeName: "one",
      open: "", // 提成方式
      unified: {
        manHourEnableType: "none",
        manHourRate: null,
        partRate: null
      }, // 统一绩效
      ladder: {
        manHourEnableType: "none",
        manHourLadders: [],
        partLadders: []
      } // 阶梯绩效设置
    };
  },
  created() {
    this.getSetting();
  },
  methods: {
    getSetting() {
      this.loading = true;
      const params1 = {
        module: "repair", // 模块
        type: "washerAchievementEnableType" // 类型-维修技师绩效启用类型
      };
      getSettings(params1).then(res => {
        this.open = res.value;
        // console.log("洗车启用类型::::::", this.open);
      });
      const params2 = {
        module: "repair", // 模块
        type: "washerUnifiedAchievement" // 类型-维修技师统一绩效设置
      };
      getSettings(params2).then(res => {
        res.value.rate = res.value.rate > 0 ? res.value.rate * 100 : "";
        this.unified = res.value;
        this.loading = false;
        // console.log("洗车统一::::::", this.unified);
      });
      const params3 = {
        module: "repair", // 模块
        type: "washerLadderAchievement" // 类型-维修技师阶梯绩效设置
      };
      getSettings(params3).then(res => {
        res.value.ladders.forEach(item => {
          item.rate = item.rate > 0 ? item.rate * 100 : "";
        });
        this.ladder = res.value;
        this.moneyChange();
        // console.log("洗车阶梯::::::", this.ladder);
      });
    },
    // 统一提成保存
    unifiedSava() {
      const data = JSON.parse(JSON.stringify(this.unified));
      data.rate =
        parseFloat(data.rate) > 0
          ? parseFloat(data.rate / 100).toFixed(4)
          : null;
      const datas = {
        module: "repair",
        type: "washerUnifiedAchievement",
        value: data
      };
      updateSettings(datas).then(() => {
        this.$message({
          message: "设置成功！",
          type: "success"
        });
        this.update();
      });
    },
    // 启用
    isOpen(type) {
      const data = {
        module: "repair", // 模块
        type: "washerAchievementEnableType",
        value: type
      };
      updateSettings(data).then(() => {
        this.$message({
          message: "启用成功！",
          type: "success"
        });
        this.update();
      });
    },
    isStop() {
      const data = {
        module: "repair", // 模块
        type: "washerAchievementEnableType",
        value: "none"
      };
      updateSettings(data).then(() => {
        this.$message({
          message: "停用成功！",
          type: "success"
        });
        this.update();
      });
    },
    // 添加阶梯
    addLadder() {
      // 添加维修工单阶梯
      this.ladder.ladders.push({
        rate: "",
        start: "",
        end: ""
      });
      this.moneyChange();
    },
    // 删除阶梯
    removeLadder(i) {
      // 删除维修工单阶梯
      this.ladder.ladders.splice(i, 1);
      this.moneyChange();
    },
    // 金额变化
    moneyChange() {
      // 维修工单阶梯变化
      const arr = this.ladder.ladders;
      arr.forEach((item, ind) => {
        if (ind < arr.length - 1) {
          item.end = arr[ind + 1].start ? arr[ind + 1].start : "";
        }
        if (ind == arr.length - 1) {
          item.end = "无穷大";
        }
      });
    },
    // 提交阶梯
    ladderSava() {
      const ladders = JSON.parse(JSON.stringify(this.ladder));
      ladders.ladders.forEach(item => {
        item.end = item.end == "无穷大" ? null : item.end;
        item.rate = parseFloat(item.rate / 100).toFixed(4);
      });
      const data = {
        module: "repair",
        type: "washerLadderAchievement",
        value: ladders
      };
      updateSettings(data).then(() => {
        this.$message({
          message: "设置成功！",
          type: "success"
        });
        this.update();
      });
    },
    // 数据更新
    update() {
      this.getSetting();
    },
    // tab切换
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleClick(tab, event) {
      // console.log(tab, event);
      this.update();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.ladder-p {
  i {
    position: relative;
    top: 2px;
    left: 10px;
    font-size: 18px;
    color: $color-primary;
    @include font_color("color-primary");
    cursor: pointer;
  }
}
.txt-msg {
  padding: 5px;
  line-height: 26px;
  color: $color-primary;
  @include font_color("color-primary");
}
.p-tit {
  position: relative;
  padding-left: 10px;
  &::before {
    position: absolute;
    left: 0;
    top: 3px;
    display: inline-block;
    content: "";
    width: 4px;
    background: $color-primary;
    @include background_color("color-primary");
    height: 14px;
    margin-right: 5px;
    border-radius: 100px;
  }
}
::v-deep {
  .el-tabs {
    height: 100%;
    .el-tabs__nav {
      margin-left: 10px;
    }
    .el-tabs__content {
      height: calc(100% - 39px);
      overflow: auto;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .setting-box {
    padding: 10px;
    padding-top: 0;
    height: 100%;
    overflow-x: auto;
  }
  .setting-btns {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    background: #fff;
    margin-bottom: 5px;
    padding: 5px 0;
    border-radius: 2px;
    border-bottom: 1px solid #eee;
  }
  .setting-tit {
    padding: 5px 10px;
    background: #f5f7fa;
    border: 1px solid #e8eaef;
    border-width: 1px 1px 0 1px;
  }
  .setting-table {
    border: 1px solid #e8eaef;
    border-width: 1px 0 0 1px;
    tr {
      th,
      td {
        border: 1px solid #e8eaef;
        border-width: 0 1px 1px 0;
        text-align: center;
        color: #606266;
      }
      th {
        height: 32px;
        background: #f5f7fa;
        font-weight: 400;
      }
      td {
        height: 38px;
        &:first-child {
          background: #f5f7fa;
        }
      }
    }
  }
  .el-radio {
    font-weight: 400;
    margin-right: 15px;
  }
  .ladder-box {
    // padding: 5px;
    overflow: auto;
  }
  .ladder-list {
    .ladder-p {
      width: 650px;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 4px;
      background: #e4e7ed;
      .txt {
        padding: 0 10px;
      }
      .txt2 {
        display: inline-block;
        width: 60px;
        text-align: center;
      }
      .el-input__inner {
        text-align: left;
      }
    }
    .add-ladder {
      width: 650px;
      margin: 10px 0;
    }
  }
  .el-card__body {
    height: 100%;
  }
  .bai-dw {
    background: #f5f7fa;
    color: #909399;
    display: inline-block;
    position: relative;
    left: 0;
    top: 2px;
    border: 1px solid #dcdfe6;
    border-left: 0;
    border-radius: 0 4px 4px 0;
    width: 50px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
  }
  .input-dw .el-input__inner {
    border-radius: 4px 0 0 4px;
  }
}
</style>
