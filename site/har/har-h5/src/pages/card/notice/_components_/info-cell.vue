<template>
  <view class="cell-container">
    <view class="title">{{ title }}</view>
    <view class="value">{{ value || "-" }}</view>
  </view>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String
    },
    value: {
      type: String
    }
  });
</script>

<style scoped lang="scss">
  .cell-container {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    margin-top: 24rpx;
    .title {
      color: #383840;
      margin-right: 24rpx;
    }
    .value {
      flex: 1;
      text-align: right;
      color: #070a16;
      word-break: break-all;
    }
  }
</style>
