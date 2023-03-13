<template>
  <view class="filter">
    <view class="flex align-center space-around">
      <view class="flex align-center filter-item-active">
        <view>分类</view>
        <image
          class="filter-image"
          src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/arrow_bottom_black.png"
        ></image>
      </view>
    </view>
    <view class="dic-box">
      <view class="dic-list">
        <view class="dic-item">蓝拳</view>
        <view class="dic-item">蓝拳</view>
        <view class="dic-item">蓝拳</view>
        <view class="dic-item">蓝拳</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "IFilter"
  };
</script>

<script setup>
  /**
   * [
   * {
   *  label: '分类',
   *  dic: []   //字典数组
   * }
   * ]
   *
   *
   *
   *
   *
   *
   * */
</script>

<style scoped lang="scss">
  .filter {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
    .filter-item {
      color: #333;
      font-size: 32rpx;
      font-weight: 400;
      line-height: 84rpx;
    }
    .filter-item-active {
      color: #fb5f05;
    }
    .dic-box {
      background: #fff;
      height: 606rpx;
      overflow-y: auto;
      .dic-item {
        line-height: 72rpx;
        border-bottom: 2rpx solid #eaeaea;
        font-size: 28rpx;
        color: #333;
        &:last-child {
          border-bottom: none;
        }
        &-active {
          color: #fb5f05;
        }
      }
    }
    .filter-image {
      width: 28rpx;
      height: 28rpx;
      margin-left: 8rpx;
    }
  }
</style>
