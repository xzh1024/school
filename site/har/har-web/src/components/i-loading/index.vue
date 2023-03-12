<template>
  <div v-if="loading" class="loading">
    <icon-loading class="icon" spin size="30" />
    <div class="text"> {{ defaultText }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ILoading'
  });
</script>

<script lang="ts" setup>
  defineProps({
    loading: {
      type: Boolean,
      default: false
    },
    defaultText: {
      type: String,
      default: '加载中.... '
    }
  });
</script>

<style scoped lang="less">
  .loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);

    .icon {
      color: #1a66ff;
    }

    .text {
      padding-top: 12px;
      color: #999;
      font-size: 14px;
    }
  }
</style>
