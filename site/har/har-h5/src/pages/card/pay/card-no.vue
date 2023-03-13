<template>
  <view class="card-no">
    <view v-for="item in cardNo" :key="item" class="card-item">{{ item }}</view>
  </view>
</template>

<script setup lang="ts">
  defineProps({
    cardNo: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .card-no {
    font-size: 36rpx;
    font-weight: 500;
    color: #070a16;
    line-height: 52rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-item {
    &:nth-child(4n) {
      margin-right: 28rpx;
    }
  }
</style>
