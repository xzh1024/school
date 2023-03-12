<template>
  <i-card
    :title="info.storeName"
    :extra-text="filterStatus(info.orderStatus)"
    @title-click="titleClick"
  >
    <view class="shop-scroll-box" @click="toPath">
      <view class="scroll-left">
        <scroll-view class="scroll-view_H" scroll-x scroll-left="0">
          <view v-for="item in prdList" :key="item" class="scroll-box">
            <image
              class="scroll-box-image"
              :src="fixImage(item.prdPic, { w: 148 })"
              mode="aspectFill"
            ></image>
            <view class="text-desc">{{ item.prdName }}</view>
          </view>
        </scroll-view>
        <view v-if="info.prdNum" class="right-show">共{{ info.prdNum }}件</view>
      </view>
    </view>
    <template #footer>
      <view class="flex space-between align-center padding-bottom">
        <view class="time"
          >下单时间：
          {{ dayjs(info.createTime).format("YYYY-MM-DD HH:mm") }}</view
        >
        <view
          >合计：<text class="price">￥{{ info.payAmt.toFixed(2) }}</text></view
        >
      </view>
      <view class="text-right">
        <i-button
          v-if="info.orderStatus === 0"
          type="primary"
          :width="176"
          round
          @click="pay"
          >去支付</i-button
        >
        <i-button
          v-else-if="[11, 2].includes(info.orderStatus)"
          type="primary"
          round
          :width="176"
          @click="againBuy"
          >再次购买</i-button
        >
      </view>
    </template>
  </i-card>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import IButton from "@/components/i-button/index.vue";
  import ICard from "@/components/i-card/index.vue";
  import { orderAllListStatus } from "@/utils/dic";
  import dayjs from "dayjs";
  import { useCashCard } from "../../../stores/cashCard";
  import { fixImage } from "@/utils";
  // import {error} from "../../../utils/imgUrl";
  // import { CbdApiAppletOrderRetryPayGetResponse } from "@/api";
  // import { wxPay } from "@/utils";

  const props = defineProps({
    info: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  const prdList = computed(() => {
    const { prdList = [] } = props.info;
    return prdList;
  });

  function filterStatus(v: any) {
    return orderAllListStatus.find((i) => i.value === v)?.label;
  }
  function titleClick() {
    const { storeId } = props.info;
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${storeId}&type=2`
    });
  }
  function toPath() {
    const { orderNo } = props.info;
    uni.navigateTo({
      url: `/pages/order/detail?orderNo=${orderNo}`
    });
  }

  const useCashCardStore = useCashCard();
  async function pay() {
    console.log("---商品---", props.info);
    const { orderNo } = props.info;
    useCashCardStore.orderRetryPay(orderNo, 2);
    // try {
    //   const {
    //     memberCard,
    //     storeId,
    //     venueId,
    //     serialNo,
    //     orderNo: reTryOrderNo,
    //     payAmt: reTryPayAmt
    //   } = await useCashCardStore.orderRetryPay(orderNo, 2);
    //   if (memberCard) {
    //     uni.navigateTo({
    //       url: `/pages/order/payment-method?storeId=${storeId}&&venueId=${venueId}&&serialNo=${serialNo}&&orderNo=${reTryOrderNo}&&payAmt=${reTryPayAmt}`
    //     });
    //   } else {
    //     const res = useCashCardStore.getWXPaySign(orderNo);
    //     useCashCardStore.doWXPay(res, payAmt);
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
  }
  function againBuy() {
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${props.info.storeId}&type=1`
    });
  }
</script>

<style scoped lang="scss">
  .text-right {
    display: flex;
    justify-content: flex-end;
  }

  .shop-item-cont {
    padding: 24rpx 32rpx;
  }
  .shop-scroll-box {
    padding: 24rpx 0;
  }
  .scroll-box {
    display: inline-block;
    padding-right: 24rpx;
    &:last-child {
      padding-right: 96rpx;
    }
  }
  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    height: 204rpx;
  }
  .scroll-left {
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  .text-desc {
    width: 148rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 24rpx;
    color: #666;
    line-height: 40rpx;
    padding-top: 16rpx;
  }
  .scroll-box-image {
    width: 148rpx;
    height: 148rpx;
    border-radius: 16rpx;
    display: block;
  }
  .right-show {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    width: 96rpx;
    background-color: #fff;
    height: 204rpx;
    text-align: right;
    font-size: 24rpx;
    color: #666;
    line-height: 40rpx;
  }
  .price {
    color: #d93044;
    font-size: 24rpx;
    line-height: 40rpx;
  }
  .time {
    color: #333;
    font-size: 24rpx;
    line-height: 40rpx;
  }
</style>
