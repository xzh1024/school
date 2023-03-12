<template>
  <div
    class="card"
    :style="{
      backgroundColor: bgColor,
      backgroundImage: `url(${bg})`
    }"
  >
    <img class="card-icon" src="@/assets/images/card/card_icon.png" />
    <div class="card-name">{{ name }}</div>
    <div class="card-type">{{ type === 'once' ? '次数卡' : '限期卡' }}</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: 'once'
    },
    data: {
      type: Object,
      default: () => {}
    },
    bgColor: {
      type: String,
      default: '#fa6741'
    },
    bg: {
      type: [Array, String],
      default: () => []
    },
    name: {
      type: String,
      default: ''
    }
  });
</script>

<style lang="less" scoped>
  .card {
    width: 343px;
    height: 160px;
    border-radius: 8px;
    position: relative;
    z-index: 1;
    padding: 16px;
    box-sizing: border-box;

    &::after {
      content: '';
      width: 100%;
      height: 150px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-image: url(@/assets/images/card/card_bg.png);
    }

    &-name {
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      line-height: 24px;
    }
    &-type {
      margin-top: 4px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      line-height: 22px;
    }
  }

  .card-icon {
    width: 44px;
    position: absolute;
    top: 19px;
    right: 16px;
    z-index: 2;
  }
</style>
