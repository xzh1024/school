<template>
  <view class="item" :class="noBottom && 'no-bottom'" @click="itemClick">
    <view class="flex align-center">
      <view v-if="badgeText" class="font-box">{{ badgeText }}</view>
      <slot name="label">
        <view>{{ label }}</view>
      </slot>
    </view>
    <slot name="value">
      <view class="flex align-center">
        <view :style="{ color: valueColor }">{{ value }}</view>
        <view v-if="rightIcon">
          <image
            class="img-right"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icons/arrow.png"
          ></image>
        </view>
      </view>
    </slot>
  </view>
</template>

<script>
  export default {
    name: "ICell"
  };
</script>
<script setup>
  defineProps({
    badgeText: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    noBottom: {
      type: Boolean,
      default: false
    },
    rightIcon: {
      type: Boolean,
      default: false
    },
    valueColor: {
      type: String,
      default: "#999"
    }
  });
  const emits = defineEmits(["click"]);
  function itemClick() {
    emits("click");
  }
</script>

<style scoped lang="scss">
  .img-right {
    width: 10rpx;
    height: 16rpx;
    margin-left: 20rpx;
  }
  .item {
    color: #666666;
    font-size: 28rpx;
    line-height: 44rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 2rpx dashed #eaeaea;
    &.no-bottom {
      border-bottom: none;
    }
  }
  .font-box {
    width: 40rpx;
    height: 40rpx;
    background: #ff5f00;
    color: #fff;
    font-size: 24rpx;
    line-height: 40rpx;
    margin-right: 16rpx;
    text-align: center;
    border-radius: 4rpx;
  }
</style>
