<template>
  <view class="cell-item">
    <view class="box2" @click="onDetail">
      <view class="left-image-box">
        <image
          class="image-style"
          :src="fixImage(item.storePic, { w: 58 })"
          mode="aspectFill"
        />
      </view>
      <view class="right-content-box flex-sub">
        <view class="store-name margin-bottom-5">{{ item.storeName }}</view>
        <view class="flex space-between margin-bottom-5">
          <view class="text-xs text-color-6">{{ item.storeFormat }}</view>
          <view class="text-xs text-color-6">月销{{ item.sales }}</view>
        </view>
        <view class="text-xs text-color-6 margin-bottom-5">
          {{ item.operatingStatus === 2 ? "打烊" : `营业中${item.openTime}` }}
        </view>
        <!-- <view class="flex flex-wrap">
          <item-coupon
            v-for="(sub, index) in item.couponTag"
            :key="index"
            :item="sub"
          />
        </view> -->
        <!--推荐店铺-->
        <view v-if="index === 0" class="recommend-store-box">
          <scroll-view class="cell-box" scroll-x="true">
            <view
              v-for="(sub, idx) in item.venueList"
              :key="idx"
              class="store-cell"
              @click.stop="onOtherDetail(sub)"
            >
              <view class="image-box">
                <image
                  :src="fixImage(sub.venuePic, { w: 160 })"
                  class="image-style"
                  mode="aspectFill"
                />
              </view>
              <view class="name text-xs text-color-6">{{ sub.venueName }}</view>
              <view class="flex text-xs">
                <view class="text-color-red">￥{{ sub.salePrice }}</view>
                <view v-if="sub.scribingPrice" class="text-color-9"
                  >￥{{ sub.scribingPrice }}</view
                >
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "StoreCell"
  };
</script>
<script setup>
  // import ItemCoupon from "@/components/common/item-coupon/index.vue";
  import { fixImage } from "@/utils";
  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }
  });

  const onOtherDetail = (item) => {
    const { venueId } = item;
    uni.navigateTo({
      url: `/pages/place/detail?venueId=${venueId}&ruleType=1&storeId=${props.item.storeId}`
    });
  };

  /**
   * 店铺详情
   * @param storeId
   */
  const onDetail = () => {
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${props.item.storeId}`
    });
  };
</script>

<style scoped lang="scss">
  .image-style {
    height: 100%;
    width: 100%;
  }
  .margin-bottom-5 {
    margin-bottom: 10rpx;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .space-between {
    justify-content: space-between;
  }
  .flex-sub {
    flex: 1;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .text-color-6 {
    color: #666666;
  }
  .text-color-9 {
    color: #999999;
  }
  .text-color-red {
    color: #d93044;
  }
  .i-tag {
    height: 36rpx;
    background: #ffefe6;
    color: #ff5f00;
    font-size: 20rpx;
    padding: 0 6rpx;
    border-radius: 8rpx;
    margin-right: 32rpx;
    margin-bottom: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      margin-right: 0;
    }
  }
  .cell-item {
    margin-bottom: 32rpx;
    .box2 {
      background: #ffffff;
      box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16rpx;
      padding: 32rpx 32rpx 24rpx 32rpx;
      display: flex;
      justify-content: space-between;
      .left-image-box {
        width: 58px;
        height: 71px;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 32rpx;
      }
      .right-content-box {
        overflow-x: hidden;
        .store-name {
          font-size: 32rpx;
          color: #222222;
        }
        .recommend-store-box {
          width: 100%;
          margin-top: 5rpx;
          //overflow-x: auto;
          //overflow-y: hidden;
          white-space: nowrap;
          .cell-box {
            display: flex;
            .store-cell {
              display: inline-block;
              width: 160rpx;
              margin-right: 32rpx;
              overflow: hidden;
              &:last-child {
                margin-right: 0;
              }
              .image-box {
                width: 160rpx;
                height: 116rpx;
                border-radius: 8rpx;
                overflow: hidden;
              }
              .name {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin: 8rpx 0;
              }
            }
          }
        }
      }
    }
  }
</style>
