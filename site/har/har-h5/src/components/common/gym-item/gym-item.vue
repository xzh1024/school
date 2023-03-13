<template>
  <view class="gym-item" @click="toPath">
    <view class="gym-title">{{ item.venueName }}</view>
    <view class="flex">
      <view class="img">
        <image class="image" :src="fixImage(item.prdPic, { w: 148 })"></image>
      </view>
      <view class="flex-1">
        <view class="flex space-between align-center">
          <view class="name">{{ item.prdName }}</view>
          <view v-if="price" class="price">￥{{ price }}</view>
        </view>
        <view class="week">{{ item.prdSpecNames || item.specDesc }}</view>
        <view class="num">x{{ item.type === 22 ? 1 : item.prdNum }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "GymItem"
  };
</script>
<script setup>
  import { computed } from "vue";
  import NP from "number-precision";
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
      default: "shop" // shop  order
    }
  });
  const price = computed(() => {
    const { prdTotalPrice, prdPrice, prdNum, type } = props.item;
    const p = prdTotalPrice || prdPrice;
    if (type === 22) {
      return NP.times(p, prdNum);
    }
    return p;
  });
  function toPath() {
    if (props.type === "shop") {
      if (props.storeId) {
        uni.navigateTo({
          url: `/pages/home/merchants/merchants?storeId=${props.storeId}&type=1`
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .gym-item {
    padding: 24rpx 0;
  }
  .gym-title {
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    padding-bottom: 16rpx;
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
