<template>
  <div
    class="cell-box"
    :class="type === 'vertical' ? 'flex-column' : ''"
    :style="{ width: width }"
  >
    <div
      class="label"
      :class="type === 'vertical' ? 'margin-bottom-8 text-999' : 'text-333'"
      >{{ label }}</div
    >
    <div class="value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    //排列方式 horizontal横向 vertical纵向
    type: {
      type: String,
      default: 'horizontal'
    },
    width: {
      type: String,
      default: '200px'
    }
  });
</script>

<style scoped lang="less">
  .flex-column {
    flex-direction: column;
  }
  .margin-bottom-8 {
    margin-bottom: 8px;
  }
  .text-999 {
    color: #999;
  }
  .text-333 {
    color: #333;
  }
  .cell-box {
    display: flex;
    .label {
      font-size: 14px;
    }
    .value {
      color: #333;
      font-size: 14px;
    }
  }
</style>
