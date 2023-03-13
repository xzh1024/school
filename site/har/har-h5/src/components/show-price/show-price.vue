<template>
  <view
    v-if="[1, 2].includes(info.payMethod)"
    class="amount"
    :class="{ 'rmb-symbol': info.payMethod === 1, black }"
  >
    <text style="font-size: 28rpx">{{
      info.sellingPrice + (info.payMethod === 2 ? "积分" : "元")
    }}</text>
    <text v-if="origin" class="rmb-symbol origin-price">{{
      info.scribingPrice || 0
    }}</text>
  </view>
  <view
    v-if="info.payMethod === 3 && !isActivity"
    class="amount"
    :class="{ black }"
  >
    <text style="font-size: 28rpx" class="rmb-symbol"
      >{{ info.sellingPrice }}元 + {{ info.sellingIntegral }}积分</text
    >
    <text v-if="origin" class="rmb-symbol origin-price">{{
      info.scribingPrice || 0
    }}</text>
  </view>
  <view v-if="info.payMethod === 3 && isActivity" class="amount">
    <text style="font-size: 28rpx">免费</text>
  </view>
</template>

<script setup>
  /**
   * @params [origin] show original price or not.
   * */
  defineProps({
    info: {
      type: Object,
      default: () => {}
    },
    origin: {
      type: Boolean,
      default: false
    },
    black: {
      type: Boolean,
      default: false
    },
    isActivity: {
      type: Boolean,
      default: false
    }
  });
</script>
<style scoped lang="scss">
  .amount {
    font-size: 24rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: $uni-primary;
    &.black {
      color: #4e5969;
    }
  }
  .origin-price {
    padding-left: 8rpx;
    font-size: 20rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #86909c;
    text-decoration: line-through;
  }
</style>
