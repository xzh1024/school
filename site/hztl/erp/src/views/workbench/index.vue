<template>
  <div id="app">
    <div class="kanban">
      <div class="header">
        <div class="header-left">
          <div class="header-name">{{ companyName || "公司名称" }}</div>
          <div class="header-time">
            <span style="display:inline-block;width: 245px">
              {{ nowDateTime }}
            </span>
            {{ week }}
          </div>
        </div>
        <div class="header-right">
          <span style="font-size: 36px;margin-right: 20px">
            {{ type == "customer" ? "客户车辆施工看板" : "车间施工看板" }}
          </span>
          <img
            v-if="!envConfig.hideBoardLogo"
            class="logo"
            style="position: relative;top: 4px;"
            src="./logo2.png"
            height="28"
          />
          <span
            v-if="!envConfig.hideBoardLogo"
            style="font-size: 24px;padding-left:10px;"
            >云修管家</span
          >
        </div>
        <i class="setting el-icon-s-tools" @click="settingVisible = true"></i>
      </div>
      <div class="content" v-loading="loading">
        <div class="content-customer-th" v-if="type == 'customer'">
          <div>车牌号</div>
          <div>接车时间</div>
          <div>当前状态</div>
          <div>预计完工时间</div>
        </div>
        <div class="content-workshop-th" v-if="type == 'workshop'">
          <div style="width: 10%">车牌号</div>
          <div style="width: 25%">接车时间</div>
          <div style="width: 15%">接待顾问</div>
          <div style="width: 20%">施工项目</div>
          <div style="width: 10%">主修人</div>
          <div style="width: 10%">施工工位</div>
          <div style="width: 10%">当前状态</div>
        </div>
        <vueSeamlessScroll
          class="warp"
          :data="listData"
          :class-option="classOption"
          v-if="classOption.step != 0 && listScoll"
        >
          <ul class="customer-ul" ref="divBox" v-if="type == 'customer'">
            <li v-for="(item, index) in listData" :key="index">
              <div>{{ item.plateNumber }}</div>
              <div>{{ dateFormatToSecond(item.createdAt) }}</div>
              <div>{{ orderStatus[item.status] }}</div>
              <div>{{ dateFormatToSecond(item.expectedDeliveryTime) }}</div>
            </li>
          </ul>
          <ul class="workshop-ul" ref="divBox" v-if="type == 'workshop'">
            <li v-for="(item, index) in listData" :key="index">
              <div style="width: 10%;height:70px">
                {{ item.plateNumber }}
              </div>
              <div style="width: 25%;height:70px">
                {{ dateFormatToSecond(item.createdAt) }}
              </div>
              <div style="width: 15%;height:70px">
                {{ item.receptionManName }}
              </div>
              <div style="width: 20%;height:70px">
                {{ item.itemName }}
              </div>
              <div style="width: 10%;height:70px">
                {{ item.majorTechnicianName }}
              </div>
              <div style="width: 10%;height:70px">
                {{ item.stationName }}
              </div>
              <div style="width: 10%;height:70px">
                {{ itemStatus[item.status] }}
              </div>
            </li>
          </ul>
        </vueSeamlessScroll>
        <div
          class="warp"
          v-if="classOption.step == 0 || !listScoll"
          style="overflow-y:auto"
        >
          <ul class="customer-ul" ref="divBox" v-if="type == 'customer'">
            <li v-for="(item, index) in listData" :key="index">
              <div>{{ item.plateNumber }}</div>
              <div>{{ dateFormatToSecond(item.createdAt) }}</div>
              <div>{{ orderStatus[item.status] }}</div>
              <div>{{ dateFormatToSecond(item.expectedDeliveryTime) }}</div>
            </li>
          </ul>
          <ul class="workshop-ul" ref="divBox" v-if="type == 'workshop'">
            <li v-for="(item, index) in listData" :key="index">
              <div style="width: 10%;height:70px">{{ item.plateNumber }}</div>
              <div style="width: 25%;height:70px">
                {{ dateFormatToSecond(item.createdAt) }}
              </div>
              <div style="width: 15%;height:70px">
                {{ item.receptionManName }}
              </div>
              <div style="width: 20%;height:70px">{{ item.itemName }}</div>
              <div style="width: 10%;height:70px">
                {{ item.majorTechnicianName }}
              </div>
              <div style="width: 10%;height:70px">{{ item.stationName }}</div>
              <div style="width: 10%;height:70px">
                {{ itemStatus[item.status] }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <vueSeamlessScroll
          v-if="activity[0] != '' && classOption2.step != 0 && activityScoll"
          class="scoll"
          :data="activity"
          :class-option="classOption2"
        >
          <span ref="activityBox"> {{ activity[0] }} </span>
        </vueSeamlessScroll>
        <div v-if="classOption2.step == 0 || !activityScoll">
          <span ref="activityBox">{{ activity[0] }}</span>
        </div>
      </div>
    </div>
    <ht-dialog
      class="kanban-setting"
      :visible="settingVisible"
      title="看板设置"
      width="650px"
      v-on="$listeners"
      @close="settingVisible = false"
    >
      <div style="padding: 20px 50px">
        <el-form label-width="120px">
          <el-form-item label="车辆滚动速度">
            <span style="float:left">0%</span>
            <el-slider v-model="setting.vehicleRollSpeed"></el-slider>
            <span style="float:left">100%</span>
          </el-form-item>
          <el-form-item label="广告滚动速度">
            <span style="float:left">0%</span>
            <el-slider v-model="setting.adRollSpeed"></el-slider>
            <span style="float:left">100%</span>
          </el-form-item>
          <el-form-item label="广告内容">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="setting.adContent"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center;margin-top: 20px; ">
        <el-button
          :loading="loading"
          type="primary"
          size="mini"
          @click="submitSetting"
        >
          确定
        </el-button>
        <el-button
          :disabled="loading"
          type="primary"
          size="mini"
          plain
          @click="settingVisible = fasle"
        >
          取消
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>
<script>
import qs from "qs";
import vueSeamlessScroll from "vue-seamless-scroll";
import { dateFormatToSecond } from "@/utils/date";

import {
  customersKanban,
  workshopsKanban,
  getSettings,
  updateSettings
} from "@/api/workbench";

import { envConfig } from "envConfigPath";

export default {
  components: { vueSeamlessScroll },
  data() {
    return {
      envConfig,
      loading: false,
      settingVisible: false,
      companyName: "",
      nowDateTime: "",
      week: "",
      dateFormatToSecond,
      type: "customer", // customer 客户看板 workshop 车间看板
      listData: [],
      listScoll: false,
      orderStatus: {
        recepting: "接待中",
        repairing: "施工中",
        toFinancialConfirm: "待结算确认",
        toFinancial: "待收款交车",
        completed: "已完成"
      },
      itemStatus: {
        toDispatch: "待派工",
        toStart: "待开工",
        repairing: "施工中",
        reworking: "返工中",
        completed: "已完工",
        repairingNoOperate: "施工中"
      },
      setting: {
        vehicleRollSpeed: 0, // 车辆滚动速度
        adRollSpeed: 0, // 广告滚动速度
        adContent: "" // 广告内容
      },
      activity: [],
      activityScoll: false,
      classOption: {
        step: 0, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      },
      classOption2: {
        step: 0, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      },
      interval: null,
      interval2: null,
      oldDate: 0
    };
  },
  created() {
    const query = qs.parse(location.search.substring(1));
    this.type = query.type;
    this.companyName = query.companyName;
    this.getSetting();
    this.currentTime();
    this.getKanban();
    this.updata();
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    window.onresize = function() {
      _this.reset();
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
  },
  methods: {
    currentTime() {
      this.interval = setInterval(this.getTime, 500);
    },
    getTime() {
      const date = new Date();
      const yy = date.getFullYear();
      const mm =
        date.getMonth() < 9
          ? "0" + Number(date.getMonth() + 1)
          : date.getMonth() + 1;
      const dd =
        date.getDate() < 9
          ? "0" + Number(date.getDate() + 1)
          : date.getDate() + 1;
      const hh = date.getHours();
      const mf =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.nowDateTime =
        yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      // eslint-disable-next-line prettier/prettier
      const weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      this.week = weeks[date.getDay()];
    },
    updata() {
      this.interval2 = setInterval(() => {
        // 滚动区域高度
        const boxHeight = document.documentElement.clientHeight - 340;
        // 列表高度
        const contentHeight = this.$refs.divBox.offsetHeight;
        // 距离th的距离-为负数
        const top = this.$refs.divBox.getBoundingClientRect().top - 220;
        if (contentHeight + top < boxHeight) {
          // 最后一条出现在视野内
          const newDate = Date.now();
          const delay = 30000; // 30秒内只刷一次
          if (newDate - this.oldDate >= delay) {
            this.updataList();
          }
        }
      }, 5000);
    },
    updataList() {
      // const last = setTimeout(() => {
      //   this.oldDate = Date.now();
      //   this.listData = [];
      //   this.getKanban();
      //   clearTimeout(last);
      // }, 3000);
      this.oldDate = Date.now();
      this.getKanban();
    },
    getKanban() {
      this.loading = true;
      const params = {
        page: 1,
        pageSize: 1000
      };
      if (this.type == "customer") {
        customersKanban(params)
          .then(res => {
            this.loading = false;
            this.listData = res.rows;
            this.$nextTick(() => {
              this.reset();
            });
          })
          .catch(() => {
            this.loading = false;
          });
      }
      if (this.type == "workshop") {
        workshopsKanban(params)
          .then(res => {
            this.loading = false;
            this.listData = res.rows;
            this.$nextTick(() => {
              this.reset();
            });
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    getSetting() {
      // 客户看板 customerBulletinBoard
      // 车间看板 workshopBulletinBoard
      const params = {
        module: "repair"
      };
      // eslint-disable-next-line prettier/prettier
      params.type =
        this.type == "customer"
          ? "customerBulletinBoard"
          : "workshopBulletinBoard";
      getSettings(params).then(res => {
        this.setting.adContent = res.value.adContent;
        this.setting.vehicleRollSpeed = Number(res.value.vehicleRollSpeed); // 车辆滚动速度
        this.setting.adRollSpeed = Number(res.value.adRollSpeed); // 广告滚动速度
        // eslint-disable-next-line prettier/prettier
        this.classOption.step = Number(res.value.vehicleRollSpeed / 50).toFixed(
          2
        );
        this.classOption2.step = Number(res.value.adRollSpeed / 50).toFixed(2);
        this.activity = [res.value.adContent];
        this.$nextTick(() => {
          this.reset();
        });
      });
    },
    reset() {
      // 客户看板/车间看板交互：
      // 列表-数据不足一屏幕时 ->不滚动
      //     数据超过一屏幕时：
      //       滚动速度设置不为0  ->滚动
      //       滚动速度设置为0    ->不滚动 鼠标可滚动（隐藏滚动条）

      // 广告-宽度不足浏览器宽度 ->不滚动
      //     宽度超出浏览器宽度：
      //       滚动速度为0    ->不滚动（超出文字隐藏，用户可以直观的看到，主动的去设置广告滚动速度）
      //       滚动速度不为0  ->滚动
      // ----- 浏览器缩放 实时判断 -----
      // 滚动区域高度
      const boxHeight = document.documentElement.clientHeight - 340;
      // 列表高度
      const contentHeight = this.$refs.divBox.offsetHeight;
      console.log(boxHeight - contentHeight);
      if (boxHeight - contentHeight >= 0) {
        this.listScoll = false;
      } else {
        this.listScoll = true;
      }
      // 广告
      const activityWidth = this.$refs.activityBox.offsetWidth;
      const windowWidth = document.documentElement.clientWidth;
      if (windowWidth - activityWidth <= 120) {
        this.activityScoll = true;
      } else {
        this.activityScoll = false;
      }
    },
    submitSetting() {
      this.settingVisible = false;
      const data = {
        module: "repair"
      };
      // eslint-disable-next-line prettier/prettier
      data.type =
        this.type == "customer"
          ? "customerBulletinBoard"
          : "workshopBulletinBoard";
      data.value = this.setting;
      updateSettings(data).then(() => {
        this.$message.success("设置成功！");
        this.getSetting();
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/var";
#qimo_chatpup,
#chatBtn,
#qimo_showNewMsg,
#qimo_inviteBox,
#qimo_screenpop,
#qimo_videopup {
  display: none !important;
}

#app {
  height: 100%;
  .kanban {
    height: 100%;
    .header {
      height: 120px;
      padding: 10px 20px;
      overflow: hidden;
      background: rgba(0, 165, 255, 1);
      color: #ffffff;
      .header-left {
        float: left;
        .header-name {
          font-size: 34px;
        }
        .header-time {
          font-size: 24px;
        }
      }
      .header-right {
        float: right;
        padding: 30px 0 0;
      }
      .setting {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 30px;
      }
    }
    .content {
      width: 100%;
      height: calc(100% - 240px);
      background: rgba(51, 51, 51, 1);
      padding: 50px 6%;
      .content-customer-th {
        overflow: hidden;
        border-bottom: 3px solid #ffffff;
        div {
          float: left;
          width: 25%;
          height: 50px;
          line-height: 50px;
          font-size: 30px;
          color: #ffffff;
        }
      }
      .content-workshop-th {
        overflow: hidden;
        border-bottom: 3px solid #ffffff;
        div {
          float: left;
          height: 50px;
          line-height: 50px;
          font-size: 30px;
          color: #ffffff;
        }
      }
      .warp {
        width: 100%;
        height: calc(100% - 60px);
        margin-top: 10px;
        overflow: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
        .customer-ul {
          padding: 0;
          li {
            color: #ffff80;
            font-size: 26px;
            height: 70px;
            line-height: 70px;
            border-bottom: 2px dashed #999;
            div {
              float: left;
              width: 25%;
              height: 70px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .workshop-ul {
          padding: 0;
          li {
            color: #ffff80;
            font-size: 26px;
            height: 70px;
            line-height: 70px;
            border-bottom: 2px dashed #999;
            div {
              float: left;
              height: 70px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .el-loading-mask {
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
    .bottom {
      overflow: hidden;
      background: rgba(16, 95, 191, 1);
      height: 120px;
      line-height: 120px;
      padding: 0 50px;
      color: #ffffff;
      font-size: 32px;
      .scoll {
        overflow: hidden;
        width: 100%;
      }
    }
  }
  .kanban-setting {
    .el-slider {
      float: left;
      width: 300px;
      margin: 3px 20px;
    }
  }
}
</style>
