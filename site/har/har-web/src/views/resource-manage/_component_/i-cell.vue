<template>
  <div class="cell-box" :style="{ marginBottom: `${marginBottom}px` }">
    <div class="label-name" :style="{ width: `${labelWidth}px` }">{{
      label
    }}</div>
    <div v-if="!isImg" class="value-name">{{ value }}</div>
    <a-image v-else :width="80" :src="value"></a-image>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String
    },
    labelWidth: {
      type: Number,
      default: 70
    },
    value: {
      type: String
    },
    marginBottom: {
      type: Number,
      default: 14
    },
    isImg: {
      type: Boolean,
      default: false
    }
  });
</script>

<style scoped lang="less">
  .cell-box {
    display: flex;
    font-size: 14px;
    .label-name {
      color: #a7a7a7;
      text-align: right;
    }
    .value-name {
      flex: 1;
      color: #000;
    }
  }
</style>
