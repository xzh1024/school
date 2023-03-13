<template>
  <view class="cell-item">
    <view class="shop-info" @click="toStore">{{ item.storeName }} ></view>
    <view class="flex good-box" @click="toGood">
      <view class="image-box">
        <image
          :src="fixImage(item.pic, { w: 120 })"
          class="image-style"
          mode="aspectFill"
        />
      </view>
      <view class="good-info">
        <view class="flex">
          <view class="flex-1">{{ item.name }}</view>
          <view v-if="item.type === 3">次卡</view>
        </view>
        <view class="text-color-red">￥{{ item.price || 0 }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "GoodsCell"
  };
</script>
<script setup>
  import { fixImage } from "@/utils";
  defineEmits(["toDetail"]);
  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  const toStore = () => {
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${props.item.storeId}&type=1`
    });
  };

  const toGood = () => {
    uni.navigateTo({
      url: `/pages/home/merchants/goodsDetail/goodsDetail?productId=${props.item.objectId}&storeId=${props.item.storeId}`
    });
  };
  // const onDetail = () => {
  //   emits("toDetail", props.item);
  // }
</script>

<style scoped lang="scss">
  .text-color-red {
    color: #d93044;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .image-style {
    height: 100%;
    width: 100%;
  }
  .cell-item {
    border-radius: 8rpx;
    box-shadow: 0 8rpx 16rpx 2rpx rgba(0, 0, 0, 0.08);
    background: #ffffff;
    .shop-info {
      padding: 24rpx 32rpx;
      font-size: 24rpx;
      color: #333333;
      border-bottom: 1px solid #eaeaea;
    }
    .good-box {
      padding: 24rpx 32rpx;
    }
    .image-box {
      width: 120rpx;
      height: 120rpx;
      border-radius: 16rpx;
      overflow: hidden;
    }
    .good-info {
      flex: 1;
      font-size: 28rpx;
      margin-left: 28rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12rpx 0;
      color: #333333;
    }
  }
</style>
