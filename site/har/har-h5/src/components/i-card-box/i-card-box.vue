<template>
  <view class="i-card">
    <slot></slot>
  </view>
</template>

<script lang="ts">
  export default {
    name: "ICardBox"
  };
</script>

<style lang="scss" scoped>
  .i-card {
    padding: 32rpx 24rpx;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 8rpx 16rpx 0px rgba(111, 111, 111, 0.08);
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 24rpx;
  }
</style>
