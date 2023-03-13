<template>
  <view class="cell-item flex space-between align-center">
    <view class="left-box">
      <view class="title">{{ cellInfo.title }}</view>
      <view class="desc">{{ cellInfo.desc }}</view>
      <view class="price">
        <view class="unit">￥</view>
        <view class="price-num">{{ cellInfo.salePrice }}</view>
      </view>
    </view>
    <view class="right-box">
      <i-button
        class="i-button"
        :opacity="1"
        :class="{ disabled: cellInfo.state === 2 }"
        :disabled="cellInfo.state === 2"
        type="primary"
        @click="onHandle"
        >{{ cellInfo.btnName || "加入购物车" }}</i-button
      >
    </view>
  </view>
</template>

<script setup>
  import IButton from "../../../components/i-button/index.vue";
  const emits = defineEmits(["onJoinCart"]);

  const props = defineProps({
    cellInfo: {
      type: Object,
      default: () => {}
    }
  });

  const onHandle = () => {
    emits("onJoinCart", props.cellInfo);
  };
</script>

<style scoped lang="scss">
  .i-button {
    width: 220rpx;
    height: 76rpx;
    background: #fb5f05;
    border-radius: 38rpx;
    opacity: 1;
    color: #ffffff;
    font-size: 32rpx;
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    &:after {
      border: none;
    }
    &.disabled {
      color: #999999;
      background: #e6e6e6;
    }
  }
  .cell-item {
    padding: 32rpx 32rpx 16rpx 32rpx;
    border-top: 1px solid #e6e6e6;
    background: #ffffff;
    //padding-bottom: 32rpx;
    //&:last-child {
    //  border-bottom: none;
    //}
    .left-box {
      .title {
        font-size: 28rpx;
        color: #333333;
        margin-bottom: 16rpx;
      }
      .desc {
        font-size: 20rpx;
        color: #999999;
        margin-bottom: 16rpx;
      }
      .price {
        display: flex;
        align-items: flex-end;
        color: #ea3d41;
        .unit {
          font-size: 24rpx;
        }
        .price-num {
          font-size: 32rpx;
        }
      }
    }
  }
</style>
