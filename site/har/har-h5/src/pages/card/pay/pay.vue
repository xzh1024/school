<template>
  <i-sys title="付款" class="pay-page" nav-bg="bg-green" nav-theme="light">
    <view class="container">
      <view class="pay-box">
        <card-no-vue :card-no="payNo" />
        <w-barcode class="barcode" :options="barCodeOptions" />
        <w-qrcode class="qrcode" :options="qrCodeOptions" />

        <view class="pay-refresh">
          ({{ second }})秒后自动刷新,或点击
          <view class="pay-refresh-btn" @tap="initPayCode">手动刷新</view>
        </view>

        <view class="card-info">
          <view>
            储值卡({{ memberCardCode.substring(memberCardCode.length - 4) }})
          </view>
          <view>&yen;{{ formatPrice(amount) }}</view>
        </view>
      </view>
    </view>

    <!-- <view class="pay-tips">每分钟自动刷新，请当面使用误泄漏</view> -->
    <!-- <view class="pay-tips" @tap="linkPath">
      交易明细
      <uni-icons type="right" size="14" color="#fff" />
    </view> -->
  </i-sys>
</template>

<script setup lang="ts">
  import { ref, computed, onUnmounted } from "vue";
  import CardNoVue from "./card-no.vue";
  import {
    svcAppletMemberCardPaymentPost,
    svcAppletMemberCardPaymentStatusGet
  } from "@/api/card";
  import { onLoad } from "@dcloudio/uni-app";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import { formatPrice } from "@/utils";

  const memberCardCode = ref("");
  const payNo = ref("");

  const amount = ref(0);

  const barCodeOptions = computed(() => {
    return {
      width: 638,
      height: 190,
      code: payNo.value
    };
  });

  const qrCodeOptions = computed(() => {
    return {
      code: payNo.value,
      size: 325
    };
  });

  // function linkPath() {
  //   uni.navigateTo({
  //     url: "/pages/card/notice/list"
  //   });
  // }

  const second = ref(60);
  let t: NodeJS.Timer;
  function initRefresh() {
    t = setInterval(() => {
      if (second.value > 0) {
        second.value--;
      } else {
        clearInterval(t);
        initPayCode();
      }
    }, 1000);
  }

  const [initPayCode] = useFuncProxy(async () => {
    if (t) {
      clearInterval(t);
    }
    uni.showLoading({ title: "加载中..." });
    const d = await svcAppletMemberCardPaymentPost({
      memberCardCode: memberCardCode.value
    });
    payNo.value = d.paymentNo;
    second.value = 60;
    amount.value = d.amount || 0;
    initRefresh();
    getPayCodeStatus();
    uni.hideLoading();
  });

  let statusT: NodeJS.Timer;
  const [getPayCodeStatus] = useFuncProxy(async () => {
    if (statusT) {
      clearTimeout(statusT);
    }
    const d = await svcAppletMemberCardPaymentStatusGet({
      paymentNo: payNo.value
    });

    // 状态0：待使用;1：支付中;2:交易成功;3:交易失败;4:失效
    if (d.status === 0 || d.status === 1) {
      statusT = setTimeout(() => {
        getPayCodeStatus();
      }, 1000);
    } else if (d.status === 4) {
      initPayCode();
    } else {
      if (t) {
        clearInterval(t);
      }

      if (statusT) {
        clearTimeout(statusT);
      }

      uni.redirectTo({ url: `/pages/card/pay/result?status=${d.status}` });
    }
  });

  onLoad((options: any) => {
    memberCardCode.value = options.memberCardCode;
    initPayCode();
  });

  onUnmounted(() => {
    if (t) {
      clearInterval(t);
    }

    if (statusT) {
      clearTimeout(statusT);
    }
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .pay-page {
    :deep(.i-page) {
      .i-page-body {
        background-color: #3d9a55;
      }
      .page-body {
        background-color: #3d9a55;
      }

      .i-page-head {
        border: none;
      }

      .i-navbar-box {
        &::after {
          border: none;
        }
      }
    }

    :deep(.i-navbar-box) {
      .center {
        color: #ffffff;
      }

      .uni-icons {
        color: #ffffff !important;
      }
    }
  }

  .pay-box {
    width: 100%;
    height: 944rpx;
    background: #ffffff;
    box-shadow: 0px 8rpx 16rpx 0px rgba(111, 111, 111, 0.08);
    border-radius: 16rpx;
    padding: 40rpx 24rpx;
    box-sizing: border-box;
  }

  .pay-tips {
    font-size: 28rpx;
    font-weight: 400;
    color: #ffffff;
    line-height: 44rpx;
    text-align: center;

    & + .pay-tips {
      margin-top: 8rpx;
    }
  }

  .card-info {
    margin-top: 40rpx;
    padding: 40rpx 0 0;
    border-top: 2rpx solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32rpx;
    font-weight: 500;
    color: #070a16;
    line-height: 48rpx;
  }

  .qrcode {
    width: 330rpx;
    height: 330rpx;
    margin: 40rpx auto 0;

    :deep(canvas) {
      margin: 40rpx auto 0;
    }
  }

  .barcode {
    width: 100%;
    height: 190rpx;
    margin-top: 40rpx;

    :deep(canvas) {
      margin-top: 40rpx;
    }
  }

  .pay-refresh {
    font-size: 28rpx;
    font-weight: 400;
    color: #606066;
    line-height: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40rpx;

    &-btn {
      color: #ff7200;
    }
  }
</style>
