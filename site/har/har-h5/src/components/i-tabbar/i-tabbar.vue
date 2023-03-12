<template>
  <view class="i-tabbar">
    <view
      v-for="(item, index) in data"
      :key="index"
      class="i-tabbar-item"
      :class="{
        active: active === index
      }"
      @tap="tabbarChange(item.path)"
    >
      <image class="i-tabbar-icon" :src="item.icon" />
      <text class="i-tabbar-text">{{ item.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { PropType } from "vue";

  interface TabbarItemType {
    icon: Element;
    label: string;
    path?: string;
  }

  defineProps({
    data: {
      type: Array as PropType<TabbarItemType[]>,
      required: true
    },
    active: {
      type: Number,
      default: 0
    }
  });

  function tabbarChange(url?: string) {
    if (url) {
      uni.redirectTo({ url });
    }
  }
</script>

<style lang="scss" scoped>
  .i-tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: #fff;
    display: flex;
    align-items: center;
    width: 100%;
    height: 120rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    border-top: 2rpx solid #f0f0f0;

    &-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &.active {
        .i-tabbar-text {
          color: #ff811a;
        }
      }
    }

    &-icon {
      width: 48rpx;
      height: 48rpx;
    }

    &-text {
      font-size: 20rpx;
      font-weight: 500;
      color: #666666;
      line-height: 23rpx;
      margin-top: 8rpx;
    }
  }
</style>
