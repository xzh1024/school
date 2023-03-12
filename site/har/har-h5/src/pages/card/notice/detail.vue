<template>
  <i-sys title="消息">
    <view class="page-container">
      <calc-top />
      <view class="card-box">
        <view class="title-box">
          <view class="text-black">{{
            `${newType(detailInfo.source)?.label}金额`
          }}</view>
          <view :style="{ color: newType(detailInfo.source)?.color }">{{
            `${newType(detailInfo.source)?.mark}￥${formatPrice(
              detailInfo.tradeAmount
            )}`
          }}</view>
        </view>
        <view class="content-box">
          <info-cell
            title="交易状态"
            :value="`${newType(detailInfo.source)?.label}${newStatus(
              detailInfo.tradeStatus
            )}`"
          />
          <info-cell title="储值卡号" :value="detailInfo.memberCardCode" />
          <info-cell title="交易时间" :value="detailInfo.tradeTime" />
          <info-cell title="订单来源" :value="detailInfo.title" />
          <info-cell title="订单号" :value="detailInfo.tradeNo" />
          <info-cell
            title="支付金额"
            :value="`${formatPrice(detailInfo.payAmount)}元`"
          />
        </view>
      </view>
      <!--<view v-if="detailInfo.type === 1" class="margin-b-12">
        <i-button width="480rpx">放入微信卡包</i-button>
      </view>
       <view class="card-package">我的卡包</view> -->
    </view>
  </i-sys>
</template>

<script setup lang="ts">
  import InfoCell from "./_components_/info-cell.vue";
  import { computed, ref } from "vue";
  import { fee_classify } from "@/dic";
  import { formatPrice } from "@/utils";
  import { onLoad } from "@dcloudio/uni-app";
  import { svcAppletMessageInfoGet } from "@/api/card";

  const messageId = ref("");
  onLoad((options: any) => {
    messageId.value = options.id;
    init();
  });
  // onMounted(() => {
  //   init()
  // })

  const detailInfo: any = ref({});
  const init = async () => {
    try {
      detailInfo.value = await svcAppletMessageInfoGet({
        messageId: messageId.value
      });
    } catch (e) {
      console.error(e);
    }
  };

  const newType = computed(() => (val: number) => {
    return fee_classify.find((item) => item.value === val);
  });

  const newStatus = computed(() => (val: number) => {
    return val === 1 ? "成功" : "失败";
  });
</script>

<style scoped lang="scss">
  .inner-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text-black {
    color: #070a16;
  }
  .text-red {
    color: #fa4e40;
  }
  .margin-b-12 {
    margin-bottom: 24rpx;
  }
  .page-container {
    padding: 24rpx 32rpx;
    .card-box {
      background: #ffffff;
      border-radius: 16rpx;
      padding: 32rpx 24rpx;
      margin-bottom: 40rpx;
      .title-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2rpx solid #f0f0f0;
        padding-bottom: 24rpx;
        font-size: 36rpx;
      }
    }
    .card-package {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32rpx;
      color: #ff7200;
    }
  }
</style>
