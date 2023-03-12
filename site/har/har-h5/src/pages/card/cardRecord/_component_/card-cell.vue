<template>
  <view
    class="card-box"
    :style="{
      width: '100%',
      height: `${height}rpx`
    }"
  >
    <image class="bg-img" :src="info?.cardBackgroundUrl || ''" />
    <view class="card-info-box">
      <view class="avatar-box">
        <image
          class="logo"
          :src="fixImage(info?.marketLogoUrl || '', { w: 88 })"
        />
      </view>
      <view class="info-box">
        <view class="card-name">
          <view class="name">{{ info?.cardName }}</view>
          <view v-if="info?.status" class="i-tag">{{
            newStatus(info?.status)
          }}</view>
        </view>
        <view class="card-no">{{ info?.memberCardCode }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { card_status } from "@/dic";
  import { fixImage } from "@/utils";

  defineProps({
    height: {
      type: Number,
      default: 360
    },
    info: {
      type: Object,
      default: () => {}
    }
  });

  const newStatus = computed(() => (val: number) => {
    return card_status.find((item) => item.value === val)?.label;
  });
</script>

<style scoped lang="scss">
  .card-box {
    box-sizing: border-box;
    border-radius: 24rpx;
    overflow: hidden;
    padding: 24rpx;
    display: flex;
    position: relative;
    .bg-img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      filter: brightness(80%);
    }
    .card-info-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      display: flex;
    }
    .avatar-box {
      height: 88rpx;
      width: 88rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 24rpx;
      margin-left: 24rpx;
      margin-right: 32rpx;
      border: 4rpx solid #ffffff;
      .logo {
        height: 100%;
        width: 100%;
      }
    }
    .info-box {
      flex: 1;
      padding-right: 24rpx;
      padding-top: 24rpx;
      .card-name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name {
          font-weight: bold;
          font-size: 32rpx;
          color: #ffffff;
          flex: 1;
        }
        .i-tag {
          padding: 8rpx 24rpx;
          color: #ff811a;
          font-size: 24rpx;
          background: #ffffff;
          border-radius: 8rpx;
        }
      }
      .card-no {
        color: #ffffff;
        font-size: 28rpx;
        line-height: 22px;
        margin-top: 8rpx;
      }
    }
  }
</style>
