<template>
  <view class="i-badge">
    <slot></slot>
    <text v-show="value > 0" class="badge-num">
      {{ value > 99 ? "99+" : value }}
    </text>
  </view>
</template>

<script setup lang="ts">
  defineProps({
    value: {
      type: Number,
      default: 0
    }
  });
</script>

<style lang="scss" scoped>
  .i-badge {
    position: relative;
  }

  .badge-num {
    position: absolute;
    top: -18rpx;
    right: -18rpx;
    padding: 0 10rpx;
    box-sizing: border-box;
    background-color: #fa4e40;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
    line-height: 36rpx;
    border-radius: 40rpx;
  }
</style>
