<template>
  <!-- 预约设置 -->
  <div class="container-box">
    <div class="appointment-seting" v-loading="loading">
      <div class="flex-container column-flex">
        <div
          class="flex-block-bg flex-block-padding btns"
          v-if="hasBelongsPerm('update')"
        >
          <el-button type="primary" size="small" @click="saveSeting">
            保存（F3）
          </el-button>
        </div>
        <div class="auto-block flex-block-bg flex-block-margin seting-box">
          <p style="color:#999;">
            可提前预约天数最大为30天
          </p>
          <el-form
            ref="form"
            label-position="left"
            :model="setingForm"
            label-width="130px"
          >
            <el-form-item label="可提前预约天数">
              <el-input-number
                class="setting-input-number"
                v-model="setingForm.preDay"
                :min="0"
                :max="30"
                :precision="0"
                :controls="false"
                size="small"
                placeholder="请输入可提前预约天数"
                style="width:175px;"
                :disabled="!hasBelongsPerm('update')"
              >
              </el-input-number>
              <span class="right-unit">天</span>
            </el-form-item>
            <el-form-item label="当日最大可预约数">
              <el-input-number
                class="setting-input-number"
                v-model="setingForm.dayMaxCount"
                :min="0"
                :precision="0"
                :controls="false"
                size="small"
                placeholder="请输入当日最大可预约数"
                style="width:230px"
                :disabled="!hasBelongsPerm('update')"
              >
              </el-input-number>
            </el-form-item>
            <div style="margin-bottom: 20px">
              <el-checkbox
                v-model="setingForm.enableTime"
                :disabled="!hasBelongsPerm('update')"
              >
                启用每日预约时段
              </el-checkbox>
              <el-tooltip placement="top">
                <div slot="content">
                  启用该功能后，每日可按时段进行预约，<br />
                  所有时段的可预约数总和不能大于当日最大可预约数
                </div>
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </div>
            <el-form-item label="每日预约时段设置" v-if="setingForm.enableTime">
              <div v-for="(list, ind) in setingForm.timeSets" :key="ind">
                <div style="display:inline-block;width:360px">
                  <el-time-picker
                    popper-class="time-box"
                    is-range
                    v-model="list.time"
                    size="small"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="HH:mm"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }"
                    placeholder="选择时间范围"
                    :disabled="!hasBelongsPerm('update')"
                  >
                  </el-time-picker>
                </div>
                <el-input-number
                  class="setting-input-number"
                  v-model="list.timeMaxCount"
                  :min="0"
                  :precision="0"
                  :controls="false"
                  size="small"
                  placeholder="请输入当前时段可预约数"
                  style="width:190px;margin: 0 10px"
                  :disabled="!hasBelongsPerm('update')"
                ></el-input-number>
                <i
                  class="icon-box el-icon-remove"
                  v-if="ind > 0 && hasBelongsPerm('update')"
                  @click="delTimeList(ind)"
                >
                </i>
                <i
                  v-if="hasBelongsPerm('update')"
                  class="icon-box el-icon-circle-plus"
                  @click="addTimeList(ind)"
                >
                </i>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBookingsSettings,
  updateBookingsSettings
} from "@/api/repairs/bookings";

export default {
  name: "appointment-seting",
  mixins: [],
  data() {
    return {
      loading: false,
      setingForm: {
        preDay: 0, // 提前预约天数
        dayMaxCount: 0, // 当日最大可预约数
        enableTime: false, // 启用每日预约时段
        timeSets: [] // 时段设置，启用有效
      }
    };
  },
  created() {
    this.getSetting();
  },
  activated() {
    this.getSetting();
  },
  computed: {
    hasSettingPerm() {
      return (
        this.hasAutoPerm("repairs.booking.our.setting.update") ||
        this.hasAutoPerm("repairs.booking.others.setting.update")
      );
    }
  },
  methods: {
    // 获取设置信息
    getSetting() {
      this.loading = true;
      const params = {
        module: "repair",
        type: "bookingSet"
      };
      getBookingsSettings(params)
        .then(res => {
          // 数据处理
          const times = res.value.timeSets || [];
          if (times.length == 0) {
            times.push({
              time: "",
              startTime: "",
              endTime: "",
              timeMaxCount: 0
            });
          } else {
            times.forEach(item => {
              const startTime = `2021-01-01 ${item.startTime}`;
              const endTime = `2021-01-01 ${item.endTime}`;
              item.time = [];
              item.time[0] = new Date(Date.parse(startTime.replace(/-/g, "/")));
              item.time[1] = new Date(Date.parse(endTime.replace(/-/g, "/")));
            });
          }
          this.$set(this.setingForm, "timeSets", times);
          this.$set(this.setingForm, "preDay", res.value.preDay);
          this.$set(this.setingForm, "dayMaxCount", res.value.dayMaxCount);
          this.$set(this.setingForm, "enableTime", res.value.enableTime);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 添加时段设置
    addTimeList(ind) {
      const json = {
        time: "",
        startTime: "",
        endTime: "",
        timeMaxCount: ""
      };
      this.setingForm.timeSets.splice(ind + 1, 0, json);
    },
    // 删除时段设置
    delTimeList(ind) {
      this.setingForm.timeSets.splice(ind, 1);
    },
    // 保存设置
    saveSeting() {
      if (!this.setingForm.preDay && this.setingForm.preDay != 0) {
        this.$message({
          message: "提前预约天数不能为空！",
          type: "error"
        });
        return false;
      }
      if (!this.setingForm.dayMaxCount && this.setingForm.dayMaxCount != 0) {
        this.$message({
          message: "当日最大可预约数不能为空！",
          type: "error"
        });
        return false;
      }
      // 打开时段设置
      if (this.setingForm.enableTime && this.setingForm.timeSets.length > 0) {
        let sum = 0;
        const timeArr = [];
        for (let i = 0; i < this.setingForm.timeSets.length; i++) {
          const item = this.setingForm.timeSets[i];
          if (!item.timeMaxCount && item.timeMaxCount != 0) {
            this.$message({
              message: "时段可预约数量不能为空！",
              type: "error"
            });
            return false;
          }
          if (!item.time) {
            this.$message({
              message: "预约时段不能为空！",
              type: "error"
            });
            return false;
          }
          if (item.time[0] && item.time[1]) {
            item.startTime = this.formatDateTime(item.time[0]);
            item.endTime = this.formatDateTime(item.time[1]);
            item.value =
              this.formatDateTime(item.time[0]).substr(0, 5) +
              "-" +
              this.formatDateTime(item.time[1]).substr(0, 5);
            if (!timeArr.includes(item.value)) {
              timeArr.push(item.value);
            } else {
              this.$message({
                message: item.value + " 时段重复!",
                type: "error"
              });
              return false;
            }
          }
          sum += item.timeMaxCount;
        }
        if (sum > this.setingForm.dayMaxCount) {
          this.$message({
            message: "所有时段可预约数总和不能大于当日最大可预约数!",
            type: "error"
          });
          return false;
        }
      } else {
        this.setingForm.timeSets = [];
      }
      const data = {
        module: "repair",
        type: "bookingSet",
        value: this.setingForm
      };
      updateBookingsSettings(data).then(() => {
        this.$message({
          message: "设置成功！",
          type: "success"
        });
        this.getSetting();
      });
    },
    // 标准时间转换成想要的时间字符串（这里只需要时分）
    formatDateTime(date) {
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      return h + ":" + minute + ":00";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.appointment-seting {
  min-width: 820px;
  height: 100%;
  .seting-box {
    padding: 10px 20px;
    overflow-y: auto;
    .el-checkbox {
      margin-right: 10px;
    }
    .el-icon-warning {
      position: relative;
      top: 3px;
      color: #e6a23c;
      font-size: 22px;
    }
    .icon-box {
      position: relative;
      top: 4px;
      font-size: 22px;
      margin-right: 5px;
      cursor: pointer;
    }
    .el-icon-remove {
      color: #999;
    }
    .el-icon-circle-plus {
      color: $color-primary;
      @include font_color("color-primary");
    }
    .right-unit {
      display: inline-block;
      position: relative;
      top: 1px;
      left: -5px;
      width: 60px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #909399;
      background: #f5f7fa;
      border: 1px solid #dcdfe6;
      border-radius: 0 3px 3px 0;
    }
  }
}
</style>
<style lang="scss">
.time-box {
  .el-time-spinner__list::after,
  .el-time-spinner__list::before {
    height: 75px !important;
  }
}
.setting-input-number .el-input__inner {
  text-align: left !important;
}
</style>
