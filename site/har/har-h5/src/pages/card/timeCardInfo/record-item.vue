<template>
  <view class="spend">
    <view class="spend-row">
      <view class="spend-cell">
        <view class="spend-label">时间：</view>
        <view class="spend-value">{{ item.verificationTime }}</view>
      </view>
      <view class="spend-status">
        {{ item.verificationStatus ? "成功" : "失败" }}
      </view>
    </view>

    <view class="spend-row">
      <view class="spend-cell">
        <view class="spend-label">POS机：</view>
        <view class="spend-value">{{ item.deviceName }}</view>
      </view>
    </view>
    <view class="spend-row">
      <view class="spend-cell">
        <view class="spend-label">操作员：</view>
        <view class="spend-value">{{ item.merchantEmployeeName }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
  const props = defineProps({
    item: Object
  });
</script>

<style scoped lang="scss">
  .spend {
    padding: 24rpx 0;
    border-top: 1px solid #f0f0f0;
    line-height: 44rpx;
    font-size: 28rpx;
    color: #333333;
    .spend-row {
      display: flex;
      align-items: center;
      margin-top: 8rpx;
      &:first-child {
        margin-top: 0;
      }
      .spend-status {
        flex: 1;
        text-align: right;
      }
    }
    .spend-cell {
      display: flex;
      align-items: center;
    }
  }
</style>
