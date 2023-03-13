<template>
  <i-sys nav-placeholder title="支付结果" bg-color="bg-white">
    <view class="pay">
      <view class="pay-head">
        <view class="text-center">
          <image class="image" :src="payStatusDes.src"></image>
        </view>
        <view class="pay-status">{{ payStatusDes.title }}</view>
        <view v-if="info.payStatus === 2" class="pay-price"
          >￥{{ payPrice }}</view
        >
        <view v-if="payStatusDes.tips" class="pay-status-tip">{{
          payStatusDes.tips
        }}</view>
      </view>
      <view v-if="info.payStatus === 2" class="content">
        <view class="content-title"
          >您已支付成功,请到店铺使用二维码兑换商品</view
        >
        <view class="content-date">{{ info.payTime }}</view>
      </view>
      <view class="btn-group flex space-between align-center">
        <i-button
          type="primary"
          size="medium"
          no-border
          plan
          round
          :width="294"
          @click="iSee"
          >知道了</i-button
        >
        <i-button
          v-if="info.payStatus === 1"
          type="primary"
          size="medium"
          :width="294"
          round
          @click="resetPay"
          >重新支付</i-button
        >
        <i-button
          v-else
          type="primary"
          size="medium"
          :width="294"
          round
          @click="toPath"
          >订单详情</i-button
        >
      </view>
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "PayResult"
  };
</script>
<script setup>
  import IButton from "@/components/i-button/index.vue";
  import { onLoad, onShow, onHide, onUnload } from "@dcloudio/uni-app";
  import { ref, computed } from "vue";
  import {
    cbdApiAppletOrderPayGet,
    cbdApiAppletOrderPayResultGet
  } from "../../api";
  import { wxPay } from "../../utils";
  const sNo = ref();
  const payPrice = ref(0);
  const info = ref({});
  const timer = ref();
  const orderNo = ref();

  const doPayType = ref(1); //1微信支付 2单储值卡支付

  onLoad((e) => {
    const { serverNo, price, orderNo: no, payType } = e;
    sNo.value = serverNo;
    payPrice.value = price;
    orderNo.value = no;
    doPayType.value = Number(payType) || 1;
  });
  onShow(() => {
    if (doPayType.value === 1) {
      setTimeLoop();
    } else if (doPayType.value === 2) {
      info.value.payStatus = 2;
    }
  });
  onHide(() => {
    clearInterval(timer.value);
  });
  onUnload(() => {
    clearInterval(timer.value);
  });

  function setTimeLoop() {
    timer.value = setInterval(() => {
      getInfo();
    }, 1000);
  }

  async function getInfo() {
    try {
      const res = await cbdApiAppletOrderPayResultGet({
        orderNo: sNo.value
      });
      info.value = res;
      if ([2, 1].includes(res.payStatus)) clearInterval(timer.value);
    } catch (e) {
      clearInterval(timer.value);
      console.error(e);
    }
  }

  const payStatusDes = computed(() => {
    const { payStatus = 0 } = info.value;
    if (payStatus === 1)
      return {
        src: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/error.png",
        title: "您当前的订单支付失败",
        tips: "请重新支付"
      };
    if (payStatus === 2)
      return {
        src: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/success.png",
        title: "付款成功",
        tips: ""
      };
    return {
      src: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/loading.png",
      title: "支付结果确认中",
      tips: "请稍后..."
    };
  });

  function iSee() {
    uni.switchTab({
      url: "/pages/home/home"
    });
  }
  function toPath() {
    uni.redirectTo({
      url: `/pages/order/detail?orderNo=${orderNo.value}`
    });
  }
  async function resetPay() {
    try {
      const res = await cbdApiAppletOrderPayGet({
        orderNo: info.value.orderNo,
        type: 1
      });
      wxPay(
        res,
        () => {
          setTimeLoop();
        },
        () => {},
        false
      );
    } catch (e) {
      console.error(e);
    }
  }
</script>

<style scoped lang="scss">
  .pay {
    padding: 0 72rpx;
  }
  .pay-head {
    padding-top: 128rpx;
    .image {
      width: 154rpx;
      height: 154rpx;
    }
    .pay-status {
      font-size: 32rpx;
      color: #333;
      padding: 40rpx 0 16rpx;
      text-align: center;
      line-height: 40rpx;
    }
    .pay-price {
      text-align: center;
      font-size: 48rpx;
      color: #333;
      line-height: 64rpx;
      padding-bottom: 40rpx;
    }
    .pay-status-tip {
      font-size: 32rpx;
      color: #666666;
      line-height: 48rpx;
      padding-bottom: 64rpx;
      text-align: center;
    }
  }
  .content {
    padding: 40rpx 0 32rpx;
    border-bottom: 2rpx solid #eaeaea;
    border-top: 2rpx solid #eaeaea;
    .content-title {
      font-size: 28rpx;
      color: #333;
      line-height: 44rpx;
    }
    .content-date {
      font-size: 32rpx;
      color: #666666;
      padding-top: 8rpx;
    }
  }
  .btn-group {
    padding-top: 56rpx;
  }
</style>
