<template>
  <i-sys title="储蓄卡优惠" nav-placeholder nav-bg="bg-white">
    <view class="container-box">
      <view v-if="list && list.length" class="card-cell-box">
        <card-cell
          v-for="(item, index) in list"
          :key="`c_${index}`"
          :item="item"
          :need-choose="false"
          class="card-cell"
        />
      </view>
      <i-empty-card v-else />
    </view>
  </i-sys>
</template>

<script setup lang="ts">
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import { useCashCard } from "@/stores/cashCard";
  import CardCell from "@/pages/order/components/card-cell.vue";
  import IEmptyCard from "@/components/i-empty-card/i-empty-card.vue";

  const list = ref([]);
  const cardCashStore = useCashCard();
  onLoad((options) => {
    const d: any = cardCashStore.findArrBuyKey(options?.onlyKey);
    console.log(d, "--*--");
    list.value = d.cardPay;
  });
</script>

<style scoped lang="scss">
  .container-box {
    padding: 32rpx;
  }
  .card-cell-box {
    box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.08);
    border-radius: 16rpx;
    padding: 0 32rpx 24rpx 32rpx;
    background: #ffffff;
  }
  .card-cell {
    &:last-child {
      :deep(.card-box) {
        border-bottom: 0;
        padding: 24rpx 0 0 0;
      }
    }
  }
</style>
