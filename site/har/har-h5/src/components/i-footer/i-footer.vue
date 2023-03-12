<template>
  <view class="i-footer">
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
  .i-footer {
    width: 100%;
    padding: 24rpx 32rpx calc(24rpx + constant(safe-area-inset-bottom));
    padding: 24rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
