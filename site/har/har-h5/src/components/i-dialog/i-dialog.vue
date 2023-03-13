<template>
  <view class="dialog-box"></view>
  <view class="dialog-content-box" :style="{ height: contentHeight + 'px' }">
    <view v-if="title" class="top">{{ title }}</view>
    <view class="content">
      <slot>
        {{ content }}
      </slot>
    </view>

    <view
      v-if="hasFooter"
      class="bottom"
      :class="!showCancel && 'space-center'"
    >
      <button
        v-if="showCancel"
        class="i-block-btn"
        type="primary"
        @click="dialogClose"
        >{{ cancelContent }}</button
      >
      <button
        class="i-block-btn i-active"
        type="primary"
        @click="dialogConfirm"
        >{{ confirmContent }}</button
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: "IDialog"
  };
</script>
<script setup>
  defineProps({
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    confirmContent: {
      type: String,
      default: "确定"
    },
    cancelContent: {
      type: String,
      default: "取消"
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    hasFooter: {
      type: Boolean,
      default: true
    },
    contentHeight: {
      type: Number,
      default: 200
    }
  });
  const emits = defineEmits(["dialogConfirm", "dialogClose"]);

  const dialogConfirm = () => {
    emits("dialogConfirm");
  };

  const dialogClose = () => {
    emits("dialogClose");
  };
</script>

<style scoped lang="scss">
  .dialog-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 99990;
    background: rgba(0, 0, 0, 0.65);
    animation: move 0.3s linear;
    animation-fill-mode: forwards;
    @keyframes move {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0.8;
      }
    }
  }
  .dialog-content-box {
    position: fixed;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    width: 343px;
    height: 200px;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    .top {
      //position: absolute;
      //top: 0;
      //left: 0;
      width: stretch;
      height: 75rpx;
      align-items: center;
      justify-content: space-between;
      padding: 0 24rpx;
      border-bottom: 1px solid #e6e6e6;
      font-size: 28rpx;
      display: flex;
    }
    .content {
      //position: absolute;
      //top: 75rpx;
      //left: 0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: stretch;
      padding: 32rpx;
      font-size: 32rpx;
      color: #333333;
      text-align: center;
    }
    .bottom {
      //position: absolute;
      //left: 0;
      //bottom: 0;
      width: 100%;
      display: flex;
      padding-bottom: 32rpx;
      justify-content: space-around;
      align-items: center;
      .i-block-btn {
        width: 114px;
        height: 38px;
        background: #ffffff;
        border-radius: 38rpx;
        color: #fb5f05;
        font-size: 32rpx;
        border: 2rpx solid #fb5f05;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        &:after {
          border: none;
          margin: 0;
        }
      }
      .i-active {
        background: #fb5f05 !important;
        color: #ffffff !important;
      }
    }
  }
</style>
