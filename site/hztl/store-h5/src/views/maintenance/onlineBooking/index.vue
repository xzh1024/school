<template>
  <div class="layout">
    <van-nav-bar title="在线预约" left-arrow @click-left="$router.go(-1)" />
    <div class="layout-main">
      <DpCard>
        <CompanyTemplate isContact> </CompanyTemplate>
      </DpCard>
      <div class="cell-group">
        <van-cell center required>
          <template #icon>
            <span class="m-r-20 color-gray">选择车辆</span>
          </template>
          <template #title>
            <SearchMatched
              :keyword.sync="formData.licensePlate"
            ></SearchMatched>
          </template>
        </van-cell>
        <van-cell center required @click="businessTypeVisible = true">
          <template #icon>
            <!-- <i class="required-style"></i> -->
            <span class="m-r-20 color-gray">业务类型</span>
          </template>
          <template #title>
            {{ businessTypeName }}
          </template>
          <template #right-icon>
            <i class="iconfont icon-direction_right font-size-16"></i>
          </template>
        </van-cell>
        <van-cell center required @click="dateVisible = true">
          <template #icon>
            <span class="m-r-20 color-gray">预约日期</span>
          </template>
          <template #title>
            {{ formData.arrivalDate }}
          </template>
          <template #right-icon>
            <i class="iconfont icon-direction_right font-size-16"></i>
          </template>
        </van-cell>
        <van-cell
          center
          required
          v-if="isEnableTime"
          @click="timeVisible = true"
        >
          <template #icon>
            <span class="m-r-20 color-gray">预约时段</span>
          </template>
          <template #title>
            {{ formData.time }}
          </template>
          <template #right-icon>
            <i class="iconfont icon-direction_right font-size-16"></i>
          </template>
        </van-cell>
        <div class="textarea-wrap">
          <div class="textarea-label">问题描述</div>
          <van-field
            v-model="formData.remark"
            rows="2"
            autosize
            type="textarea"
            maxlength="200"
            placeholder="填写您爱车的问题或您对修理厂的备注，最多支持200个字"
            show-word-limit
          />
        </div>
        <van-cell center>
          <template #title>
            <span class="font-size-12 color-danger">
              <i class="required-style"></i>
              注意确认预约时间和业务类型，预约后请尽量准时到店哦！
            </span>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="layout-footer" @click="submit">
      <div class="layout-button">
        {{ reserveInformation }}
      </div>
    </div>
    <van-action-sheet v-model="businessTypeVisible">
      <van-picker
        show-toolbar
        title="业务类型"
        :columns="businessTypes"
        @confirm="businessTypeConfirm"
        @cancel="businessTypeCancel"
      >
        <template #option="item">
          {{ item.name }}
        </template>
      </van-picker>
    </van-action-sheet>
    <van-action-sheet v-model="dateVisible">
      <Calendar
        :value="formData.arrivalDate"
        :arrivalDate="arrivalDate"
        @change="dateChange"
      ></Calendar>
    </van-action-sheet>
    <van-action-sheet v-model="timeVisible">
      <van-picker
        show-toolbar
        title="预约时段"
        :columns="timeFrameOptions"
        @confirm="timeConfirm"
        @cancel="timeCancel"
      >
        <template #option="item">
          {{ item.id }}
          <span style="color: red;">(剩余名额{{ item.num }})</span>
        </template>
      </van-picker>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from "vue";
import {
  NavBar,
  Cell,
  Field,
  ActionSheet,
  Picker,
  DatetimePicker,
  Toast
} from "vant";
Vue.use(NavBar)
  .use(Cell)
  .use(Field)
  .use(ActionSheet)
  .use(Picker)
  .use(DatetimePicker)
  .use(Toast);
import DpCard from "@/components/DpCard/index.vue";
import CompanyTemplate from "../components/companyTemplate.vue";
import SearchMatched from "./searchMatched.vue";
import request from "@/request";
import Calendar from "./calendar.vue";
import { dateFormat } from "@/utils/format.js";

const DayMap = {
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
  0: "周日"
};

export default {
  components: { DpCard, CompanyTemplate, SearchMatched, Calendar },
  computed: {
    reserveInformation() {
      let name = "";
      const { arrivalDate, typeId } = this.formData;
      if (arrivalDate) {
        const day = new Date(this.formData.arrivalDate);
        name += `${day.getMonth() + 1}月${day.getDate()}日 ${
          DayMap[day.getDay()]
        } ${this.formData.time}  `;
      }
      if (typeId) {
        name += `${this.businessTypeName}丨`;
      }
      name += "提交预约";
      return name;
    },
    businessTypeName() {
      let businessTypeName = "";
      if (this.formData.typeId) {
        const businessType = this.businessTypes.find(
          item => item.id === this.formData.typeId
        );
        if (businessType) {
          businessTypeName = businessType.name;
        }
      }
      return businessTypeName;
    },
    timeFrameOptions() {
      const list = [];
      if (this.formData.arrivalDate) {
        const bookingData = this.bookingData;
        const days = Object.keys(bookingData);
        const findDay = days.find(item => item === this.formData.arrivalDate);
        if (findDay) {
          const timeSlot = bookingData[findDay].timeSlot || {};
          for (const key in timeSlot) {
            if (Object.hasOwnProperty.call(timeSlot, key)) {
              const item = timeSlot[key];
              list.push({
                id: key,
                num: item.all - item.pre
              });
            }
          }
        }
      }
      return list;
    }
  },
  data() {
    return {
      formData: {
        licensePlate: "",
        typeId: "",
        arrivalDate: dateFormat(new Date()),
        time: "",
        remark: ""
      },
      storeInfo: {},
      businessTypeVisible: false,
      businessTypes: [
        {
          id: 1,
          name: "维修"
        },
        {
          id: 2,
          name: "保养"
        },
        {
          id: 3,
          name: "美容"
        },
        {
          id: 4,
          name: "轮胎"
        }
      ],
      dateVisible: false,
      dateValue: "",
      timeVisible: false,
      calendarShow: true,
      defaultDate: "",
      bookingData: {},
      timeSlot: [],
      arrivalDate: [],
      isEnableTime: false
    };
  },
  created() {
    // this.dateValue = new Date();
    // this.dateChange();
    this.getBookingType();
    this.getErpDicts();
    this.getBookingBoard();
  },
  methods: {
    // 获取账号信息
    getStoreInfo() {
      request({
        url: "/stores/info"
      }).then(res => {
        this.storeInfo = res || {};
      });
    },
    // 是否需要显示时段
    getBookingType() {
      request({
        url: "/repair-center/booking/check-time"
      }).then(res => {
        if (res && res.enableTime) {
          this.isEnableTime = true;
        }
      });
    },
    // 字典数据列表
    getErpDicts() {
      request({
        url: "/erp-dicts",
        params: {
          type: "repairBusinessCategory"
        }
      }).then(res => {
        const list = res || [];
        this.businessTypes = list.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });
        // 默认选中第一个
        if (this.businessTypes.length) {
          this.formData.typeId = this.businessTypes[0].id;
        }
      });
    },
    // 预约看板数据
    getBookingBoard() {
      request({
        url: "/repair-center/booking/kanban"
      }).then(res => {
        if (res) {
          this.bookingData = res.data || {};
          this.timeSlot = res.timeSlot || [];
          this.arrivalDate = res.arrivalDate || [];
        }
      });
    },
    businessTypeConfirm(value) {
      if(!value) return;
      this.formData.typeId = value.id;
      this.businessTypeVisible = false;
    },
    businessTypeCancel() {
      this.businessTypeVisible = false;
    },
    // 预约日期
    dateCancel() {
      this.dateVisible = false;
    },
    dateChange(value) {
      if (this.formData.arrivalDate !== value) {
        this.formData.arrivalDate = value;
        this.formData.time = "";
      }
      this.dateVisible = false;
    },
    // 预约时段
    timeConfirm(value) {
      if (value.num) {
        this.formData.time = value.id;
        this.timeVisible = false;
      } else {
        Toast.fail("当前时段已没有预约名额!");
      }
    },
    timeCancel() {
      this.timeVisible = false;
    },
    submit() {
      const formData = this.formData;

      const { licensePlate, typeId, remark, arrivalDate, time } = this.formData;
      const vehicleLen = formData.licensePlate.length;
      if (!(vehicleLen >= 7 && vehicleLen <= 8)) {
        Toast.fail("请输入7位或8位的车牌号！");
        return;
      }
      if (!typeId) {
        Toast.fail("请选择业务类型！");
        return;
      }
      if (!arrivalDate) {
        Toast.fail("请选择预约日期！");
        return;
      }
      const params = {
        licensePlate, // 车牌号
        typeId, // 预约业务Id 维修 保养 美容 轮胎
        arrivalDate, // 预约到店日期
        remark, // 预约备注
        startTime: "00:00:00", // 预约到店结束时段
        endTime: "23:59:00" // 预约到店结束时段
      };
      if (this.isEnableTime && time) {
        const timeArr = time.split("-");
        params.startTime = timeArr[0];
        params.endTime = timeArr[1];
      }
      request({
        method: "post",
        url: "/repair-center/booking/create",
        data: params
      })
        .then(() => {
          Toast.success("预约成功！");
          this.$router.go(-1);
        })
        .catch(() => {
          Toast.fail("车辆档案信息错误，请联系商家！");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.van-field {
  flex-direction: column;
}
.font-size-12 {
  font-size: 12px;
}
.font-size-16 {
  font-size: 16px;
}
.color-danger {
  color: #ff6e4c;
}
.color-gray {
  color: #666666;
}
.m-r-20 {
  margin-right: 20px;
}
.required-style {
  &::before {
    content: "*";
    color: #ff6e4c;
  }
}
.icon-phone-right {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("~@/assets/icons/icon-phone-right.png") no-repeat;
  background-size: 100% 100%;
}
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  text-align: left;
  font-size: 14px;
  /deep/ .van-nav-bar .van-icon {
    color: #333333;
  }
  .layout-main {
    flex: 1;
    overflow-y: auto;
    padding: 8px 12px;
    .cell-group {
      margin-bottom: 8px;
      border-radius: 8px;
      overflow: hidden;
      background-color: #ffffff;
      .textarea-wrap {
        margin: 14px 16px;
        padding-bottom: 4px;
        border-bottom: 1px solid #e6e6e6;
        .textarea-label {
          color: #666666;
        }
        /deep/ .van-field {
          padding: 0;
          margin-top: 4px;
          .van-field__body {
            .van-field__control {
              line-height: 20px;
              font-size: 14px;
              &::placeholder {
                line-height: 20px;
                font-size: 14px;
                font-weight: 400;
                color: #999999;
              }
            }
          }
        }
      }
    }
    .dp-card {
      margin-bottom: 8px;
    }
  }
  .layout-footer {
    height: 50px;
    background: #ffffff;
    box-shadow: 0px -3px 16px -9px rgba(43, 43, 43, 0.2);
    box-sizing: border-box;
    padding: 7px 12px;
    .layout-button {
      width: 100%;
      height: 36px;
      background-image: linear-gradient(224deg, #ffb12d 0%, #ff6e4c 100%);
      border-radius: 18px;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
  }
}
</style>
