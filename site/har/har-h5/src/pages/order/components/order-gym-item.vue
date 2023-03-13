<template>
  <view>
    <i-card
      v-for="(item, index) in prdList"
      :key="index"
      :title="info.storeName"
      :extra-text="filterStatus(info.orderStatus)"
      body-padding="0 32rpx"
      @card-click="cardClick"
      @title-click="titleClick"
    >
      <gym-item type="order" :item="item" :store-id="info.storeId" />
      <template #footer>
        <view class="flex space-between align-center padding-bottom">
          <view class="time"
            >下单时间：
            {{ dayjs(info.createTime).format("YYYY-MM-DD HH:mm") }}</view
          >
          <view
            >合计：<text class="price">￥{{ info.payAmt }}</text></view
          >
        </view>
        <view class="flex justify-end">
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
  </view>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import ICard from "@/components/i-card/index.vue";
  import GymItem from "../../../components/common/gym-item/gym-item.vue";
  import IButton from "@/components/i-button/index.vue";
  import dayjs from "dayjs";
  // import {
  //   cbdApiAppletOrderRetryPayGet,
  //   cbdApiAppletOrderPaymentSignGet
  // } from "@/api";
  import { orderAllListStatus } from "@/utils/dic";
  // import { wxPay } from "@/utils";
  import { useCashCard } from "@/stores/cashCard";

  const props = defineProps({
    info: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  // const title = computed(() => {
  //   const { orderType, storeName } = props.info;
  //   return orderType === 1 ? storeName : venueName;
  // });
  const prdList = computed(() => {
    const { prdList = [] } = props.info;
    return prdList;
  });

  function filterStatus(v: any) {
    return orderAllListStatus.find((i) => i.value === v)?.label;
  }
  function cardClick() {
    uni.navigateTo({
      url: `/pages/order/detail?orderNo=${props.info.orderNo}`
    });
  }

  function titleClick() {
    const { storeId } = props.info;
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${storeId}&type=1`
    });
  }

  const useCashCardStore = useCashCard();
  async function pay() {
    console.log("---场馆---");
    const { orderNo } = props.info;
    useCashCardStore.orderRetryPay(orderNo, 2);
    // try {
    //   const d = await cbdApiAppletOrderRetryPayGet({
    //     orderNo: orderNo,
    //     type: "2"
    //   });
    //   if (d.memberCard) {
    //     uni.navigateTo({
    //       url: `/pages/order/payment-method?`
    //     });
    //   } else {
    //     await onWXPay(d.orderNo || "");
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
    // const { orderNo, payAmt } = props.info;
    // uni.navigateTo({
    //   url: `/pages/order/payment-method?orderNo=${orderNo}&&payAmt=${payAmt}`
    // });
    // try {
    //   const res = await cbdApiAppletOrderPayGet({
    //     orderNo: props.info.orderNo,
    //     type: 2
    //   });
    //   wxPay(
    //     res,
    //     () => {
    //       uni.showToast({ title: "支付结果可能存在延迟,请刷新后查看" });
    //     },
    //     () => {},
    //     false
    //   );
    // } catch (e) {
    //   console.error(e);
    // }
  }

  function againBuy() {
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${props.info.storeId}&type=2`
    });
  }
</script>

<style scoped lang="scss">
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
