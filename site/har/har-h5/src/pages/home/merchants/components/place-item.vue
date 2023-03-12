<template>
  <view class="place-item flex" @tap="itemClick">
    <view class="flex-cont">
      <image
        class="item-image"
        :src="fixImage(item.venuePic, { w: 100 })"
        mode="aspectFill"
      ></image>
      <view class="flex-content">
        <view class="flex content-box">
          <view class="name">{{ item.venueName }}</view>
          <view class="tag">{{ item.venueClassify }}</view>
        </view>
        <view class="desc-sales">
          销量
          <text>{{ item.sales }}</text>
        </view>
      </view>
    </view>
    <view scroll-x class="item-card">
      <view
        v-for="(p, index) in priceRules"
        :key="index"
        class="card-item"
        @tap="itemCardClick(p.ruleType)"
      >
        <view class="card-title">{{ p.title }}</view>
        <!-- <view class="card-title">{{ filterType(p.ruleType) }}</view> -->
        <view class="price">
          <text>￥{{ p.salePrice }}</text>
          <text v-if="p.scribingPrice" class="text-grey"
            >￥{{ p.scribingPrice }}</text
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "PlaceItem"
  };
</script>
<script setup>
  import { computed } from "vue";
  import { fixImage } from "@/utils";
  // import { storePlaceTypeList } from "../../../../utils/dic";
  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });

  const priceRules = computed(() => {
    return props.item.priceRules || [];
  });

  // function filterType(v) {
  //   return storePlaceTypeList.find((i) => i.value === v)?.label;
  // }
  function itemClick() {
    const { storeId, venueId, priceRules = [] } = props.item;
    uni.navigateTo({
      url: `/pages/place/detail?storeId=${storeId}&venueId=${venueId}&ruleType=${priceRules[0].ruleType}`
    });
  }
  function itemCardClick(id) {
    uni.navigateTo({
      url: `/pages/place/detail?storeId=${props.item.storeId}&venueId=${props.item.venueId}&ruleType=${id}`
    });
  }
</script>

<style scoped lang="scss">
  .place-item {
    background: #fff;
    padding: 32rpx 24rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 2rpx solid #f0f0f0;

    .item-image {
      width: 100rpx;
      height: 100rpx;
      flex-shrink: 0;
      border-radius: 8rpx;
      margin-right: 24rpx;
      background-color: #d9d9d9;
    }
    .flex-cont {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .name {
      flex: 1;
      font-size: 28rpx;
      color: #333;
      line-height: 28rpx;
      font-weight: 400;
      margin-bottom: 8rpx;
    }

    .desc-sales {
      font-size: 24rpx;
      color: #9c9ca0;
      line-height: 40rpx;
      text {
        color: #f03020;
      }
    }
    .item-card {
      width: 100%;
      margin-top: 16rpx;
      display: flex;
      align-items: flex-start;
      overflow: auto hidden;
      -webkit-overflow-scrolling: touch;
    }
    .card-item {
      width: 212rpx;
      flex-shrink: 0;
      margin-right: 16rpx;
      &:last-child {
        margin-right: 0;
      }
    }
    .card-title {
      color: #fff;
      font-size: 28rpx;
      line-height: 60rpx;
      height: 60rpx;
      font-weight: 400;
      text-align: center;
      background: #fb5f05;
      border-radius: 8rpx 8rpx 0 0;
    }
    .price {
      font-size: 24rpx;
      color: #d93044;
      height: 60rpx;
      line-height: 60rpx;
      font-weight: 400;
      border: 2rpx solid #fb5f05;
      border-radius: 0 0 8rpx 8rpx;
    }
    .text-grey {
      color: #cccccc;
      text-decoration: line-through;
    }
  }

  .flex-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .tag {
    padding: 4rpx 16rpx;
    font-size: 24rpx;
    color: #fb5f05;
    line-height: 40rpx;
    background-color: #ffefdc;
    border-radius: 8rpx;
  }

  .content-box {
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
    justify-content: space-between;
  }
</style>
