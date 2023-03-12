<template>
  <view class="card-box" @click="onChoose">
    <view class="left-box flex align-center">
      <template v-if="needChoose">
        <view v-if="!item?.checked" class="i-round"></view>
        <view v-else class="i-round">
          <image
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-checked.png"
          />
        </view>
      </template>
      <view class="i-avatar">
        <image :src="item?.marketLogoUrl" mode="aspectFill" />
      </view>
      <view class="card-info">
        <view class="title">{{ item?.cardName }}</view>
        <view class="no">{{ item?.memberCardCode }}</view>
        <view class="balance">{{ `卡内余额：￥${item?.balance}` }}</view>
      </view>
    </view>
    <view class="right-box">
      <view class="reduce-money">{{ `￥${item?.amount}` }}</view>
      <view v-if="item.discount" class="discount">{{
        `已优惠${item?.discountAmount}`
      }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    },
    checked: {
      type: Boolean,
      default: false
    },
    needChoose: {
      type: Boolean,
      default: true
    }
  });

  const emits = defineEmits(["onChoose"]);

  const onChoose = () => {
    emits("onChoose", props.item);
  };
</script>

<style scoped lang="scss">
  .i-round {
    height: 32rpx;
    width: 32rpx;
    border-radius: 50%;
    background: #e6e6e6;
    overflow: hidden;
    image {
      height: 100%;
      width: 100%;
    }
  }
  .card-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2rpx dotted #ebebec;
    padding: 24rpx 0;
    .left-box {
      .i-avatar {
        height: 88rpx;
        width: 88rpx;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 16rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .card-info {
        flex: 1;
        font-size: 24rpx;
        color: #606066;
        line-height: 40rpx;
        .title {
          font-size: 28rpx;
          color: #070a16;
          line-height: 48rpx;
        }
      }
    }
    .right-box {
      flex: 1;
      text-align: right;
      .reduce-money {
        color: #d93044;
        font-size: 28rpx;
        line-height: 44rpx;
        font-weight: bold;
      }
      .discount {
        font-size: 24rpx;
        color: #606066;
        line-height: 40rpx;
      }
    }
  }
</style>
