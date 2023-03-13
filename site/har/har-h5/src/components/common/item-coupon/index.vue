<template>
  <view class="item-coupon" @tap="couponClick">
    <view v-if="item.type === 1" class="arch-one-barge"></view>
    <view
      class="arch-one-fold"
      :class="item.type !== 1 ? 'arch-one-radius' : 'margin-left-f'"
      >{{ item.tag || item.name }}</view
    >
    <view class="arch-one-go">购</view>
  </view>
</template>

<script>
  export default {
    name: "ItemCoupon"
  };
</script>
<script setup>
  defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });

  const emits = defineEmits(["click"]);

  function couponClick() {
    emits("click");
  }
</script>

<style scoped lang="scss">
  .item-coupon {
    margin-right: 24rpx;
    margin-bottom: 8rpx;
    box-sizing: border-box;
    display: flex;
    height: 48rpx;
    line-height: 48rpx;
    .arch-one-barge {
      width: 40rpx;
      height: 48rpx;
      background: url(https://har-cbd-cdn.huianrong.com/har-cbd/applet/shop/coupou-block-barge.png)
        no-repeat center center;
      background-size: 100% 100%;
      position: relative;
      z-index: 1;
    }
    .arch-one-fold {
      font-size: 24rpx;
      font-weight: 400;
      padding: 0 16rpx;
      max-width: 360rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      //margin-left: -4rpx;
      background: #fc8a6d;
      color: #ffffff;
      border-radius: 0 8rpx 8rpx 0;
    }
    .arch-one-radius {
      border-radius: 8rpx;
    }
    .margin-left-f {
      margin-left: -4rpx;
    }

    .arch-one-go {
      font-size: 24rpx;
      text-align: center;
      font-weight: 400;
      width: 40rpx;
      height: 48rpx;
      color: #ffffff;
      background: url(https://har-cbd-cdn.huianrong.com/har-cbd/applet/shop/coupon-block-right.png)
        no-repeat center center;
      background-size: 100% 100%;
    }
  }
</style>
