<template>
  <div class="layout">
    <van-nav-bar title="维保中心" left-arrow @click-left="$router.go(-1)" />
    <div class="layout-main">
      <DpCard>
        <CompanyTemplate></CompanyTemplate>
      </DpCard>
      <DpCard>
        <div class="card-list">
          <div class="card-cell" @click="handleClick">
            <i class="icon-booking"></i>
            <div>在线预约</div>
          </div>
          <div class="card-cell" @click="$router.push({ path: '/home' })">
            <i class="icon-shop"></i>
            <div>进入商城</div>
          </div>
          <div class="card-cell">
            <i class="icon-vip-card"></i>
            <div>会员卡({{ mallData.memberCardServiceCount }})</div>
          </div>
          <div class="card-cell" @click="contact">
            <i class="icon-merchant"></i>
            <div>联系商家</div>
          </div>
        </div>
      </DpCard>
      <!-- <DpCard title="我的车辆（4）">
        <div slot="headerAfter" class="card-header-after">
          查看全部 <i class="iconfont icon-direction_right font-size-12"></i>
        </div>
        <div class="card-car">
          <img class="card-car-img" />
          <span class="card-car-number">川·A583U7</span>
        </div>
        <div class="card-list">
          <div class="card-cell">
            <div class="cell-title">下次保养</div>
            <div class="cell-line2">2020/12/30<br />或2000Km</div>
          </div>
          <div class="card-cell">
            <div class="cell-title">保险到期</div>
            <div class="cell-line2">2020/12/30</div>
          </div>
          <div class="card-cell">
            <div class="cell-title">下次年检</div>
            <div class="cell-line2">2020/12/30</div>
          </div>
          <div class="card-cell">
            <div class="cell-title">建议项目</div>
            <div class="cell-line2">共三项</div>
          </div>
        </div>
      </DpCard> -->
      <!-- <DpCard title="我的预约单（5）">
        <i
          class="iconfont icon-direction_right font-size-12 valign"
          slot="headerAfter"
        ></i>
      </DpCard> -->
      <DpCard
        :title="`在厂工单（${repairBillTotal}）`"
        @clickHead="goMaintenanceRecord"
      >
        <div slot="headerAfter" class="card-header-after">
          查看全部工单
          <i class="iconfont icon-direction_right font-size-12"></i>
        </div>
        <div class="record-list">
          <!-- <div class="record-item">
            <div class="record-row">
              <div class="record-vehicle">
                <span class="vehicle-info">【奥迪】川·A583U7</span>
                <van-tag type="success">保养</van-tag>
              </div>
              <div class="record-status">
                施工中
                <i class="iconfont icon-direction_right font-size-12"></i>
              </div>
            </div>
            <div class="m-t-8">
              <span class="font-size-12 color-assist">预计</span>&emsp;
              <span class="font-size-12">明天 17:57</span>&emsp;
              <span class="font-size-12 color-assist">完工</span>
            </div>
          </div>
          <div class="record-item">
            <div class="record-row">
              <div class="record-vehicle">
                <span class="vehicle-info">【奥迪】川·A583U7</span>
                <van-tag type="success">维修</van-tag>
              </div>
              <div class="record-status">
                接待中
                <i class="iconfont icon-direction_right font-size-12"></i>
              </div>
            </div>
            <div class="m-t-8">
              <span class="font-size-12 color-assist">预计</span>&emsp;
              <span class="font-size-12">--</span>&emsp;
              <span class="font-size-12 color-assist">完工</span>
            </div>
          </div> -->
          <div
            class="record-item"
            v-for="item in billList"
            :key="item.id"
            @click="
              $router.push({
                path: '/maintenanceDetail',
                query: { id: item.id }
              })
            "
          >
            <div class="record-row">
              <div class="record-vehicle">
                <span class="vehicle-info">
                  {{ `【${item.vehBrand}】${item.plateNumber}` }}
                </span>
                <van-tag type="success">
                  {{ item.businessCategoryName }}
                </van-tag>
              </div>
              <div class="record-status">
                {{ billStatusMap[item.status] }}
                <i class="iconfont icon-direction_right font-size-12"></i>
              </div>
            </div>
            <div class="m-t-8">
              <span class="font-size-12 color-assist">预计</span>&emsp;
              <span class="font-size-12">
                {{ formatDate(item.expectedDeliveryTime) }} </span
              >&emsp;
              <span class="font-size-12 color-assist">完工</span>
            </div>
          </div>
        </div>
      </DpCard>
      <DpCard
        :title="`诊断履历（${checkReportTotal}）`"
        @clickHead="goPastDiagnosis"
      >
        <i
          class="iconfont icon-direction_right font-size-12 valign"
          slot="headerAfter"
        ></i>
      </DpCard>
    </div>

    <ClientApplyDialog ref="clientApplyDialog"></ClientApplyDialog>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Tag, Button } from "vant";
Vue.use(NavBar)
  .use(Tag)
  .use(Button);
import DpCard from "@/components/DpCard/index.vue";
import ClientApplyDialog from "@/components/dialog/clientApplyDialog.vue";
import CompanyTemplate from "./components/companyTemplate.vue";
import { dateFormat, dateFormatFull } from "@/utils/format";
import { getForMall } from "@/api/common.js";
import request from "@/request";

export default {
  components: { DpCard, ClientApplyDialog, CompanyTemplate },
  data() {
    return {
      repairBillTotal: 0, // 在厂工单总数
      checkReportTotal: 0, // 诊断履历总数
      storeInfo: {}, // 用户的店铺信息
      billList: [],
      // 单据状态
      billStatusMap: {
        recepting: "接待中", // 接待中
        repairing: "施工中", // 施工中
        toFinancialConfirm: "待结算确认", // 待结算确认
        toFinancial: "待收款交车", // 待收款交车
        completed: "已完成" // 已完成
      },
      mallData: {},
      // clientType: 0,
      clientNotVisible: false,
      clientPendingVisible: false
    };
  },
  methods: {
    goOnlineBooking() {
      this.$router.push({ path: "/onlineBooking" });
    },
    handleClick() {
      this.$refs.clientApplyDialog.checkState(this.goOnlineBooking);
    },
    // 格式化时间
    formatDate(date) {
      if (!date) return "--";
      let text = dateFormatFull(date);
      const formatDate = dateFormat(date);
      const now = new Date().getTime();
      const today = dateFormat(now);
      const tomorrow = dateFormat(now + 24 * 3600 * 1000);
      if (formatDate === today) {
        text = `今天 ${text.slice(10)}`;
      } else if (formatDate === tomorrow) {
        text = `明天 ${text.slice(10)}`;
      }
      return text;
    },
    // 联系商家
    contact() {
      if (this.storeTel) {
        const link = document.createElement("a");
        link.href = "tel:" + this.storeTel;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    // 获取单据列表
    getRepairBillList() {
      const params = {
        types: ["repairBill"],
        statuses: [
          // 维修工单
          "recepting", // 接待中
          "repairing", // 施工中
          "toFinancialConfirm", // 待结算确认
          "toFinancial" // 待收款交车
          // "completed", // 已完成
        ],
        page: 1,
        pageSize: 2
      };
      request({
        url: "/repair-center/repair-bills",
        params
      }).then(res => {
        this.billList = res.rows || [];
        this.repairBillTotal = res.totalSize || 0;
      });
    },
    // 获取既往诊断履历列表
    getCheckReportList() {
      const params = {
        page: 1,
        pageSize: 10
      };
      request({
        url: "/repair-center/check-reports/list",
        params
      }).then(res => {
        this.checkReportTotal = res.totalSize || 0;
      });
    },
    getForMall() {
      getForMall().then(res => {
        this.mallData = res || {};
      });
    },
    goMaintenanceRecord() {
      this.$router.push({ path: "/maintenanceRecord" });
    },
    goPastDiagnosis() {
      this.$router.push({ path: "/pastDiagnosis" });
    }
  },
  created() {
    this.getForMall();
    // this.getStoreCheckClient();
    this.getRepairBillList();
    this.getCheckReportList();
  }
};
</script>

<style lang="less" scoped>
/deep/ .dialog-style {
  .van-dialog__content {
    padding: 16px;
    .store-phone {
      margin-top: 10px;
      text-align: center;
      color: #ff6e4c;
    }
  }
  .van-dialog__footer {
    .van-hairline--left {
      .van-button__content {
        .van-button__text {
          color: #ff6e4c;
        }
      }
    }
  }
}
.font-size-12 {
  font-size: 12px;
}
.color-assist {
  color: #999999;
}
.m-t-8 {
  margin-top: 8px;
}
.icon-12 {
  display: inline-block;
  width: 12px;
  height: 12px;
}
.icon-28 {
  display: inline-block;
  width: 28px;
  height: 28px;
}
.icon-booking {
  &:extend(.icon-28);
  background: url("~@/assets/icons/icon-booking.png") no-repeat;
  background-size: 100% 100%;
}
.icon-shop {
  &:extend(.icon-28);
  background: url("~@/assets/icons/icon-shop.png") no-repeat;
  background-size: 100% 100%;
}
.icon-vip-card {
  &:extend(.icon-28);
  background: url("~@/assets/icons/icon-vip-card.png") no-repeat;
  background-size: 100% 100%;
}
.icon-merchant {
  &:extend(.icon-28);
  background: url("~@/assets/icons/icon-merchant.png") no-repeat;
  background-size: 100% 100%;
}
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  text-align: left;
  /deep/ .van-nav-bar .van-icon {
    color: #333333;
  }
  .layout-main {
    flex: 1;
    overflow-y: auto;
    padding: 8px 12px;
    font-size: 14px;

    .dp-card {
      margin-bottom: 8px;
      .valign {
        align-self: center;
      }
      .card-header-after {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #999999;
        display: flex;
        align-items: center;
      }
      .card-car {
        margin-top: 8px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        .card-car-img {
          display: inline-block;
          width: 52px;
          height: 52px;
          margin-right: 12px;
        }
        .card-car-number {
          font-size: 15px;
          font-weight: 700;
          color: #ff6e4c;
        }
      }
      .card-list {
        // margin-top: 12px;
        display: flex;
        .card-cell {
          flex: 1;
          text-align: center;
          .cell-title {
            line-height: 18px;
            font-size: 13px;
            font-weight: 700;
          }
          .cell-number {
            font-size: 16px;
            font-weight: 700;
          }
          .cell-line2 {
            margin-top: 4px;
            height: 36px;
            line-height: 18px;
            font-size: 13px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
      .record-list {
        .record-item {
          padding: 12px;
          border-radius: 4px;
          background-color: #f4f4f4;
          margin-top: 8px;
          .record-row {
            display: flex;
            .record-vehicle {
              flex: 1;
              display: flex;
              align-items: center;
              .vehicle-info {
                font-size: 15px;
                font-weight: 700;
                color: #ff6e4c;
                margin-right: 12px;
              }
            }
            .record-status {
              height: 16px;
              line-height: 16px;
              font-size: 12px;
              color: #999999;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
