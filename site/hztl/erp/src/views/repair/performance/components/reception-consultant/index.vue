<template>
  <!-- 维修人员绩效设置-接待顾问 -->
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
            <div class="setting-tit" style="width: 1080px">
              业务提成比例设置
              <span style="margin-left:107px">统一设置提成基数</span>
              <label style="margin-left:20px">
                <el-radio v-model="allRadio" name="all" label="settleAmount">
                  结算金额
                </el-radio>
                <el-radio v-model="allRadio" name="all" label="grossProfit">
                  毛利
                </el-radio>
              </label>
              <span style="margin-left:114px">
                统一设置提成比例
                <el-input-number
                  placeholder="请输入比例"
                  class="input-dw"
                  size="mini"
                  :precision="2"
                  :step="1"
                  :max="100"
                  :controls="false"
                  style="width: 105px"
                  v-model="allRate"
                >
                </el-input-number>
                <span class="bai-dw">%</span>
              </span>
            </div>
            <table cellspacing="0" class="setting-table" style="width: 1080px">
              <tr>
                <th width="60">序号</th>
                <th width="150">业务单据</th>
                <th width="420">提成基数</th>
                <th width="450">提成比例</th>
              </tr>
              <tr>
                <td>1</td>
                <td>维修工单</td>
                <td>
                  <el-radio
                    v-model="unified.repair.base"
                    label="settleAmount"
                    style="margin-left: 80px"
                  >
                    结算金额
                  </el-radio>
                  <el-radio v-model="unified.repair.base" label="grossProfit">
                    毛利
                  </el-radio>
                </td>
                <td>
                  <el-input-number
                    placeholder="请输入比例"
                    class="input-dw"
                    size="mini"
                    :precision="2"
                    :step="1"
                    :max="100"
                    :controls="false"
                    style="width: 105px"
                    v-model="unified.repair.rate"
                  >
                  </el-input-number>
                  <span class="bai-dw">%</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>保险理赔申请单</td>
                <td>
                  <el-radio
                    v-model="unified.insurance.base"
                    label="settleAmount"
                    style="margin-left: 80px"
                  >
                    结算金额
                  </el-radio>
                  <el-radio
                    v-model="unified.insurance.base"
                    label="grossProfit"
                  >
                    毛利
                  </el-radio>
                </td>
                <td>
                  <el-input-number
                    class="input-dw"
                    placeholder="请输入比例"
                    size="mini"
                    :precision="2"
                    :step="1"
                    :max="100"
                    :controls="false"
                    style="width: 105px"
                    v-model="unified.insurance.rate"
                  >
                  </el-input-number>
                  <span class="bai-dw">%</span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>洗车单</td>
                <td>
                  <el-radio
                    v-model="unified.washing.base"
                    label="settleAmount"
                    style="margin-left: 80px"
                  >
                    结算金额
                  </el-radio>
                  <span style="display:inline-block;width: 70px"></span>
                </td>
                <td>
                  <el-input-number
                    placeholder="请输入比例"
                    class="input-dw"
                    size="mini"
                    :precision="2"
                    :step="1"
                    :max="100"
                    :controls="false"
                    style="width: 105px"
                    v-model="unified.washing.rate"
                  >
                  </el-input-number>
                  <span class="bai-dw">%</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="two">
        <span slot="label">
          阶梯提成（{{ open == "ladder" ? "启用" : "未启用" }}）
        </span>
        <div class="setting-box setting-box2">
          <div class="setting-btns" v-if="hasBelongsPerm('edit')">
            <el-button
              type="primary"
              size="small"
              style="margin-left: 10px"
              @click="ladderSava"
            >
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
          <div v-loading="loading" style="height: calc(100% - 50px)">
            <el-row :gutter="10" style="height:100%">
              <el-col :span="6" style="height:100%">
                <ht-card title="业务单据" no-padding style="height:100%">
                  <ul class="company-info-list">
                    <li
                      v-for="(item, index) in list"
                      :key="index"
                      @click="activeLadderType(item)"
                    >
                      <div
                        :class="{ 'is-active': item.id === activeLadderId }"
                        class="item-box"
                      >
                        <div class="company-name ellipsis-text">
                          {{ item.name }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </ht-card>
              </el-col>
              <el-col :span="18" style="height:100%">
                <ht-card title="阶梯提成设置" style="height:100%">
                  <!-- 维修工单阶梯 -->
                  <div class="ladder-box" v-show="activeLadderId == 1">
                    <p>
                      提成基数：
                      <el-radio
                        v-model="ladder.repair.base"
                        label="settleAmount"
                      >
                        结算金额
                      </el-radio>
                      <el-radio
                        v-model="ladder.repair.base"
                        label="grossProfit"
                      >
                        毛利
                      </el-radio>
                    </p>
                    <div class="ladder-list">
                      <div
                        class="ladder-p"
                        v-for="(item, ind) in ladder.repair.ladders"
                        :key="ind"
                      >
                        <el-input-number
                          size="mini"
                          :precision="2"
                          v-model="item.start"
                          :controls="false"
                          @change="moneyChange"
                        >
                        </el-input-number>
                        <span class="txt">
                          ≤
                          <span class="txt2">
                            {{ ladder.repair.base == "none" ? "基数" : "" }}
                            {{
                              ladder.repair.base == "settleAmount"
                                ? "结算金额"
                                : ""
                            }}
                            {{
                              ladder.repair.base == "grossProfit" ? "毛利" : ""
                            }}
                          </span>
                          ＜
                        </span>
                        <el-input
                          :disabled="true"
                          size="mini"
                          v-model="item.end"
                          :precision="2"
                          style="width:130px"
                        ></el-input>
                        <span class="txt">提成</span>
                        <el-input-number
                          placeholder="请输入比例"
                          class="input-dw"
                          size="mini"
                          :precision="2"
                          :step="1"
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
                        @click="addLadder"
                      >
                        +添加提成阶梯
                      </el-button>
                    </div>
                  </div>
                  <!-- 保险理赔阶梯 -->
                  <div class="ladder-box" v-show="activeLadderId == 2">
                    <p>
                      提成基数：
                      <el-radio
                        v-model="ladder.insurance.base"
                        label="settleAmount"
                      >
                        结算金额
                      </el-radio>
                      <el-radio
                        v-model="ladder.insurance.base"
                        label="grossProfit"
                      >
                        毛利
                      </el-radio>
                    </p>
                    <div class="ladder-list">
                      <div
                        class="ladder-p"
                        v-for="(item, ind) in ladder.insurance.ladders"
                        :key="ind"
                      >
                        <el-input-number
                          size="mini"
                          :precision="2"
                          v-model="item.start"
                          :controls="false"
                          @change="moneyChange"
                        >
                        </el-input-number>
                        <span class="txt">
                          ≤
                          <span class="txt2">
                            {{ ladder.insurance.base == "none" ? "基数" : "" }}
                            {{
                              ladder.insurance.base == "settleAmount"
                                ? "结算金额"
                                : ""
                            }}
                            {{
                              ladder.insurance.base == "grossProfit"
                                ? "毛利"
                                : ""
                            }}
                          </span>
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
                        @click="addLadder"
                      >
                        +添加提成阶梯
                      </el-button>
                    </div>
                  </div>
                  <!-- 洗车单 -->
                  <div class="ladder-box" v-show="activeLadderId == 3">
                    <p>
                      提成基数：
                      <el-radio
                        v-model="ladder.washing.base"
                        label="settleAmount"
                      >
                        结算金额
                      </el-radio>
                    </p>
                    <div class="ladder-list">
                      <div
                        class="ladder-p"
                        v-for="(item, ind) in ladder.washing.ladders"
                        :key="ind"
                      >
                        <el-input-number
                          size="mini"
                          :precision="2"
                          v-model="item.start"
                          :controls="false"
                          @change="moneyChange"
                        >
                        </el-input-number>
                        <span class="txt">
                          ≤
                          <span class="txt2">
                            {{ ladder.washing.base == "none" ? "基数" : "" }}
                            {{
                              ladder.washing.base == "settleAmount"
                                ? "结算金额"
                                : ""
                            }}
                          </span>
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
                        @click="addLadder"
                      >
                        +添加提成阶梯
                      </el-button>
                    </div>
                  </div>
                </ht-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getSettings, updateSettings } from "@/api/basis/performance/index"; // updateSettings
export default {
  name: "reception-consultant",
  data() {
    return {
      loading: false,
      activeName: "one",
      open: "", // 提成方式
      allRadio: "", // 统一设置
      allRate: "", // 统一比例
      unified: {
        insurance: {
          base: "none",
          rate: ""
        },
        repair: {
          base: "none",
          rate: ""
        },
        washing: {
          base: "none",
          rate: ""
        }
      }, // 统一绩效
      list: [
        {
          id: 1,
          name: "维修工单"
        },
        {
          id: 2,
          name: "保险理赔申请单"
        },
        {
          id: 3,
          name: "洗车单"
        }
      ],
      activeLadderId: 1, // 当前业务类型
      ladder: {
        insurance: {
          base: "none",
          ladders: []
        },
        repair: {
          base: "none",
          ladders: []
        },
        washing: {
          base: "none",
          ladders: []
        }
      } // 阶梯绩效设置
    };
  },
  created() {
    this.getSetting();
  },
  watch: {
    allRadio(val) {
      if (val == "settleAmount") {
        this.unified.insurance.base = "settleAmount";
        this.unified.repair.base = "settleAmount";
        this.unified.washing.base = "settleAmount";
      } else {
        this.unified.insurance.base = "grossProfit";
        this.unified.repair.base = "grossProfit";
        // this.unified.washing.base = "none";
      }
    },
    allRate(val) {
      if (val == "") {
        this.unified.insurance.rate = "";
        this.unified.repair.rate = "";
        this.unified.washing.rate = "";
      }
      if (parseFloat(val) >= 0) {
        this.unified.insurance.rate = parseFloat(val).toFixed(2);
        this.unified.repair.rate = parseFloat(val).toFixed(2);
        this.unified.washing.rate = parseFloat(val).toFixed(2);
      }
    }
  },
  methods: {
    getSetting() {
      this.loading = true;
      const params1 = {
        module: "repair", // 模块
        type: "receptionAchievementEnableType" // 类型-接待顾问绩效启用类型
      };
      getSettings(params1).then(res => {
        this.open = res.value;
        // console.log("启用类型::::::", this.open);
      });
      const params2 = {
        module: "repair", // 模块
        type: "receptionUnifiedAchievement" // 类型-接待顾问统一绩效设置
      };
      getSettings(params2).then(res => {
        res.value.insurance.rate =
          res.value.insurance.rate > 0
            ? res.value.insurance.rate * 100
            : res.value.insurance.rate;
        res.value.repair.rate =
          res.value.repair.rate > 0
            ? res.value.repair.rate * 100
            : res.value.repair.rate;
        res.value.washing.rate =
          res.value.washing.rate > 0
            ? res.value.washing.rate * 100
            : res.value.washing.rate;
        this.unified = res.value;
        this.loading = false;
        // console.log("统一::::::", this.unified);
      });
      const params3 = {
        module: "repair", // 模块
        type: "receptionLadderAchievement" // 类型-接待顾问阶梯绩效设置
      };
      getSettings(params3).then(res => {
        res.value.repair.ladders.forEach(item => {
          item.rate = item.rate > 0 ? item.rate * 100 : "";
        });
        res.value.insurance.ladders.forEach(item => {
          item.rate = item.rate > 0 ? item.rate * 100 : "";
        });
        res.value.washing.ladders.forEach(item => {
          item.rate = item.rate > 0 ? item.rate * 100 : "";
        });
        this.ladder = res.value;
        this.moneyChange();
        // console.log("阶梯::::::", this.ladder);
      });
    },
    // 统一提成保存
    unifiedSava() {
      const data = JSON.parse(JSON.stringify(this.unified));
      if (this.open == "unified") {
        if (!data.repair.rate) {
          this.$message({
            message: "维修工单提成比例必填！",
            type: "error"
          });
          return false;
        }
        if (!data.insurance.rate) {
          this.$message({
            message: "保险理赔申请单提成比例必填！",
            type: "error"
          });
          return false;
        }
        if (!data.washing.rate) {
          this.$message({
            message: "洗车单提成比例必填！",
            type: "error"
          });
          return false;
        }
      }
      data.insurance.rate =
        parseFloat(data.insurance.rate) > 0
          ? parseFloat(data.insurance.rate / 100).toFixed(4)
          : null;
      data.repair.rate =
        parseFloat(data.repair.rate) > 0
          ? parseFloat(data.repair.rate / 100).toFixed(4)
          : null;
      data.washing.rate =
        parseFloat(data.washing.rate) > 0
          ? parseFloat(data.washing.rate / 100).toFixed(4)
          : null;
      const datas = {
        module: "repair",
        type: "receptionUnifiedAchievement",
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
        type: "receptionAchievementEnableType",
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
        type: "receptionAchievementEnableType",
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
    // 选中阶梯类型
    activeLadderType(item) {
      this.activeLadderId = item.id;
      this.moneyChange();
    },
    // 添加阶梯
    addLadder() {
      // 添加维修工单阶梯
      if (this.activeLadderId == 1) {
        this.ladder.repair.ladders.push({
          rate: "",
          start: "",
          end: ""
        });
      }
      if (this.activeLadderId == 2) {
        this.ladder.insurance.ladders.push({
          rate: "",
          start: "",
          end: ""
        });
      }
      if (this.activeLadderId == 3) {
        this.ladder.washing.ladders.push({
          rate: "",
          start: "",
          end: ""
        });
      }
      this.moneyChange();
    },
    // 删除阶梯
    removeLadder(i) {
      // 删除维修工单阶梯
      if (this.activeLadderId == 1) {
        this.ladder.repair.ladders.splice(i, 1);
        console.log(this.ladder.repair.ladders);
      }
      if (this.activeLadderId == 2) {
        this.ladder.insurance.ladders.splice(i, 1);
      }
      if (this.activeLadderId == 3) {
        this.ladder.washing.ladders.splice(i, 1);
      }
      this.moneyChange();
    },
    // 金额变化
    moneyChange() {
      // 维修工单阶梯变化
      let arr = [];
      if (this.activeLadderId == 1) {
        arr = this.ladder.repair.ladders;
      }
      if (this.activeLadderId == 2) {
        arr = this.ladder.insurance.ladders;
      }
      if (this.activeLadderId == 3) {
        arr = this.ladder.washing.ladders;
      }
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
      ladders.repair.ladders.forEach(item => {
        item.end = item.end == "无穷大" ? null : item.end;
        item.rate = parseFloat(item.rate / 100).toFixed(4);
      });
      ladders.insurance.ladders.forEach(item => {
        item.end = item.end == "无穷大" ? null : item.end;
        item.rate = parseFloat(item.rate / 100).toFixed(4);
      });
      ladders.washing.ladders.forEach(item => {
        item.end = item.end == "无穷大" ? null : item.end;
        item.rate = parseFloat(item.rate / 100).toFixed(4);
      });
      const data = {
        module: "repair",
        type: "receptionLadderAchievement",
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
      this.allRadio = "";
      this.allRate = "";
      this.activeLadderId = 1;
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
.setting-tit {
  position: relative;
  padding: 5px 10px 5px 15px;
  background: #f5f7fa;
  border: 1px solid #e8eaef;
  border-width: 1px 1px 0 1px;
  &::before {
    position: absolute;
    left: 5px;
    top: 12px;
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
.item-box.is-active {
  position: relative;
  color: $color-primary;
  @include font_color("color-primary");
  background-color: #3aa7ff26;
  @include background_color("color-primary", 0.16);
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: $color-primary;
    @include background_color("color-primary");
  }
}
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
::v-deep {
  .el-tabs__header {
    margin-bottom: 0 !important;
  }
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
  .setting-box2 {
    overflow: hidden;
    padding: 0;
    background: #e7ebed;
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
  .company-info-list {
    margin: 0;
    padding: 0;
    color: #778087;
    font-size: 14px;
    height: calc(100% - 10px);
    overflow: auto;
    li {
      position: relative;
      margin: 0;
      padding: 0;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #e8eaef;
      }

      .item-box {
        margin: 0;
        width: 100%;
        padding: 12px 10px;
        cursor: pointer;

        .company-name {
          text-align: left;
          max-width: 100%;
        }
      }
    }
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
  .box-card .title {
    &::before {
      top: 3px;
    }
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
