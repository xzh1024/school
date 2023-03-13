<template>
  <view class="shop-item flex" @tap="toPath">
    <image
      class="shop-image"
      :src="fixImage(item.productCoverPic, { w: 148 })"
      mode="aspectFill"
    ></image>
    <view class="flex-1">
      <view class="name">{{ item.productName }}</view>
      <view class="tag-type-list">
        <slot name="desc">
          <view v-for="(t, index) in tags" :key="index" class="tag-type">
            {{ t }}
          </view>
        </slot>
      </view>
      <view class="sales">销量：{{ item.sales }}</view>
      <view class="flex align-end space-between" style="margin-top: 16rpx">
        <view class="price">
          ￥<text class="price-p">{{ item.salePrice }}</text>
        </view>
        <view class="add" @tap.stop="addClick"></view>
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
  import { computed } from "vue";
  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });

  const tags = computed(() => {
    return props.item.tags || [];
  });
  const emits = defineEmits(["click", "addClick"]);

  function addClick() {
    emits("addClick", props.item);
  }
  function toPath() {
    emits("click", props.item);
  }
</script>

<style lang="scss" scoped>
  .shop-item {
    background-color: #fff;
    padding: 32rpx;
    border-bottom: 2rpx solid #f0f0f0;
    .shop-image {
      width: 148rpx;
      height: 148rpx;
      margin-right: 32rpx;
      border-radius: 8rpx;
      overflow: hidden;
      background-color: #eeeeee;
    }
    .name {
      font-size: 28rpx;
      color: #070a16;
      padding-bottom: 8rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .tag-type {
      font-size: 24rpx;
      color: #fb5f05;
      padding: 4 16rpx;
      line-height: 40rpx;
      border-radius: 8rpx;
      background: #ffefdc;
      display: inline-block;
      margin-right: 16rpx;
    }
    .sales {
      font-size: 24rpx;
      color: #606066;
      line-height: 40rpx;
      //padding-top: 8rpx;
      // padding-bottom: 8rpx;
    }
    .price {
      font-size: 24rpx;
      color: #d93044;
      padding-top: 8rpx;
      line-height: 24rpx;
      .price-p {
        font-size: 32rpx;
      }
    }
    .add {
      width: 40rpx;
      height: 40rpx;
      border-radius: 8rpx;
      border: 2rpx solid #fb9c65;
      position: relative;
      &::before {
        content: "";
        width: 24rpx;
        height: 2rpx;
        background: #fb9c65;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &::after {
        content: "";
        width: 2rpx;
        height: 24rpx;
        background: #fb9c65;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
