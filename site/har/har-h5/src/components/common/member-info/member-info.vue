<template>
  <view class="member-info-box">
    <view class="avatar-box">
      <image class="image-style" :src="memberInfo.avatarUrl" />
      <view v-if="memberInfo.levelDefaultName" class="member-level">{{
        memberInfo.levelDefaultName
      }}</view>
    </view>
    <view class="member-nickname">{{ memberInfo.nickName }}</view>
    <view class="flex text-brown text-xs">
      <view>等级豆:{{ memberInfo.levelBean || 0 }}</view>
      <view class="margin-lr-4">|</view>
      <view>积分:{{ memberInfo.integral || 0 }}</view>
    </view>
  </view>
</template>

<script setup>
  defineProps({
    memberInfo: {
      type: Object,
      default: () => {}
    }
  });
</script>

<style scoped lang="scss">
  .margin-lr-4 {
    margin: 0 8rpx;
  }
  .text-brown {
    color: #61411c;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .image-style {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .member-info-box {
    width: 100%;
    height: 350rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url("https://har-cbd-cdn.huianrong.com/har-cbd/applet/user/bg-userInfo.png");
    background-size: 100% 100%;
    .avatar-box {
      height: 150rpx;
      width: 150rpx;
      border-radius: 50%;
      position: relative;
      .member-level {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 36px;
        height: 20px;
        background: #ff5f00;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        color: #ffffff;
      }
    }
    .member-nickname {
      font-size: 32rpx;
      margin: 24rpx 0 8rpx 0;
      color: #563614;
    }
  }
</style>
