<template>
  <view class="card-cell">
    <image mode="aspectFill" class="card-bg" :src="item.cardBackgroundUrl" />
    <image mode="aspectFill" class="card-logo" :src="item.marketLogoUrl" />
    <view
      v-if="pageType === 'default'"
      class="card-flag"
      :class="{
        'bg-warning': item.status === 1
      }"
    >
      {{ cardStatus[item.status] }}
    </view>
    <view class="card-info">
      <view class="card-info-name">{{ item.cardName }}</view>
      <view class="card-info-no">{{ item.memberCardCode }}</view>
    </view>
    <view class="card-balance">{{ formatPrice(item.balance) }}</view>
  </view>
</template>

<script setup lang="ts">
  import { card_status } from "@/dic";
  import { formatPrice } from "@/utils";
  import { PropType, reactive } from "vue";
  type ItemType = {
    memberCardCode: string;
    cardBackgroundUrl: string;
    cardName: string;
    marketLogoUrl: string;
    balance: number;
    status: number;
  };
  defineProps({
    item: {
      type: Object as PropType<ItemType>,
      required: true
    },
    pageType: {
      type: String
    }
  });

  const cardStatus = reactive<{ [key: number]: string }>({});
  card_status.forEach((item) => {
    cardStatus[item.value] = item.label;
  });
</script>

<style lang="scss" scoped>
  .card-cell {
    width: 100%;
    height: 212rpx;
    padding: 0 24rpx;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: #ddd;
    box-shadow: 0px 8rpx 16rpx 0px rgba(111, 111, 111, 0.08);
    border-radius: 24rpx;
    margin-bottom: 24rpx;
    overflow: hidden;
  }

  .card-logo {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    border: 2rpx solid #ffffff;
    margin-right: 24rpx;
    position: relative;
    z-index: 2;
  }

  .card-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: brightness(80%);
  }

  .card-flag {
    width: 120rpx;
    height: 48rpx;
    background: #f0f0f0;
    border-radius: 0px 24rpx 0px 24rpx;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #606066;

    &.bg-warning {
      color: #ffffff;
      background-color: #ff811a;
    }
  }

  .card-info {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .card-info-name {
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 48rpx;
  }

  .card-info-no {
    margin-top: 8rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #ffffff;
    line-height: 44rpx;
  }

  .card-balance {
    font-size: 40rpx;
    font-weight: bold;
    color: #ffffff;
    line-height: 44px;
    position: relative;
    z-index: 2;

    &::before {
      content: "￥";
      font-size: 28rpx;
    }
  }
</style>
