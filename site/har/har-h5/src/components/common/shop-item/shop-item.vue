<template>
  <view class="shop-item" @tap.stop="toPath">
    <view class="flex">
      <view class="img">
        <image :src="fixImage(item.prdPic, { w: 148 })" class="image"></image>
      </view>
      <view class="flex-1">
        <view class="flex space-between align-center">
          <view class="name">{{ item.prdName }}</view>
          <view class="price"
            >￥{{ item.prdTotalPrice || item.prdPrice || 0 }}</view
          >
        </view>
        <view class="week"> {{ item.specDesc || item.prdSpecNames }}</view>
        <view class="num">x{{ item.prdNum }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ShopItem"
  };
</script>
<script setup>
  import { fixImage } from "@/utils";
  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    type: {
      type: String,
      default: "shop"
    }
  });
  function toPath() {
    if (props.type === "shop") {
      uni.navigateTo({
        url: `/pages/home/merchants/goodsDetail/goodsDetail?productId=${props.item.prdId}&storeId=${props.item.storeId}`
      });
    }
  }
</script>

<style scoped lang="scss">
  .shop-item {
    padding: 24rpx 0;
    border-bottom: 1px dashed #eaeaea;
  }
  .img {
    width: 148rpx;
    height: 148rpx;
    margin-right: 24rpx;
    .image {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
    }
  }
  .name {
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .price {
    line-height: 44rpx;
    color: #d93044;
    font-size: 28rpx;
  }
  .week,
  .num {
    color: #666666;
    font-size: 24rpx;
    line-height: 40rpx;
  }
  .week {
    padding-top: 16rpx;
  }
</style>
