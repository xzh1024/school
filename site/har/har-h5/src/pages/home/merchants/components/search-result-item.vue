<template>
  <view>
    <shop-item
      v-if="type === 1"
      :item="item"
      @add-click="addClick"
      @click="toPath"
    ></shop-item>
    <place-item v-else-if="type === 2" :item="item"></place-item>
    <activity-cell v-else-if="type === 4" :item="item"></activity-cell>
    <coupon-item
      v-else-if="type === 3"
      :item="item"
      @click="receive"
    ></coupon-item>
  </view>
</template>

<script>
  export default {
    name: "SearchResultItem"
  };
</script>
<script setup>
  import CouponItem from "../../../../components/coupon-item";
  import ShopItem from "./shop-item";
  import ActivityCell from "../../../../components/common/activity-cell/activity-cell";
  import PlaceItem from "./place-item";

  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    type: {
      type: Number
    }
  });
  const emits = defineEmits(["addClick", "receiveClick"]);

  function addClick() {
    emits("addClick", props.item);
  }
  function toPath() {
    uni.navigateTo({
      url: `/pages/home/merchants/goodsDetail/goodsDetail?productId=${props.item.productId}&storeId=${props.item.storeId}`
    });
  }
  function receive(item) {
    emits("receiveClick", item);
  }
</script>
