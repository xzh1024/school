<template>
  <i-sys title="支付结果" nav-bg="bg-white">
    <view class="container">
      <image
        class="result-img"
        :src="
          payStatus === 1 ? PendingImg : payStatus === 2 ? SuccessImg : FailImg
        "
      />
      <view class="result"> 支付{{ statusDic[payStatus] }} </view>
    </view>
    <!-- <i-button width="478rpx" v-if="result">放入微信卡包</i-button> -->
    <i-card-button width="478rpx" @tap="back">返回</i-card-button>
  </i-sys>
</template>

<script setup lang="ts">
  import SuccessImg from "@/static/card/success@2x.png";
  import FailImg from "@/static/card/fail@2x.png";
  import PendingImg from "@/static/card/pending.png";
  import { ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";

  // 状态0：待使用;1：支付中;2:交易成功;3:交易失败;4:失效
  const statusDic = {
    1: "结果处理中",
    2: "成功",
    3: "失败"
  } as { [key: number]: string };

  const payStatus = ref(1);

  function back() {
    uni.reLaunch({
      url: "/pages/card/tabbar/home"
    });
  }

  onLoad((options: any) => {
    payStatus.value = +options.status;
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .container {
    margin-bottom: 40rpx;
    background-color: #fff;
  }

  .result {
    margin-top: 32rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #070a16;
    line-height: 52rpx;
    text-align: center;
  }

  .text {
    margin-top: 8rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #383840;
    line-height: 44rpx;
    text-align: center;
  }

  .result-img {
    display: block;
    width: 90rpx;
    height: 90rpx;
    margin: 40rpx auto 0;
  }
</style>
