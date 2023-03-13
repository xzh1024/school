<template>
  <i-sys
    :title="cardType === 2 ? '次卡' : '限期卡'"
    :nav-placeholder="true"
    nav-bg="bg-white"
  >
    <view class="page">
      <div class="page-head" :style="{ top: testHeight }">
        <view class="code-container">
          <div class="code-img">
            <w-qrcode
              :options="{
                code: code,
                size: 330
              }"
            />
          </div>
          <div class="code-text">{{ code }}</div>
        </view>
        <view class="tab-box">
          <i-tabs
            v-model="active"
            style="width: 100%"
            :data="tabArr"
            flex
            @change="onTabChange"
          ></i-tabs>
        </view>
      </div>

      <view>
        <view v-if="active === 0" class="cell-list">
          <i-cell
            label="项目名称"
            :value="info.projectName"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            label="店铺名称"
            :value="info.storeName"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            label="卡名称"
            :value="info.cardName"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            label="产品介绍"
            :value="info.productDescription"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            v-if="cardType === 1"
            label="卡时长"
            :value="info.cardDuration"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            v-if="cardType === 1"
            label="剩余时长"
            :value="info.usefulDays"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            v-if="cardType === 2"
            label="次数"
            :value="info.totalDegree"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            v-if="cardType === 2"
            label="剩余次数"
            :value="info.surplusTimes"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            label="购卡日期"
            :value="info.purchaseTime"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            v-if="cardType === 1"
            label="激活日期"
            :value="info.activeTime"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            v-if="cardType === 2"
            label="有效期"
            :value="info.expirationTime"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
          <i-cell
            label="使用场馆"
            :value="info.supportStadium"
            :value-color="valueColor"
            no-bottom
            right-icon
            @click="venueVisible = true"
          ></i-cell>
          <!-- <i-cell
            label="使用时段"
            :value="info.admissionTime"
            :value-color="valueColor"
            no-bottom
            right-icon
            @click="admissionPeriodVisible = true"
          ></i-cell> -->
          <i-cell
            v-if="info.admission === 1"
            label="使用时段"
            value="全时段"
            value-color="#333333"
            no-bottom
          ></i-cell>
          <i-cell
            v-if="info.admission === 2"
            label="使用时段"
            value="特定时段"
            value-color="#333333"
            no-bottom
            right-icon
            @click="admissionTimesVisible = true"
          ></i-cell>
          <i-cell
            label="卡说明"
            :value="info.cardContent"
            :value-color="valueColor"
            no-bottom
          ></i-cell>
        </view>
        <z-paging
          v-if="active === 1"
          ref="paging"
          v-model="recordList"
          inside-more
          @query="getRecordList"
        >
          <template #top>
            <calc-top />
            <view v-if="cardType === 1" class="tab-height">
              <view class="tab-height-left">
                合计次数： {{ recordCount }}次
              </view>
            </view>
            <view v-else class="tab-height">
              <view class="tab-height-left">
                次数： {{ info.totalDegree }}次
              </view>
              <view class="tab-height-right">
                已使用： {{ NP.minus(info.totalDegree, info.surplusTimes) }}次
              </view>
            </view>
          </template>
          <view class="record-list">
            <RecordItem
              v-for="(item, index) in recordList"
              :key="index"
              :item="item"
            ></RecordItem>
          </view>
        </z-paging>
      </view>
    </view>

    <i-dialog
      v-if="venueVisible"
      title="使用场馆"
      :content="info.supportStadium"
      :show-cancel="false"
      @dialog-confirm="hideVenue"
    ></i-dialog>
    <i-dialog
      v-if="admissionTimesVisible"
      title="特定使用时段"
      :show-cancel="false"
      :content-height="300"
      @dialog-confirm="hideAdmissionTimes"
    >
      <view style="width: 100%">
        <view
          v-for="(item, index) in info.admissionTime"
          :key="index"
          class="admission-time"
        >
          {{ item }}
        </view>
      </view>
    </i-dialog>
  </i-sys>
</template>

<script setup>
  import { onLoad, onUnload } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import {
    groundMpApiMemberCardHoldCardHoldInfoGet,
    groundMpApiMemberCardHoldFlushCardNoGet,
    groundMpApiCardVerificationRecordListByOrderIdGet,
    groundMpApiCardVerificationRecordCountVerificationSuccessGet
  } from "@/api/ground-mp-api";
  import ICell from "../../../components/i-cell";
  import ITabs from "@/components/i-tabs";
  import RecordItem from "./record-item";
  import NP from "number-precision";

  const id = ref(0);
  const valueColor = ref("#333333");
  const codeFlag = ref(false);
  const code = ref("");
  const cardType = ref(1); // 卡类型，1:期限卡 2:次卡
  const venueVisible = ref(false);
  const admissionTimesVisible = ref(false);
  const testHeight = ref(0);
  onLoad((option) => {
    const { statusBarHeight } = uni.getSystemInfoSync();
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    testHeight.value =
      (top - statusBarHeight) * 2 + height + statusBarHeight + "px";

    cardType.value = Number(option.cardType);
    id.value = option.id;
    getInfo();
    codeFlag.value = true;
    getCode();
  });

  onUnload(() => {
    codeFlag.value = false;
  });

  const tabArr = [
    {
      label: "基础信息",
      value: 0
    },
    {
      label: "消费信息",
      value: 1
    }
  ];

  const active = ref(0);

  const info = ref({});
  async function getInfo() {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const res = await groundMpApiMemberCardHoldCardHoldInfoGet({
        cardHoldId: id.value
      });
      info.value = res;
    } catch (e) {
      console.error(e);
      info.value = {};
    } finally {
      uni.hideLoading();
    }
  }

  // 获取加密卡号
  async function getCode() {
    try {
      const res = await groundMpApiMemberCardHoldFlushCardNoGet({
        cardHoldId: id.value
      });
      code.value = res;
    } catch (e) {
      console.error(e);
      code.value = "";
    } finally {
      // 每一分钟更新一次
      if (codeFlag.value) {
        setTimeout(() => {
          getCode();
        }, 60000);
      }
    }
  }

  const recordCount = ref(0);
  async function getRecordCount() {
    try {
      const res =
        await groundMpApiCardVerificationRecordCountVerificationSuccessGet({
          cardHoldId: id.value
        });
      recordCount.value = res;
    } catch (e) {
      console.error(e);
      recordCount.value = 0;
    }
  }

  const hideVenue = () => {
    venueVisible.value = false;
  };
  const hideAdmissionTimes = () => {
    admissionTimesVisible.value = false;
  };

  const paging = ref(null);
  const recordList = ref([]);
  const getRecordList = async (pageNo, pageSize) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await groundMpApiCardVerificationRecordListByOrderIdGet({
        cardHoldId: id.value,
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  };

  const onTabChange = (data) => {
    if (data.value === 1) {
      getRecordCount();
    }
  };
</script>

<style scoped lang="scss">
  .tab-height {
    height: 686rpx;
    box-sizing: border-box;
    padding: 584rpx 32rpx 0;
    font-weight: 500;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    .tab-height-left {
      flex: 1;
    }
  }
  .page {
    height: 100vh;
    .page-head {
      position: fixed;
      left: 0;
      z-index: 999;
      width: 100%;
      background-color: #f7f8fa;
      .code-container {
        padding: 32rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        .code-img {
          width: 330rpx;
          height: 330rpx;
        }
        .code-text {
          margin-top: 32rpx;
          line-height: 52rpx;
          font-size: 36rpx;
          font-weight: 500;
          color: #070a16;
        }
      }
      .tab-box {
        box-sizing: border-box;
        width: 100%;
        padding: 0 32rpx;
        margin-top: 32rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ffffff;
        border-bottom: 1px solid #e6e6e6;
      }
    }
    .cell-list {
      padding: 584rpx 32rpx 32rpx;
      background-color: #ffffff;
      ::v-deep .item {
        padding-bottom: 0;
      }
    }
    .record-list {
      padding: 0 32rpx;
      background-color: #ffffff;
    }
  }
</style>
