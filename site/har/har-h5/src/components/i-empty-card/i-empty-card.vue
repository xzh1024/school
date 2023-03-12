<template>
  <view class="i-empty">
    <image class="i-empty-img" src="@/static/card/empty.png" />
    <text class="i-empty-text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      default: "暂无数据"
    }
  });
</script>

<style lang="scss" scoped>
  .i-empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background-color: #fff;
  }

  .i-empty-img {
    width: 322rpx;
    height: 288rpx;
  }

  .i-empty-text {
    font-size: 28rpx;
    font-weight: 400;
    color: #9c9ca0;
    line-height: 44rpx;
    margin-top: 24rpx;
  }
</style>
