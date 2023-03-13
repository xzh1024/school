<template>
  <i-sys title="购卡结果" nav-bg="bg-white">
    <view class="container">
      <card-cell :info="cardInfo" />
      <image
        class="result-img"
        :src="
          cardInfo.tradeStatus === 1
            ? PendingImg
            : result
            ? SuccessImg
            : FailImg
        "
      />
      <view class="result">
        {{ pageType === "recharge" ? "充值" : "购卡"
        }}{{ statusDic[cardInfo.tradeStatus] }}
      </view>
      <view v-if="result" class="text">
        当前余额{{ formatPrice(cardInfo.balance) }}元
      </view>
      <view v-else class="text">
        请{{ cardInfo.tradeStatus === 3 ? "重新购买" : "稍候" }}
      </view>
    </view>
    <!-- <i-button width="478rpx" v-if="result">放入微信卡包</i-button> -->
    <i-card-button v-if="cardInfo.tradeStatus !== 1" width="478rpx" @tap="back">
      返回
    </i-card-button>
  </i-sys>
</template>

<script setup lang="ts">
  import SuccessImg from "@/static/card/success@2x.png";
  import FailImg from "@/static/card/fail@2x.png";
  import PendingImg from "@/static/card/pending.png";
  import { computed, ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import { formatPrice } from "@/utils";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import {
    svcAppletMemberCardGetTradeInfoGet,
    SvcAppletMemberCardGetTradeInfoGetResponse
  } from "@/api/card";
  import CardCell from "../cardRecord/_component_/card-cell.vue";

  const orderNo = ref("");
  const statusDic = {
    1: "结果处理中",
    2: "成功",
    3: "失败"
  } as { [key: number]: string };
  const cardInfo = ref<SvcAppletMemberCardGetTradeInfoGetResponse>({
    cardName: "",
    memberCardCode: "",
    marketLogoUrl: "",
    cardBackgroundUrl: "",
    balance: 0,
    tradeAmount: 0,
    // 状态1:正常;2:冻结;3:退卡;
    status: 1,
    // 订单状态1、处理中2、成功3、失败
    tradeStatus: 2
  });
  const result = computed(() => cardInfo.value.tradeStatus === 2);

  const [getOrderInfo] = useFuncProxy(async () => {
    const d = await svcAppletMemberCardGetTradeInfoGet({
      orderNo: orderNo.value
    });
    cardInfo.value = d;

    if (d.tradeStatus === 1) {
      setTimeout(() => {
        getOrderInfo();
      }, 1000);
    }
  });

  function back() {
    uni.reLaunch({
      url: "/pages/card/tabbar/home"
    });
  }

  const pageType = ref("");
  onLoad((options: any) => {
    orderNo.value = options.orderNo;
    pageType.value = options.pageType;
    getOrderInfo();
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
