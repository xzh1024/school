<template>
  <view>
    <shop-item v-if="type === 1" :item="item"></shop-item>
    <gym-item v-else :item="item"></gym-item>
  </view>
</template>

<script>
  export default {
    name: "ShopGymItem"
  };
</script>
<script setup>
  import ShopItem from "../shop-item/shop-item.vue";
  import GymItem from "../gym-item/gym-item.vue";
  defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    type: {
      type: Number,
      default: 1
    }
  });
</script>

<style scoped></style>
